import { makeStyles, Spinner } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    placeContent: 'center',
    blockSize: '100%',
    inlineSize: '100%',
  },
});

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Spinner size="large" />
    </div>
  );
};

export default Loader;
