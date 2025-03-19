import { FC, ReactNode } from 'react';
import { BoxProps, Typography } from '@mui/material';

import { ZUIPrimary, ZUISecondary } from '../types';

type ZUILabelProps = {
  children: ReactNode;
  color?: ZUIPrimary | ZUISecondary;
  component?: 'div' | 'p' | 'span';
  gutterBottom?: boolean;
  noWrap?: boolean;
  variant?: 'labelMdMedium' | 'labelMdRegular';
} & Omit<
  BoxProps,
  | 'sx'
  | 'color'
  | 'typography'
  | 'fontFamily'
  | 'fontSize'
  | 'fontStyle'
  | 'fontWeight'
  | 'letterSpacing'
  | 'lineHeight'
  | 'textAlign'
  | 'textTransform'
>;

const ZUILabel: FC<ZUILabelProps> = ({
  children,
  color,
  component = 'p',
  gutterBottom,
  noWrap,
  variant = 'labelMdRegular',
  ...boxProps
}) => {
  return (
    <Typography
      {...boxProps}
      component={component}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      sx={(theme) => ({
        color:
          color == 'primary'
            ? theme.palette.text.primary
            : theme.palette.text.secondary,
      })}
      variant={variant}
    >
      {children}
    </Typography>
  );
};

export default ZUILabel;
