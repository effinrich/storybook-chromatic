import React, { useState } from 'react'
import PropTypes from 'prop-types'

import FlatButton from 'components/FlatButton'
import ProgressCircle from 'components/ProgressCircle'
import { Box } from 'reflexbox'
import { Flex } from 'reflexbox'
import BodyCopy from 'components/Text/BodyCopy'
import theme from 'theme'

const propTypes = {
  onTrigger: PropTypes.func.isRequired,
  btnText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  inProgress: PropTypes.bool,
  setInProgress: PropTypes.func,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
  handleClick: PropTypes.func,
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
}

const defaultProps = {
  onSuccess: () => {},
  onFail: () => {},
  color: theme.brandColor,
  fullWidth: true,
}

const AsyncSidebarButton = ({
  color,
  onSuccess,
  onFail,
  onTrigger,
  btnText,
  fullWidth,
  ...rest
}) => {
  const [inProgress, setInProgress] = useState(false)

  const handleClick = async () => {
    if (inProgress) return
    setInProgress(true)
    try {
      const result = await onTrigger()
      onSuccess(result)
    } catch (err) {
      onFail(err)
    } finally {
      setInProgress(false)
    }
  }

  return (
    <FlatButton
      fullWidth={fullWidth}
      py={1}
      px={0}
      overBg="transparent"
      color={color}
      hover={{ textDecoration: 'underline' }}
      onClick={handleClick}
      {...rest}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        color={theme.brandColor}
      >
        <BodyCopy color={color} mb={0} mt={0}>
          {btnText}
        </BodyCopy>
        {inProgress && (
          <Box px={0} ml={2}>
            <ProgressCircle scale={0.2} color={color} />
          </Box>
        )}
      </Flex>
    </FlatButton>
  )
}

AsyncSidebarButton.propTypes = propTypes
AsyncSidebarButton.defaultProps = defaultProps

export default AsyncSidebarButton
