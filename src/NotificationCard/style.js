import styled from 'styled-components'
import color from 'tinycolor2'
import { space, width } from 'styled-system'

const colorMap = {
  success: 'successColor',
  error: 'errorColor',
  warning: 'warningColor',
  info: 'brandColor',
}

const StyledNotificationCard = styled.div`
  ${space};
  ${width};
  box-sizing: border-box;
  border-radius: 4px;
  color: ${(props) => {
    if (props.type === 'error' || props.type === 'info') {
      return '#fff'
    }
    props.color ||
      color(props.theme[colorMap[props.type]]).darken(40).toRgbString()
  }};
  background-color: ${(props) =>
    color(props.bg || props.theme[colorMap[props.type]])
      .setAlpha(0.8)
      .toRgbString()};
`

StyledNotificationCard.defaultProps = {
  p: 2,
}

export default StyledNotificationCard
