import type { FC } from 'react';
import type { IconProps } from './icon-props';

type ShirtsProps = {
  strokeWidth?: number;
} & IconProps;

const ShirtsIcon: FC<ShirtsProps> = ({ className, size = 24, strokeWidth = 1.5 }) => {
  return (
    <svg
      data-icon="shirts-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      className={className}
      fill="currentColor"
      width={`${size}px`}
      height={`${size}px`}
    >
      <title>Shirts UI</title>
      <path
        fill="currentColor"
        strokeWidth={strokeWidth}
        stroke="#222222"
        d="M 37.4 8.4 c 0.1 0.2 0 0.5 -0.2 0.7 l -4.3 6.1 c -0.2 0.2 -0.5 0.4 -0.8 0.4 c -0.1 0 -0.3 0 -0.4 -0.1 L 28.3 14.7 v 14.5 c 0 0.5 -0.3 0.8 -0.8 0.8 H 10.7 c -0.5 0 -0.8 -0.3 -0.8 -0.8 V 14.7 l -3.1 0.8 c -0.3 0.1 -0.6 0 -0.9 -0.3 l -4.2 -6.1 c -0.2 -0.2 -0.2 -0.5 -0.1 -0.6 c 0.1 -0.2 0.2 -0.4 0.5 -0.5 L 10.7 4 h 4 c 0.5 0 0.8 0.3 0.8 0.8 c 0 1.6 2.3 2.7 3.9 2.7 S 23.5 6.4 23.5 4.8 c 0 -0.5 0.3 -0.8 0.8 -0.8 h 4 l 8.6 3.9 c 0.2 0.1 0.4 0.3 0.5 0.5"
      />
      <path
        fill="currentColor"
        strokeWidth={strokeWidth}
        stroke="#222222"
        d="M 48.4 25.4 c 0.1 0.2 0 0.5 -0.2 0.7 l -4.3 6.1 c -0.2 0.2 -0.5 0.4 -0.8 0.4 c -0.1 0 -0.3 0 -0.4 -0.1 L 39.3 31.7 v 14.5 c 0 0.5 -0.3 0.8 -0.8 0.8 H 21.7 c -0.5 0 -0.8 -0.3 -0.8 -0.8 V 31.7 l -3.1 0.8 c -0.3 0.1 -0.6 0 -0.9 -0.3 l -4.2 -6.1 c -0.2 -0.2 -0.2 -0.5 -0.1 -0.6 c 0.1 -0.2 0.2 -0.4 0.5 -0.5 L 21.7 21 h 4 c 0.5 0 0.8 0.3 0.8 0.8 c 0 1.6 2.3 2.7 3.9 2.7 S 34.5 23.4 34.5 21.8 c 0 -0.5 0.3 -0.8 0.8 -0.8 h 4 l 8.6 3.9 c 0.2 0.1 0.4 0.3 0.5 0.5"
      />
    </svg>
  );
};

export default ShirtsIcon;
