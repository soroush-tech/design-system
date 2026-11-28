import { Paper } from "@soroush.tech/design-system/Paper";
import { styled, css, keyframes } from "@soroush.tech/design-system";
import { alpha } from "@soroush.tech/design-system/utils";
const { Typography } = require("@soroush.tech/design-system/Typography");

export const Title = styled(Typography)`
  color: ${alpha('#000000', 0.5)};
`;
export const spin = keyframes`
  to { transform: rotate(360deg); }
`;
export const shared = css`
  color: ${(props) => props.color};
`;
export { Paper };
