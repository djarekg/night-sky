import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <>
      <header>Users</header>
      <Outlet />
    </>
  );
};

export default Layout;
