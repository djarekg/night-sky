import { tokens } from '@/styles/theme.js';
import { makeStyles, Skeleton, SkeletonItem } from '@fluentui/react-components';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    inlineSize: '55%',
    paddingBlock: '15px',
    paddingInline: '15px',
    boxSizing: 'border-box',
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow8,
    backgroundColor: tokens.colorNeutralCardBackground,
    marginBlockEnd: tokens.spacingVerticalXL,
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    inlineSize: '200px',
    gap: '10px',
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'end',
    inlineSize: '300px',
    marginInlineStart: 'auto',

    '> .fui-SkeletonItem': {
      inlineSize: '150px',
    },
  },
  links: {
    display: 'flex',
    gap: '2rem',
    inlineSize: '100%',
  },
});

const LayoutSkeleton = () => {
  const classes = useStyles();

  return (
    <Skeleton
      aria-label="Loading user layout"
      className={classes.header}>
      <SkeletonItem
        size={40}
        shape="circle"
      />
      <section className={classes.titleSection}>
        <SkeletonItem
          size={28}
          shape="rectangle"
        />
        <SkeletonItem
          size={16}
          shape="rectangle"
        />
      </section>
      <section className={classes.rightSide}>
        <SkeletonItem
          size={20}
          shape="rectangle"
        />
        <section className={classes.links}>
          <SkeletonItem
            size={12}
            shape="rectangle"
          />
          <SkeletonItem
            size={12}
            shape="rectangle"
          />
        </section>
      </section>
    </Skeleton>
  );
};

export default LayoutSkeleton;
