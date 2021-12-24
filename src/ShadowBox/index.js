import PropTypes from 'prop-types'

import ShadowBox from './style'

const propTypes = {
  // eslint-disable-next-line no-magic-numbers
  level: PropTypes.oneOf([0, 1, 2, 3]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  // use this for elements that need responsive/full width behavior. RideCard is one such element.
  fullWidth: PropTypes.bool,
  bg: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.array,
  ]),
}

const defaultProps = {
  level: 2,
  fullWidth: false,
}

ShadowBox.propTypes = propTypes
ShadowBox.defaultProps = defaultProps

export default ShadowBox
