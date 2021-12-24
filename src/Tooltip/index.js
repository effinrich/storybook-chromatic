import React from 'react'
import PropTypes from 'prop-types'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

import './style.css'

const propTypes = {
  theme: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
}

const defaultProps = {
  arrow: true,
  placement: 'top',
  theme: 'brand',
  allowHTML: true,
}

const Tooltip = (props) => {
  const { children } = props

  return (
    <Tippy {...props}>
      <span>{children}</span>
    </Tippy>
  )
}

Tooltip.propTypes = propTypes
Tooltip.defaultProps = defaultProps

export default Tooltip
