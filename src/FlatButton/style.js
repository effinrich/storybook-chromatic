import React from 'react'
import styled, { css } from 'styled-components'
import {
  space,
  color,
  fontSize,
  width,
  boxShadow,
  flex,
  minWidth,
} from 'styled-system'
import isNumber from 'lodash/isNumber'
import omit from 'lodash/omit'

import { display, minHeight } from 'utils/styled'

const activeMixin = css`
  background-color: ${(props) => props.overBg || props.theme.lightMedGrey};
  text-decoration: none;
  ${(props) =>
    props.overColor &&
    css`
      color: ${props.overColor};
    `};
  ${(props) => (props.primary ? primaryMixinOver : null)};
  ${(props) => (props.primaryInvert ? primaryInvertMixinOver : null)};
  ${(props) => (props.danger ? dangerMixinOver : null)};
  ${(props) => (props.success ? successMixinOver : null)};
  ${(props) => (props.cancel ? cancelMixinOver : null)};
  ${(props) => (props.lightGrey ? lightGreyMixinOver : null)};
  ${(props) => props.overStyles};
`

const baseStyles = styled.button`
  color: ${(props) => props.theme.defaultTextColor};
  display: ${(props) => (props.fullWidth ? 'block' : 'inline-block')};
  border: none;

  ${(props) =>
    props.fullWidth
      ? css`
          width: 100%;
        `
      : null};

  ${space};
  ${color};
  ${fontSize};
  ${width};
  ${boxShadow};
  ${display};
  ${flex};
  ${minHeight};
  ${minWidth};

  height: ${(props) =>
    isNumber(props.height) ? `${props.height}px` : props.height};
  box-sizing: border-box;
  text-align: ${(props) => props.textAlign};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  outline: none;
  text-decoration: none;
  border-radius: ${({ circle }) => (circle ? '50%' : 0)};

  & * {
    pointer-events: none;
  }

  &:hover {
    background-color: ${(props) => props.overBg || props.theme.lightMedGrey};
    ${(props) =>
    props.overColor &&
      css`
        color: ${props.overColor};
      `};
    ${(props) => (props.primary ? primaryMixinOver : null)};
    ${(props) => (props.primaryInvert ? primaryInvertMixinOver : null)}
    ${(props) => (props.danger ? dangerMixinOver : null)};
    ${(props) => (props.success ? successMixinOver : null)};
    ${activeMixin};
  }

  ${(props) => (props.active ? activeMixin : null)};

  ${(props) => (props.primary ? primaryMixinUp : null)};
  ${(props) => (props.primaryInvert ? primaryInvertMixinUp : null)};
  ${(props) => (props.danger ? dangerMixinUp : null)};
  ${(props) => (props.success ? successMixinUp : null)};
  ${(props) => (props.cancel ? cancelMixinUp : null)};
  ${(props) => (props.lightGrey ? lightGreyMixinUp : null)};
  ${(props) => (props.disabled ? disabledMixin : null)};
`

export default baseStyles.withComponent(({ component, triggerRef, ...props }) =>
  React.createElement(component, { ...omitProps(props), ref: triggerRef })
)

const omitProps = (props) =>
  omit(props, [
    'textAlign',
    'primary',
    'primaryInvert',
    'cancel',
    'danger',
    'lightGrey',
    'small',
    'success',
    'active',
    'overBg',
    'overColor',
    'fullWidth',
    'overStyles',
    'boxShadow',
    'circle',
    'display',
    'transparent',
    'minH',
  ])

const primaryMixinUp = css`
  background-color: ${(props) => props.theme.primaryButtonUpBg};
  color: ${(props) => props.theme.primaryButtonUpText};
`

const primaryMixinOver = css`
  background-color: ${(props) => props.theme.primaryButtonOverBg};
  color: ${(props) => props.theme.primaryButtonOverText};
`

const dangerMixinUp = css`
  background-color: ${(props) => props.theme.dangerButtonUpBg};
  color: ${(props) => props.theme.dangerButtonUpText};
`

const dangerMixinOver = css`
  background-color: ${(props) => props.theme.dangerButtonOverBg};
  color: ${(props) => props.theme.dangerButtonOverText};
`

const successMixinUp = css`
  background-color: ${(props) => props.theme.successButtonUpBg};
  color: ${(props) => props.theme.successButtonUpText};
`

const successMixinOver = css`
  background-color: ${(props) => props.theme.successButtonOverBg};
  color: ${(props) => props.theme.successButtonOverText};
`

const primaryInvertMixinUp = css`
  background-color: white;
  color: ${(props) => props.theme.primaryButtonUpBg};
  border: ${({ small }) => (small ? 1 : 2)}px solid
    ${(props) => props.theme.primaryButtonUpBg};
`

const primaryInvertMixinOver = css`
  background-color: white;
  color: ${(props) => props.theme.primaryButtonOverBg};
  border: ${({ small }) => (small ? 1 : 2)}px solid
    ${(props) => props.theme.primaryButtonOverBg};
`

const cancelMixinUp = css`
  background-color: ${(props) => props.theme.lightMedGrey};
`

const cancelMixinOver = css`
  background-color: ${(props) => props.theme.lightGrey};
`

const lightGreyMixinUp = css`
  background-color: ${(props) => props.theme.superLightGrey};
`

const lightGreyMixinOver = css`
  background-color: ${(props) => props.theme.lightGrey};
`

const disabledMixin = css`
  background-color: ${(props) =>
    props.transparent ? 'transparent' : props.theme.disabledButtonBg};
  color: ${(props) => props.theme.disabledButtonText};
  cursor: not-allowed;
  pointer-events: none;
`
