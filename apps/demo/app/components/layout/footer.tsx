import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  footer: {
    position: 'fixed',
    insetBlockEnd: '0',
    display: 'flex',
    justifyContent: 'end',
    padding: tokens.spacingVerticalXL,
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
