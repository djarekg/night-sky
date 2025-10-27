import {
  type BrandVariants,
  createDarkTheme,
  createLightTheme,
  tokens as fluentuiTokens,
  type Theme,
} from '@fluentui/react-components';

const nightsky: BrandVariants = {
  10: '#040206',
  20: '#1D1226',
  30: '#301A45',
  40: '#40215F',
  50: '#51287A',
  60: '#622E96',
  70: '#7435B4',
  80: '#853ECC',
  90: '#9251D2',
  100: '#9F63D7',
  110: '#AB75DC',
  120: '#B787E1',
  130: '#C299E6',
  140: '#CEAAEB',
  150: '#D9BCEF',
  160: '#E4CFF4',
};

type AppTheme = Theme & {
  appHeaderFooterBlockSize: string;
  colorSecondaryForeground1: string;
  colorSecondaryForeground2: string;
  colorSecondaryForegroundGradient: string;
};

const lightTheme: AppTheme = {
  ...createLightTheme(nightsky),
  appHeaderFooterBlockSize: '80px',
  colorSecondaryForeground1: 'hsla(216, 100%, 58%, 1.00)',
  colorSecondaryForeground2: 'hsla(216, 80%, 48%, 1.00)',
  colorSecondaryForegroundGradient: `
      linear-gradient(to top left, var(--mui-palette-primary-main), var(--mui-palette-primary-dark));
  `,
};

const darkTheme: AppTheme = {
  ...createDarkTheme(nightsky),
  appHeaderFooterBlockSize: '80px',
  colorSecondaryForeground1: 'hsla(216, 100%, 58%, 1.00)',
  colorSecondaryForeground2: 'hsla(216, 80%, 48%, 1.00)',
  colorSecondaryForegroundGradient: `
      linear-gradient(to top left, var(--mui-palette-primary-main), var(--mui-palette-primary-dark));
  `,
};

darkTheme.colorBrandForeground1 = nightsky[80];
darkTheme.colorBrandForeground2 = nightsky[90];

const tokens: Record<keyof AppTheme, string> = {
  ...fluentuiTokens,
  appHeaderFooterBlockSize: `var(--appHeaderFooterBlockSize)`,
  colorSecondaryForeground1: `var(--colorSecondaryForeground1)`,
  colorSecondaryForeground2: `var(--colorSecondaryForeground2)`,
  colorSecondaryForegroundGradient: `var(--colorSecondaryForegroundGradient)`,
};

export { darkTheme, lightTheme, tokens };
