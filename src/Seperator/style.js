import styled, { css } from 'styled-components'
import color from 'tinycolor2'

export default styled.hr`
  display: block;
  margin: 0 auto;
  width: ${(props) => (props.fullWidth ? '100%;' : '85%;')}
  height: 1px;
  border: 0;
  background: ${(props) =>
    props.solid
      ? props.color
      : css`linear-gradient(
    to right,
    ${(props) => color(props.color).setAlpha(0).toRgbString()},
    ${(props) => color(props.color).setAlpha(0.5).toRgbString()},
    ${(props) => color(props.color).setAlpha(0).toRgbString()}
  );`};
`
