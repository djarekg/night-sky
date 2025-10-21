import { useEffect, useRef, useState } from 'react';

type MaybePromise<T> = T | Promise<T>;

/**
 * Option shapes
 *
 * The loader returns `T | null` (possibly via Promise). If the caller provides
 * a `defaultValue: T`, then the hook guarantees `data: T` (non-null) and will
 * substitute the default when loader returns null/undefined.
 */

/* With params, with explicit defaultValue -> returned data is non-null T */
type QueryOptionsWithParamsWithDefault<T, P> = {
  params: () => P;
  loader: (params: P) => MaybePromise<T | null>;
  defaultValue: T;
};

/* No params, with explicit defaultValue -> returned data is non-null T */
type QueryOptionsNoParamsWithDefault<T> = {
  params?: undefined;
  loader: () => MaybePromise<T | null>;
  defaultValue: T;
};

/* With params, no defaultValue -> returned data may be null */
type QueryOptionsWithParams<T, P> = {
  params: () => P;
  loader: (params: P) => MaybePromise<T | null>;
  defaultValue?: undefined;
};

/* No params, no defaultValue -> returned data may be null */
type QueryOptionsNoParams<T> = {
  params?: undefined;
  loader: () => MaybePromise<T | null>;
  defaultValue?: undefined;
};

export type UseResourceOptions<T, P = unknown> =
  | QueryOptionsWithParamsWithDefault<T, P>
  | QueryOptionsNoParamsWithDefault<T>
  | QueryOptionsWithParams<T, P>
  | QueryOptionsNoParams<T>;

type UseResourceResultNullable<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

type UseResourceResultNonNull<T> = {
  data: T;
  error: Error | null;
  loading: boolean;
};

/**
 * Overloads
 *
 * 1) With params + defaultValue -> data: T (non-null)
 * 2) No params + defaultValue -> data: T (non-null)
 * 3) With params (no default) -> data: T | null
 * 4) No params (no default) -> data: T | null
 */
export function useResource<T, P>(
  options: QueryOptionsWithParamsWithDefault<T, P>,
  deps?: unknown[]
): UseResourceResultNonNull<T>;

export function useResource<T>(
  options: QueryOptionsNoParamsWithDefault<T>,
  deps?: unknown[]
): UseResourceResultNonNull<T>;

export function useResource<T, P>(
  options: QueryOptionsWithParams<T, P>,
  deps?: unknown[]
): UseResourceResultNullable<T>;

export function useResource<T>(
  options: QueryOptionsNoParams<T>,
  deps?: unknown[]
): UseResourceResultNullable<T>;

/**
 * Implementation for all overloads.
 */
export function useResource<T, P>(
  options: UseResourceOptions<T, P>,
  deps: unknown[] = []
): UseResourceResultNullable<T> | UseResourceResultNonNull<T> {
  // At runtime we store state as T | null (covers both flows).
  const hasDefault = (options as any).defaultValue !== undefined;
  const defaultValue = (options as any).defaultValue as T | undefined;

  const [data, setData] = useState<T | null>(hasDefault ? (defaultValue as T) : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // request id to avoid race conditions - only latest request writes state
  const reqIdRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const currentReq = ++reqIdRef.current;
    setLoading(true);
    setError(null);

    const run = async () => {
      try {
        if (typeof (options as QueryOptionsWithParams<T, P>).params === 'function') {
          // Has params
          const params = (options as QueryOptionsWithParams<T, P>).params();
          const result = (options as QueryOptionsWithParams<T, P>).loader(params);
          const resolved = await Promise.resolve(result);
          if (!mountedRef.current || reqIdRef.current !== currentReq) return;

          if (resolved === null || resolved === undefined) {
            // If caller provided defaultValue, use it; otherwise set null
            if (hasDefault) {
              setData(defaultValue as T);
            } else {
              setData(null);
            }
          } else {
            setData(resolved as T);
          }
        } else {
          // No params
          const result = (options as QueryOptionsNoParams<T>).loader();
          const resolved = await Promise.resolve(result);
          if (!mountedRef.current || reqIdRef.current !== currentReq) return;

          if (resolved === null || resolved === undefined) {
            if (hasDefault) {
              setData(defaultValue as T);
            } else {
              setData(null);
            }
          } else {
            setData(resolved);
          }
        }
      } catch (err: unknown) {
        if (!mountedRef.current || reqIdRef.current !== currentReq) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (!mountedRef.current || reqIdRef.current !== currentReq) return;
        setLoading(false);
      }
    };

    run();

    // Dependencies:
    // - loader identity
    // - params identity
    // - explicit deps provided by caller (deps array argument)
    // We intentionally read the functions via (options as any) to ensure we depend on their identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(options as any).loader, (options as any).params, ...deps]);

  // Narrow the return type according to whether defaultValue was provided.
  if (hasDefault) {
    return {
      data: data as T, // safe: when hasDefault true we always set data to defaultValue at minimum
      error,
      loading,
    } as UseResourceResultNonNull<T>;
  }

  return {
    data,
    error,
    loading,
  } as UseResourceResultNullable<T>;
}
