import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    padding: '20px',
  },
});

const Products = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>Products</h1>
      <p>Welcome to the Products page!</p>
    </div>
  );
};

export default Products;
