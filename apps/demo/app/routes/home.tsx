import { dashboards } from '@/components/dashboards/dashboards.js';
import authMiddleware from '@/core/auth/auth-middleware.js';
import { tokens } from '@/styles/theme.js';
import { makeStyles } from '@fluentui/react-components';

// Protect route with authentication
export const middleware = [authMiddleware];

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    rowGap: tokens.spacingVerticalXXL,
    columnGap: tokens.spacingHorizontalXXL,
    inlineSize: '70%',
    blockSize: '100%',
    marginInline: 'auto',
  },
  widget: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    blockSize: '150px',
    border: `1px solid ${tokens.colorBrandForeground1}`,
    borderRadius: tokens.borderRadiusXLarge,
    fontSize: tokens.fontSizeBase500,
    boxShadow: tokens.shadow4,
    transition: 'box-shadow 100ms ease-in-out, transform 100ms ease-in-out',
    willChange: 'box-shadow, transform',

    '&:hover': {
      boxShadow: tokens.shadow8,
      transform: 'scale(1.01)',
    },
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {dashboards.map(({ name, type }) => {
        return (
          <div
            key={type}
            className={classes.widget}>
            {name}
          </div>
        );
      })}
    </div>
  );
}
