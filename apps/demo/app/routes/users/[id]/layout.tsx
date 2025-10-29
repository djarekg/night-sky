import { useResource } from '@/core/hooks/use-resource.js';
import { userService } from '@/core/services/user.js';
import { tokens } from '@/styles/theme.js';
import { makeStyles } from '@fluentui/react-components';
import { type UserModel } from '@ns/api';
import { lazy } from 'react';
import { Outlet, useParams } from 'react-router';

const Loader = lazy(() => import('@/components/loader/loader.js'));
const ErrorNotifier = lazy(() => import('@/components/error-notifier/error-notifier.js'));

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    inlineSize: '100%',
    paddingBlock: '15px',
    paddingInline: '60px',
    boxSizing: 'border-box',
  },
  name: {
    fontSize: tokens.fontSizeBase600,
  },
  date: {
    fontsize: tokens.fontSizeBase600,
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

  const { firstName, lastName, dateCreated } = user!;

  return (
    <>
      <header className={classes.header}>
        <div className={classes.name}>
          {firstName}&nbsp;{lastName}
        </div>
        <div className={classes.date}>Date started: {dateCreated?.toLocaleDateString()}</div>
      </header>
      <Outlet context={{ user }} />
    </>
  );
};

export default Layout;
