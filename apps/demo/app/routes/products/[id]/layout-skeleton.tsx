import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  header: {
    padding: '20px',
  },
});

const LayoutSkeleton = () => {
  const classes = useStyles();

  return <header className={classes.header}>Skeleton</header>;
};

export default LayoutSkeleton;
