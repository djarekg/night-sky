import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    justifyContent: 'end',
    padding: '2rem',
    inlineSize: '100%',
    boxSizing: 'border-box',
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <span>&copy; {new Date().getFullYear()} djarekg. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
