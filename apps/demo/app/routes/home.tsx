import type { Route } from '@/+types/root.js';
import authMiddleware from '@/core/auth/auth-middleware.js';
import { makeStyles, tokens } from '@fluentui/react-components';

// Protect route with authentication
export const middleware = [authMiddleware];

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Night Sky' }, { name: 'description', content: 'React demo app!' }];
}

const useStyles = makeStyles({
  container: {
    display: 'grid',
    placeContent: 'center',
    inlineSize: '100%',
    blockSize: '100%',
  },
  title: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeHero900,
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <span className={classes.title}>Night Sky</span>
    </div>
  );
}
