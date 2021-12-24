import styled, { css } from 'styled-components'
import { space, color, fontSize, borders, borderColor } from 'styled-system'

import { Flex } from 'reflexbox'

const sizeMap = {
  tiny: {
    fontSize: '15px',
    width: '20px',
    height: '20px',
  },
  small: {
    fontSize: '18px',
    width: '40px',
    height: '40px',
  },
  medium: {
    fontSize: '28px',
    width: '60px',
    height: '60px',
  },
  large: {
    fontSize: '38px',
    width: '80px',
    height: '80px',
  },
}

export default styled.div`
  ${space};
  ${color};
  ${fontSize};
  ${borders};
  ${borderColor};
  ${(props) =>
    props.src
      ? css`
          background-image: url(${props.src});
        `
      : null};
  width: ${(props) =>
    props.width ? `${props.width}px` : sizeMap[props.size].width};
  height: ${(props) =>
    props.width ? `${props.width}px` : sizeMap[props.size].height};
  min-width: 30px;
  min-height: 30px;
  max-width: 100px;
  max-height: 100px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  float: ${(props) => props.align};
`

export const StyledAvatarWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
`

export const StyledAvatarText = styled.div`
  font-weight: ${(props) => props.theme.fontSizeLight};
  text-transform: uppercase;
  font-size: ${(props) =>
    props.width ? `${props.fontSize}px` : sizeMap[props.size].fontSize};
`

export const StyledAvatarIcon = styled.div`
  font-size: ${(props) =>
    props.width ? `${props.fontSize}px` : sizeMap[props.size].fontSize};
`
