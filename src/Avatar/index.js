import React from 'react'
import PropTypes from 'prop-types'

import theme from 'theme'
import StyledAvatar, {
  StyledAvatarWrapper,
  StyledAvatarText,
  StyledAvatarIcon,
} from './style'

const propTypes = {
  // If passed in, this component will render an img element. Otherwise, a div will be rendered.
  src: PropTypes.string,
  // This is the size of the avatar. Optional values are 'tiny', 'small', 'medium' and 'large'.
  size: PropTypes.string,
  // This is the SvgIcon or FontIcon to be used inside the avatar. Don't use with image or text and vice versa.
  icon: PropTypes.element,
  // This is for rendering up to 3 initials inside the avatar. Don't use with image or icon and vice versa.
  text: PropTypes.string,
  // This allows you to set a specific width and height, ignoring the size prop
  width: PropTypes.number,
  // This allows you to set a specific fontSize, ignoring the size prop, defaults to 28px
  fontSize: PropTypes.number,
  // Float left or right.  Default is none.
  align: PropTypes.string,
}

const defaultProps = {
  size: 'small',
  // The icon or letter's color.
  // See https://github.com/jxnblk/styled-system for syntax.
  color: 'white',
  // The avatar BG color to be used with icon or text. Don't use with image.
  // See https://github.com/jxnblk/styled-system for syntax.
  bg: theme.lightMedGrey,
  fontSize: 18,
  align: 'none',
}

const Avatar = (props) => {
  const { text, icon, ...styledProps } = props
  const stringLimit = 3
  return (
    <StyledAvatar {...styledProps}>
      <StyledAvatarWrapper alignItems="center" justifyContent="center">
        {text && (
          <StyledAvatarText {...styledProps}>
            {text.substr(0, stringLimit)}
          </StyledAvatarText>
        )}
        {icon && <StyledAvatarIcon {...styledProps}>{icon}</StyledAvatarIcon>}
      </StyledAvatarWrapper>
    </StyledAvatar>
  )
}

Avatar.propTypes = propTypes
Avatar.defaultProps = defaultProps

export default Avatar
