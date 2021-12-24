import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'reflexbox'

import Heading from 'components/Text/Heading'
import BodyCopy from 'components/Text/BodyCopy'
// import { Box } from 'reflexbox'
import theme from 'theme'

const propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
  ]),
  heading: PropTypes.string,
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
}

const Column = ({ width, heading, body }) => {
  return (
    <Box width={width} pr={2} pb={[4, 1]}>
      <Heading size={4} color={theme.superDarkGrey} pb={1}>
        {heading}:
      </Heading>
      <BodyCopy color={theme.darkMedGrey}>{body}</BodyCopy>
    </Box>
  )
}
Column.propTypes = propTypes

export default Column
