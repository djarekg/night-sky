import { tokens } from '@/styles/theme.js';
import { makeStyles } from '@fluentui/react-components';
import type { CSSProperties, FC, PropsWithChildren, ReactNode } from 'react';

const useStyles = makeStyles({
  section: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow8,
    background: tokens.colorNeutralCardBackground,

    '> header': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 10px',
      boxSizing: 'border-box',
    },
  },
  title: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightBold,

    '> [class^="fui-"]': {
      inlineSize: '100px',
    },
    // '> .fui-SkeletonItem': {
    //   inlineSize: '100px',
    // },
  },
  content: {
    gap: '15px',
    padding: '15px',

    '> [class^="fui-"]': {
      inlineSize: '100%',
    },
    // '> .fui-Field': {
    //   inlineSize: '100%',
    // },
  },
});

type FormCardProps = {
  icon?: ReactNode;
  title?: ReactNode;
  layout?: 'flex' | 'grid';
  cols?: number;
} & PropsWithChildren;

const FormCard: FC<FormCardProps> = ({ children, icon, title, layout = 'flex', cols }) => {
  const classes = useStyles();
  let styles: CSSProperties = {};

  if (layout === 'flex') {
    styles = {
      display: 'flex',
      flexDirection: 'column',
    };
  } else {
    styles = {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
    };
  }

  return (
    <section className={classes.section}>
      <header>
        <div className={classes.title}>{title}</div>
        {icon && icon}
      </header>
      <div
        className={classes.content}
        style={styles}>
        {children}
      </div>
    </section>
  );
};

export default FormCard;
