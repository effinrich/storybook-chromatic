import styled from 'styled-components'
import { space } from 'styled-system'

export default styled.div`
  ${space};
  position: relative;
  margin-top: 17px;
  line-height: 24px;
  height: 62px;

  label {
    position: absolute;
    top: 8px;
    font-size: 18px;
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

  /*.Select__menu {
    z-index: 2;
    font-weight: 400;
    font-size: 18px;
  }

  .Select__control {
    background-color: transparent;
    border-radius: 0;
    font-weight: 400;
    font-size: 18px;
    border: none;
    border-bottom: 2px solid;
    border-color: ${(props) => {
    if (props.meta.touched && props.meta.error) return props.theme.errorColor
    if (props.meta.touched && props.meta.warning)
      return props.theme.warningColor
    return props.theme.lightMedGrey
  }};
  }

  .Select__control-is-focused:not(.Select__control-menu-is-open) {
    box-shadow: none;
    border-color: ${(props) => {
    if (props.meta.touched && props.meta.error) return props.theme.errorColor
    if (props.meta.touched && props.meta.warning)
      return props.theme.warningColor
    return props.theme.lightMedGrey
  }};
  }

  .Select__control-is-focused {
    background: transparent;
  }

  .Select__placeholder,
  .Select__control .Select__value-container > .Select__single-value {
    margin-left: 0;
    top: 55%;
  }

  .Select__placeholder {
    display: none;
  }

  .Select__input {
    padding-left: 0;
  }*/
`

export const StyledSelectPlaceholder = styled.div`
  font-size: 18px;
  position: absolute;
  z-index: 2;
  top: 10px;
  opacity: ${({ meta: { active }, hasValue }) => {
    if (active && !hasValue) {
      return 1
    } else {
      return 0
    }
  }};
  transition: opacity 0.3s;
  color: ${({ theme }) => theme.lightMedGrey};
`

export const StyledSelectMessageContainer = styled.div`
  position: absolute;
  margin-top: 5px;
`

export const StyledSelectMessage = styled.div`
  font-size: 12px;
  line-height: 15px;
  color: ${({ theme, error, warning }) => {
    if (error) return theme.errorColor
    if (warning) return theme.warningColor
    return theme.medGrey
  }};
`
