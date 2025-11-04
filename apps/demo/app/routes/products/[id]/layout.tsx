import { useResource } from '@/core/hooks/use-resource.js';
import { getProduct } from '@/core/services/product.service.js';
import LayoutSkeleton from '@/routes/products/[id]/layout-skeleton.js';
import { makeStyles } from '@fluentui/react-components';
import type { ProductModel } from '@ns/api';
import { lazy, Suspense } from 'react';
import { Outlet, useParams } from 'react-router';

const ErrorNotifier = lazy(() => import('@/components/error-notifier/error-notifier.js'));

const useStyles = makeStyles({
  container: {
    padding: '20px',
  },
});

const Layout = () => {
  const classes = useStyles();
  const { id = '' } = useParams<{ id: string }>();
  const { data: product, error } = useResource({
    defaultValue: {} as ProductModel,
    params: () => id,
    loader: id => getProduct(id),
  });

  if (error) return <ErrorNotifier message={error.message} />;

  return (
    <Suspense fallback={<LayoutSkeleton />}>
      <div className={classes.container}>
        <h1>{product.name}</h1>
      </div>
      <Outlet context={product} />
    </Suspense>
  );
};

export default Layout;
