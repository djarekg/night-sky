import FormCard from '@/components/form-card/form-card.js';
import { makeStyles, Skeleton, SkeletonItem } from '@fluentui/react-components';

const useStyles = makeStyles({
  constainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    inlineSize: '55%',
    paddingBlock: '15px',
    paddingInline: '15px',
  },
});
const UserDetailSkeleton = () => {
  const classes = useStyles();

  return (
    <Skeleton
      aria-label="Loading user detail"
      className={classes.constainer}>
      <FormCard
        layout="grid"
        cols={2}
        title={<SkeletonItem size={16} />}
        icon={
          <SkeletonItem
            size={36}
            shape="square"
          />
        }>
        <SkeletonItem size={24} />
        <SkeletonItem size={24} />
        <SkeletonItem size={24} />
        <SkeletonItem size={24} />
      </FormCard>
      <FormCard
        layout="grid"
        cols={3}
        title={<SkeletonItem size={16} />}
        icon={
          <SkeletonItem
            size={36}
            shape="square"
          />
        }>
        <SkeletonItem size={24} />
        <SkeletonItem size={24} />
        <SkeletonItem size={24} />
        <SkeletonItem size={24} />
        <SkeletonItem size={24} />
        <SkeletonItem size={24} />
        <SkeletonItem size={24} />
        <SkeletonItem size={24} />
        <SkeletonItem size={24} />
      </FormCard>
    </Skeleton>
  );
};

export default UserDetailSkeleton;
