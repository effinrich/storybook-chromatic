import React from 'react'
import PropTypes from 'prop-types'

import StyledRadioFieldGroup, {
  StyledRadioFieldGroupInputContainer,
  StyledRadioFieldGroupMessageContainer,
  StyledRadioFieldGroupMessage,
} from './style'

const propTypes = {
  input: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  labelPosition: PropTypes.oneOf(['left', 'right']),
  textAlign: PropTypes.oneOf(['left', 'right']),
  helpText: PropTypes.string,
  horizontal: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
}

const defaultProps = {
  labelPosition: 'left',
  disabled: false,
  width: 1,
  fontSize: 2,
}

const RadioFieldGroup = (props) => {
  const {
    input,
    meta,
    disabled,
    labelPosition,
    helpText,
    textAlign,
    horizontal,
    children,
    ...styledProps
  } = props

  let inputContainerProps

  if (horizontal) {
    inputContainerProps = {
      d: 'flex',
      flexWrap: 'wrap',
    }
  }

  return (
    <StyledRadioFieldGroup {...styledProps}>
      <StyledRadioFieldGroupInputContainer {...inputContainerProps}>
        {children.map((child, index) => {
          return React.cloneElement(child, {
            key: index,
            currentValue: input.value,
            onChange: input.onChange,
            name: input.name,
            my: '4px',
            textAlign,
            labelPosition,
            meta,
            disabled,
          })
        })}
      </StyledRadioFieldGroupInputContainer>
      <StyledRadioFieldGroupMessageContainer>
        {meta.touched &&
          ((meta.error && (
            <StyledRadioFieldGroupMessage error>
              {meta.error}
            </StyledRadioFieldGroupMessage>
          )) ||
            (meta.warning && (
              <StyledRadioFieldGroupMessage warning>
                {meta.warning}
              </StyledRadioFieldGroupMessage>
            )))}
        {helpText && (
          <StyledRadioFieldGroupMessage>
            {helpText}
          </StyledRadioFieldGroupMessage>
        )}
      </StyledRadioFieldGroupMessageContainer>
    </StyledRadioFieldGroup>
  )
}

RadioFieldGroup.propTypes = propTypes
RadioFieldGroup.defaultProps = defaultProps

export default RadioFieldGroup
