import { tokens } from '@/styles/theme.js';
import { makeStyles } from '@fluentui/react-components';
import type { FC, HTMLAttributes } from 'react';

const useStyles = makeStyles({
  section: {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow8,
    background: tokens.colorNeutralCardBackground,

    '> header': {
      padding: '8px 10px',
      fontSize: tokens.fontSizeBase400,
      fontWeight: tokens.fontWeightBold,
      // borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
      boxSizing: 'border-box',
    },
  },
  content: {
    display: 'flex',
    gap: '15px',
    padding: '15px',

    '> .fui-Field': {
      inlineSize: '100%',
    },
  },
});

type FormCardProps = {
  title?: string;
} & HTMLAttributes<HTMLDivElement>;

const FormCard: FC<FormCardProps> = ({ children, title }) => {
  const classes = useStyles();

  return (
    <section className={classes.section}>
      <header>{title}</header>
      <div className={classes.content}>{children}</div>
    </section>
  );
};

export default FormCard;
