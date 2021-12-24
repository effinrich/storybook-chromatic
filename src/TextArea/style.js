import styled, { css } from 'styled-components'
import { width, space } from 'styled-system'

export default styled.div`
  ${width};
  ${space};
  position: relative;
  line-height: 24px;
  margin-top: 20px;

  label {
    position: absolute;
    top: 0px;
    pointer-events: none;
    user-select: none;
    z-index: 1;
    color: ${(props) => {
    if (!props.hasValue && !props.meta.active) {
      return props.theme.lightMedGrey
    }
    if (props.meta.touched && props.meta.error) {
      return props.theme.errorColor
    }
    if (props.meta.touched && props.meta.warning) {
      return props.theme.warningColor
    }
    return props.theme.brandColor
  }};
    transform: scale(
        ${(props) => (props.hasValue || props.meta.active ? 0.75 : 1)}
      )
      translate(
        0px,
        ${(props) => (props.hasValue || props.meta.active ? '-28px' : '0px')}
      );
    transform-origin: left top 0px;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  }

  textarea {
    position: relative;
    width: 100%;
    background-color: transparent;
    top: 0;
    outline: none;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    border: none;
    resize: none;
    overflow: hidden;
    transition: height 0.2s ease;
    &::placeholder {
      position: absolute;
      top: 24px;
      opacity: ${(props) => (props.meta.active && !props.hasValue ? 1 : 0)};
      transition: opacity 0.3s;
      color: ${(props) => props.theme.lightMedGrey};
    }
  }
`

export const StyledTextAreaContainer = styled.div`
  position: relative;

  &:before,
  &:after {
    content: "";
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    bottom: 0;
    transition: transform 0.3s;
  }

  &:before {
    background-color: ${({
    theme,
    hasValue,
    meta: { touched, error, warning },
  }) => {
    if (touched && error) return theme.errorColor
    if (touched && warning) return theme.warningColor
    return theme.lightMedGrey
  }};
  }

  &:after {
    background-color: ${({
    theme,
    hasValue,
    meta: { touched, error, warning },
  }) => {
    if (touched && error) return theme.errorColor
    if (touched && warning) return theme.warningColor
    return theme.brandColor
  }};
    transform: scaleX(${({ meta: { active } }) => (active ? 1 : 0)});
  }
`

export const StyledTextAreaMessageContainer = styled.div`
  ${
  /* istanbul ignore next */ ({ holdMessageSpace }) =>
    holdMessageSpace &&
      css`
        min-height: 22px;
      `
};
`

export const StyledTextAreaMessage = styled.div`
  font-size: 12px;
  line-height: 15px;
  margin: 4px 0;
  color: ${({ theme, error, warning }) => {
    if (error) return theme.errorColor
    if (warning) return theme.warningColor
    return theme.medGrey
  }};
`
