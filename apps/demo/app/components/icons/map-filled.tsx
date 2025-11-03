import type { FC } from 'react';
import type { IconProps } from './icon-props';

type MapFilledProps = {
  fill?: string;
  strokeWidth?: number;
  strokeColor?: string;
} & IconProps;

const MapFilledIcon: FC<MapFilledProps> = ({
  className,
  fill = 'currentColor',
  size = 24,
  strokeWidth = 13,
  strokeColor = '#222',
}) => {
  return (
    <svg
      data-icon="map-filled-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      className={`app-icon app-map-filled-icon ${className}`}
      fill="currentColor"
      width={`${size}px`}
      height={`${size}px`}>
      <title>MapFilled</title>
      <path
        fill={fill}
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        d="M0 117.66v346.32c0 11.32 11.43 19.06 21.94 14.86L160 416V32L20.12 87.95A32.01 32.01 0 0 0 0 117.66M192 416l192 64V96L192 32zM554.06 33.16L416 96v384l139.88-55.95A32 32 0 0 0 576 394.34V48.02c0-11.32-11.43-19.06-21.94-14.86"
      />
    </svg>
  );
};

export default MapFilledIcon;
