import type { Config } from '@react-router/dev/config';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // prerender: ['/signin'],
  routeDiscovery: {
    mode: 'lazy',
  },
  future: {
    v8_middleware: true,
  },
} satisfies Config;
