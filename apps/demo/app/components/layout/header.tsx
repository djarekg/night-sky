import GhostIcon from '@/components/icons/ghost.js';
import { authLoader } from '@/core/auth/auth-loader.js';
import { tokens } from '@/styles/theme.js';
import {
  Button,
  makeStyles,
  Menu,
  MenuItemLink,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import {
  bundleIcon,
  PersonCircleFilled,
  PersonCircleRegular,
  PersonSettingsFilled,
  PersonSettingsRegular,
  SignOutFilled,
  SignOutRegular,
} from '@fluentui/react-icons';
import type { MouseEvent } from 'react';
import { useLoaderData, useNavigate } from 'react-router';

const useStyles = makeStyles({
  container: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    blockSize: tokens.appHeaderFooterBlockSize,
    inlineSize: '100%',
    paddingInline: tokens.spacingHorizontalL,
    boxSizing: 'border-box',
    backdropFilter: 'blur(4px)',
    zIndex: 2,
  },
  homeLink: {
    display: 'flex',
    gap: '1em',
    transition: 'color 300ms ease-in, text-shadow 300ms ease-in',

    '> .app-icon': {
      transition: 'color 200ms ease-in, transform 300ms ease-in-out',
      color: 'transparent',
    },
    ':hover': {
      color: tokens.colorBrandForeground1,
      textShadow: '1px 1px 15px rgba(0, 0, 0, 0.5)',
    },
    '&:hover .app-icon': {
      color: tokens.colorBrandForeground0,
      transform: 'scale(1.2)',
    },
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightMedium,
  },
});

const PersonIcon = bundleIcon(PersonCircleFilled, PersonCircleRegular);
const SettingsIcon = bundleIcon(PersonSettingsFilled, PersonSettingsRegular);
const SignOutIcon = bundleIcon(SignOutFilled, SignOutRegular);

export const loader = authLoader;

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { userId } = useLoaderData<typeof loader>();

  const handleLink = (e: MouseEvent, href: string) => {
    e.preventDefault();
    navigate(href, { viewTransition: true });
  };

  return (
    <header className={classes.container}>
      <Button
        appearance="transparent"
        className={classes.homeLink}
        onClick={e => handleLink(e, '/')}>
        <GhostIcon
          size={48}
          strokeWidth={1}
          strokeColor={tokens.colorBrandForeground1}
        />
        <span className={classes.title}>Night Sky</span>
      </Button>
      <Menu hasIcons>
        <MenuTrigger disableButtonEnhancement>
          <Button
            appearance="transparent"
            size="large"
            icon={<PersonIcon />}
          />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItemLink
              href="#"
              icon={<SettingsIcon />}
              onClick={e => handleLink(e, `/users/${userId}`)}>
              Profile
            </MenuItemLink>
            <MenuItemLink
              href="#"
              icon={<SignOutIcon />}
              onClick={e => handleLink(e, '/signout')}>
              Logout
            </MenuItemLink>
          </MenuList>
        </MenuPopover>
      </Menu>
    </header>
  );
};

export default Header;
