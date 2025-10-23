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
import { PersonCircleRegular, PersonSettingsRegular, SignOutRegular } from '@fluentui/react-icons';

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
  },
  title: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase600,
  },
});
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
            icon={<PersonCircleRegular />}
          />
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItemLink
              href="/user/settings"
              icon={<PersonSettingsRegular />}>
              Profile
            </MenuItemLink>
            <MenuItemLink
              href="/signout"
              icon={<SignOutRegular />}>
              Logout
            </MenuItemLink>
          </MenuList>
        </MenuPopover>
      </Menu>
    </header>
  );
};

export default Header;
