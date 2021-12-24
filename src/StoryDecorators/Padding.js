import React from 'react'
import PropTypes from 'prop-types'
import { Stage } from './index'

const Padding = (props) => (
  <Stage p={15} {...props}>
    {props.children}
  </Stage>
)

Padding.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Padding
