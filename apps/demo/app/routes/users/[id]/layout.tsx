import { useResource } from '@/core/hooks/use-resource.js';
import { userService } from '@/core/services/user.js';
import { tokens } from '@/styles/theme.js';
import { Avatar, Link, makeStyles } from '@fluentui/react-components';
import { type UserModel } from '@ns/api';
import { lazy } from 'react';
import { Outlet, useParams } from 'react-router';

const Loader = lazy(() => import('@/components/loader/loader.js'));
const ErrorNotifier = lazy(() => import('@/components/error-notifier/error-notifier.js'));

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    inlineSize: '55%',
    paddingBlock: '15px',
    paddingInline: '15px',
    boxSizing: 'border-box',
    // border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow8,
    backgroundColor: tokens.colorNeutralCardBackground,
    marginBlockEnd: tokens.spacingVerticalXL,
  },
  name: {
    fontSize: tokens.fontSizeBase600,
  },
  title: {
    fontsize: tokens.fontSizeBase600,
    color: tokens.colorNeutralForeground3,
  },
  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    gap: '1rem',
    alignItems: 'end',
    marginInlineStart: 'auto',
  },
  date: {
    fontsize: tokens.fontSizeBase500,
    // fontSize: '18px',
    color: tokens.colorNeutralForeground3,
  },
});

const Layout = () => {
  const classes = useStyles();
  const { id = '' } = useParams<{ id: string }>();
  const {
    data: user,
    error,
    loading,
  } = useResource({
    defaultValue: {} as UserModel,
    params: () => id,
    loader: params => userService.getUser(params),
  });

  if (loading) return <Loader />;
  if (error) return <ErrorNotifier message={error.message} />;

  const { firstName, lastName, dateCreated, jobTitle, isActive } = user!;

  return (
    <>
      <header className={classes.header}>
        <Avatar
          aria-label="User avatar"
          activeAppearance="ring"
          size={40}
          active={`${isActive ? 'active' : 'inactive'}`}
        />
        <section>
          <div className={classes.name}>
            {firstName}&nbsp;{lastName}
          </div>
          <div className={classes.title}>{jobTitle}</div>
        </section>
        <div className={classes.rightSide}>
          <div className={classes.date}>Created: {dateCreated?.toLocaleDateString()}</div>
          <Link href="/auth/change-password">Change password</Link>
        </div>
      </header>
      <Outlet context={{ user }} />
    </>
  );
};

export default Layout;
