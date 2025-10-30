import { tokens } from '@/styles/theme.js';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    padding: tokens.spacingVerticalXL,
    inlineSize: '100%',
    blockSize: tokens.appHeaderFooterBlockSize,
    boxSizing: 'border-box',

    '> span': {
      blockSize: 'fit-content',
    },
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
