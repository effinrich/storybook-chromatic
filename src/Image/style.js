import styled, { css } from 'styled-components'
import { space } from 'styled-system'

export default styled.div`
  ${space};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  opacity: 0;
  animation: fadeIn ease-in 1;
  animation-fill-mode: forwards;
  animation-duration: 0.5s;

  img {
    width: 100%;
    max-width: ${(props) => props.maxWidth}px;
    height: auto;
    background-color: ${(props) =>
    props.bg ? props.bg : props.theme.lightMedGrey};
    ${(props) => (props.thumb ? thumbMixin : null)};
    ${(props) => (props.border ? borderMixin : null)};
    ${(props) => (props.borderColor ? borderColorMixin : null)};
    display: block;
  }
  ${(props) => (props.error ? errorMixin : null)};
`

const thumbMixin = css`
  object-fit: cover;
  width: ${(props) => props.maxWidth}px;
  height: ${(props) => props.maxWidth}px;
`

const borderMixin = css`
  border: solid 4px ${(props) => props.theme.superLightGrey};
`

const borderColorMixin = css`
  border: solid 4px ${(props) => props.borderColor};
`

const errorMixin = css`
  background-color: ${(props) => props.theme.lightMedGrey};
  object-fit: cover;
  width: ${(props) => props.maxWidth}px;
  height: ${(props) => props.maxWidth}px;
`

export const StyledImageError = styled.div`
  text-align: center;
  padding-top: 25%;
`
