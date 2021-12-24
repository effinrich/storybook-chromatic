import React from 'react'
import MediaQuery from 'react-responsive'

import {
  BREAKPOINT_UNIT,
  MOBILE,
  SMALL_MOBILE,
  TABLET /*, DESKTOP*/,
} from 'theme'

const OFFSET = 1

const MediaQueryFactory = (props) => (
  <MediaQuery device={window.__STATICMEDIAVALUES__} {...props} />
)

export const MobileDown = (props) =>
  MediaQueryFactory({ maxWidth: `${MOBILE}${BREAKPOINT_UNIT}`, ...props })

// export const MobileOnly = props =>
//   MediaQueryFactory({
//     minWidth: `${SMALL_MOBILE + OFFSET}${BREAKPOINT_UNIT}`,
//     maxWidth: `${MOBILE}${BREAKPOINT_UNIT}`,
//     ...props
//   })

export const MobileUp = (props) =>
  MediaQueryFactory({
    minWidth: `${SMALL_MOBILE + OFFSET}${BREAKPOINT_UNIT}`,
    ...props,
  })

// export const TabletOnly = props =>
//   MediaQueryFactory({
//     minWidth: `${MOBILE + OFFSET}${BREAKPOINT_UNIT}`,
//     maxWidth: `${TABLET}${BREAKPOINT_UNIT}`,
//     ...props
//   })

export const TabletDown = (props) =>
  MediaQueryFactory({ maxWidth: `${TABLET}${BREAKPOINT_UNIT}`, ...props })

export const TabletUp = (props) =>
  MediaQueryFactory({
    minWidth: `${MOBILE + OFFSET}${BREAKPOINT_UNIT}`,
    ...props,
  })

// export const BigTabletOnly = props =>
//   MediaQueryFactory({
//     minWidth: `${TABLET + OFFSET}${BREAKPOINT_UNIT}`,
//     maxWidth: `${DESKTOP}${BREAKPOINT_UNIT}`,
//     ...props
//   })

// export const BigTabletDown = props =>
//   MediaQueryFactory({ maxWidth: `${DESKTOP}${BREAKPOINT_UNIT}`, ...props })

export const BigTabletUp = (props) =>
  MediaQueryFactory({
    minWidth: `${TABLET + OFFSET}${BREAKPOINT_UNIT}`,
    ...props,
  })

// export const DesktopOnly = props =>
//   MediaQueryFactory({
//     minWidth: `${DESKTOP + OFFSET}${BREAKPOINT_UNIT}`,
//     ...props
//   })
