import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from 'reflexbox'
import { MdHelp } from 'react-icons/md'

import theme from 'theme'
import Tooltip from 'components/Tooltip'

import StyledInputField, {
  StyledInputFieldLabelWrapper,
  StyledInputFieldLabel,
  StyledInputFieldInputContainer,
  StyledInputFieldMessageContainer,
  StyledInputFieldMessage,
  StyledInputFieldAdornment,
  StyledHelpIcon,
} from './style'

export const BaseInputFieldProps = {
  label: PropTypes.string.isRequired,
  helpText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
  helpIcon: PropTypes.bool,
  expandLabel: PropTypes.bool,
  adornmentText: PropTypes.string,
  holdMessageSpace: PropTypes.bool,
  disabled: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    active: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
  inputRef: PropTypes.func,
  // for reducing overall real estate
  inlineEdit: PropTypes.bool,
  subAdornment: PropTypes.bool,
}

export default class BaseInputField extends PureComponent {
  static propTypes = {
    ...BaseInputFieldProps,
    name: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    hasValue: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    holdMessageSpace: false,
    expandLabel: false,
    width: 256,
    mb: 1,
    inlineEdit: false,
    helpIcon: false,
  }

  render() {
    const {
      name,
      label,
      holdMessageSpace,
      adornmentText,
      helpText,
      helpIcon,
      input,
      meta,
      expandLabel,
      inputRef,
      hasValue,
      children,
      inlineEdit,
      ...styleProps
    } = this.props

    const styleLogicProps = {
      hasValue,
      meta,
      inlineEdit,
      hasAdornment: !!adornmentText,
    }

    return (
      <StyledInputField ref={inputRef} {...styleProps}>
        <StyledInputFieldLabelWrapper>
          <Flex justifyContent="space-between">
            <Box>
              <StyledInputFieldLabel
                htmlFor={name}
                expandLabel={expandLabel}
                {...styleLogicProps}
              >
                {label}
              </StyledInputFieldLabel>
            </Box>
            {helpText && helpIcon && (
              <Box>
                <StyledHelpIcon expandLabel={expandLabel} {...styleLogicProps}>
                  <Tooltip content={helpText}>
                    <MdHelp color={theme.brandColor} size="20px" />
                  </Tooltip>
                </StyledHelpIcon>
              </Box>
            )}
          </Flex>
        </StyledInputFieldLabelWrapper>

        <StyledInputFieldInputContainer {...styleLogicProps}>
          {adornmentText && (
            <StyledInputFieldAdornment inlineEdit={inlineEdit}>
              {adornmentText}
            </StyledInputFieldAdornment>
          )}
          {children}
        </StyledInputFieldInputContainer>
        <StyledInputFieldMessageContainer
          holdMessageSpace={!helpText || holdMessageSpace}
          inlineEdit={inlineEdit}
        >
          {meta.touched &&
            ((meta.error && (
              <StyledInputFieldMessage error>
                {meta.error}
              </StyledInputFieldMessage>
            )) ||
              (meta.warning && (
                <StyledInputFieldMessage warning>
                  {meta.warning}
                </StyledInputFieldMessage>
              )))}
          {helpText && !helpIcon && (
            <StyledInputFieldMessage>{helpText}</StyledInputFieldMessage>
          )}
        </StyledInputFieldMessageContainer>
      </StyledInputField>
    )
  }
}
