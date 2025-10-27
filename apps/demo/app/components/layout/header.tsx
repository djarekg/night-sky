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
import { useLoaderData } from 'react-router';

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
    zIndex: 2,
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
  const { userId } = useLoaderData<typeof loader>();
  const settingsPath = `/users/${userId}/settings`;

  return (
    <header className={classes.container}>
      <span className={classes.title}>Night Sky</span>
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
              href={settingsPath}
              icon={<SettingsIcon />}>
              Profile
            </MenuItemLink>
            <MenuItemLink
              href="/signout"
              icon={<SignOutIcon />}>
              Logout
            </MenuItemLink>
          </MenuList>
        </MenuPopover>
      </Menu>
    </header>
  );
};

export default Header;
