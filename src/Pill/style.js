import styled, { css } from 'styled-components'
import { color, space, fontSize, borderRadius } from 'styled-system'
import tinycolor from 'tinycolor2'

const sizeMap = {
  small: css`
    font-size: 10px;
    border-radius: 3px;
    padding: 4px 6px;
  `,
  medium: css`
    font-size: 12px;
    border-radius: 4px;
    padding: 4px 6px;
  `,
  large: css`
    font-size: 14px;
    border-radius: 5px;
    padding: 4px 6px;
  `,
}

const pillStyleMap = {
  default: css`
    color: white;
    background-color: ${(props) => props.theme.brandColor};
  `,
  warning: css`
    color: black;
    background-color: ${(props) => props.theme.warningColor};
  `,
  error: css`
    color: white;
    background-color: ${(props) => props.theme.errorColor};
  `,
  success: css`
    color: white;
    background-color: ${(props) => props.theme.successColor};
  `,
  info: css`
    color: white;
    background-color: ${(props) => props.theme.infoColor};
  `,
}

export const pillValues = [
  pillStyleMap.default,
  pillStyleMap.warning,
  pillStyleMap.error,
  pillStyleMap.success,
]

export default styled.div`
  ${(props) => sizeMap[props.size]};
  ${(props) => pillStyleMap[props.pillStyle]};
  ${(props) => (props.colorValue >= 0 ? pillValues[props.colorValue] : null)};
  ${color};
  ${space};
  ${borderRadius};
  ${fontSize};
  ${(props) =>
    props.bg && !props.color
      ? css`
          color: ${tinycolor
    .mostReadable(props.bg, ['black', 'white'], { level: 'AAA' })
    .toRgbString()};
        `
      : null};
  display: inline-block;
`
