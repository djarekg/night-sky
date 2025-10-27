import { makeStyles } from '@fluentui/react-components';
import { tokens } from '@/styles/theme.js';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    justifyContent: 'end',
    padding: tokens.spacingVerticalXL,
    inlineSize: '100%',
    blockSize: tokens.appHeaderFooterBlockSize,
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
