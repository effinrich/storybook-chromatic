import styled, { css } from 'styled-components'

export default styled.div`
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
    if (!props.hasValue && !props.hasFocus) {
      return props.theme.lightMedGrey
    }
    return props.theme.brandColor
  }};
    transform: scale(
        ${(props) => (props.hasValue || props.hasFocus ? 0.75 : 1)}
      )
      translate(
        0px,
        ${(props) => (props.hasValue || props.hasFocus ? '-35px' : '0px')}
      );
    transform-origin: left top 0px;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  }

  .Select__menu {
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
    border-color: ${({ theme }) => {
    return theme.lightMedGrey
  }};
  }

  .Select__control-is-focused:not(.Select__control-menu-is-open) {
    box-shadow: none;
    border-color: ${({ theme }) => {
    return theme.lightMedGrey
  }};
    background: transparent;
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
    /* display: none; */
    position: absolute;
    top: 3px;
    opacity: ${(props) => (props.hasFocus && !props.hasValue ? 1 : 0)};
    transition: opacity 0.3s;
    color: ${(props) => props.theme.lightMedGrey};
  }

  .Select__value-container--is-multi {
    .Select__multi-value {
      background-color: rgba(70, 55, 134, 0.08);
      border: 1px solid rgba(70, 55, 134, 0.24);
      color: ${(props) => props.theme.brandColor};
      margin-top: 4px;
      /* margin-top: 0px; */
      /* margin-bottom: 3px;
    margin-right: 5px; */
      margin-right: 4px;
      margin-left: 0px;

      .Select__input {
        margin-left: 0;
      }

      .Select__multi-value__label {
        /* font-size: 75%; */
        padding: 1px;
        padding-left: 6px;
      }
    }
  }

  .Select-container .Select-container__is-disabled {
    background-color: transparent;
  }

  ${(props) =>
    props.hideOptions
      ? css`
          .Select__indicators {
            display: none;
          }

          .Select__menu {
            display: none;
          }
        `
      : null};
`

export const StyledAsyncSelectHelpText = styled.div`
  font-size: 12px;
  font-weight: 400;
  margin: 4px 0;
  color: ${({ theme }) => {
    return theme.medGrey
  }};
`
