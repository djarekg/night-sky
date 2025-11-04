import { useResource } from '@/core/hooks/use-resource.js';
import { getUser, updateUserActive } from '@/core/services/user.service.js';
import LayoutSkeleton from '@/routes/users/[id]/layout-skeleton.js';
import { tokens } from '@/styles/theme.js';
import { Avatar, Link, makeStyles } from '@fluentui/react-components';
import { type UserModel } from '@ns/api';
import { lazy, Suspense, useCallback } from 'react';
import { Outlet, useParams } from 'react-router';

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
    // borderRadius: tokens.borderRadiusLarge,
    // boxShadow: tokens.shadow8,
    // backgroundColor: tokens.colorNeutralCardBackground,
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
    gap: '1rem',
    alignItems: 'end',
    marginInlineStart: 'auto',
  },
  date: {
    fontsize: tokens.fontSizeBase500,
    color: tokens.colorNeutralForeground3,
  },
  links: {
    display: 'flex',
    gap: '2rem',
  },
  disabled: {
    color: tokens.colorPaletteRedForeground1,
    marginInlineStart: tokens.spacingHorizontalS,
  },
});

const Layout = () => {
  const classes = useStyles();
  const { id = '' } = useParams<{ id: string }>();
  const {
    data: user,
    error,
    reload,
  } = useResource({
    defaultValue: {} as UserModel,
    params: () => id,
    loader: id => getUser(id),
  });
  const { firstName, lastName, dateCreated, jobTitle, isActive } = user!;

  const handleUserActiveToggle = useCallback(async () => {
    await updateUserActive(id, !isActive);
    reload();
  }, [id, isActive, reload]);

  if (error) return <ErrorNotifier message={error.message} />;

  return (
    <Suspense fallback={<LayoutSkeleton />}>
      <header className={classes.header}>
        <Avatar
          aria-label="User avatar"
          activeAppearance="ring"
          size={40}
          color={isActive !== false ? 'neutral' : 'dark-red'}
          active={`${isActive ? 'active' : 'inactive'}`}
        />
        <section>
          <div className={classes.name}>
            {firstName}&nbsp;{lastName}
            {!isActive && <span className={classes.disabled}>(disabled)</span>}
          </div>
          <div className={classes.title}>{jobTitle}</div>
        </section>
        <div className={classes.rightSide}>
          <div className={classes.date}>Created: {dateCreated?.toLocaleDateString()}</div>
          <div className={classes.links}>
            <Link onClick={handleUserActiveToggle}>
              {isActive ? 'Deactivate user' : 'Activate user'}
            </Link>
            <Link href="/auth/change-password">Change password</Link>
          </div>
        </div>
      </header>
      <Outlet context={{ user }} />
    </Suspense>
  );
};

export default Layout;
