import { Paper } from "@gild-ui/react/Paper";
import { styled } from "@gild-ui/react/styled";
import { css } from "@gild-ui/react/css";
import { keyframes } from "@gild-ui/react/keyframes";
import { alpha } from "@gild-ui/core/utils";
const { Typography } = require("@gild-ui/react/Typography");

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
