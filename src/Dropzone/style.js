import styled, { css } from 'styled-components'
import color from 'tinycolor2'

import { omitStyled } from 'utils/styled'
import _reactIconWrapper from 'components/ReactIconWrapper/style'
import Flex from 'components/Flex'

const acceptBg = color('rgb(138, 226, 159)').lighten(20).toRgbString()

const rejectBg = color('rgb(202, 25, 0)').lighten(50).toRgbString()

export const StyledDropzone = styled('div')`
  width: 100%;
  height: 100%;
`

export const StyledDropzoneChildWrapper = styled('div')`
  height: 100%;
  outline-width: 0;
`

export const StyledDropzoneFlex = omitStyled(Flex, [
  'isDragActive',
  'isDragAccept',
  'isDragReject',
])`
  background-color: white;
  border: 2px dashed ${(props) =>
    props.disabled ? props.theme.lightMedGrey : props.theme.brandColor};
  box-sizing: border-box;
  transition: background-color 0.5s;

  ${(props) => {
    const { isDragActive, isDragAccept, isDragReject } = props
    if (isDragActive && isDragAccept) {
      return css`
        background-color: ${acceptBg};
        ${_reactIconWrapper} {
          fill: ${(props) => props.theme.successColor};
        }
      `
    } else if (isDragActive && isDragReject) {
      return css`
        background-color: ${rejectBg};
        ${_reactIconWrapper} {
          fill: ${(props) => props.theme.errorColor};
        }
      `
    }
  }}
`
