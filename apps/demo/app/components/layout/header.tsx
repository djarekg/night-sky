import {
  Button,
  makeStyles,
  Menu,
  MenuItemLink,
  MenuList,
  MenuPopover,
  MenuTrigger,
  tokens,
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

const useStyles = makeStyles({
  container: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    blockSize: '60px',
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

const Header = () => {
  const classes = useStyles();

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
              href="/user/settings"
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
