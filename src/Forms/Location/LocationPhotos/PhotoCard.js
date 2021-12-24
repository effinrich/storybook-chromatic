import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { GoStar } from 'react-icons/go'
import { MdClear } from 'react-icons/md'

import Flex from 'components/Flex'
import FlatButton from 'components/FlatButton'
import { Box } from 'reflexbox'
import AspectRatioImage from 'components/AspectRatioImage'
import theme from 'theme'
import Config from 'config'

const PhotoCard = ({ onRemove, onPrimaryChange, photo, ...styledProps }) => (
  <Box {...styledProps}>
    <AspectRatioImage
      width={1}
      ratio="25:16"
      alt=""
      bg={theme.lightMedGrey}
      src={`${Config.get('/CloudFrontDomain')}/images?url=${encodeURIComponent(
        photo.get('url')
      )}&width=415`}
    >
      <Flex
        h="100%"
        px={1}
        py={3}
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Box>
          <FlatButton
            circle
            p={2}
            color="white"
            bg="rgba(255, 255, 255, 0.3)"
            overBg="rgba(255, 255, 255, 0.5)"
            boxShadow="0px 0px 15px 4px rgba(0, 0, 0, 0.18)"
            onClick={onPrimaryChange}
          >
            <GoStar size={30} />
          </FlatButton>
        </Box>
        <Box>
          <FlatButton
            circle
            p={2}
            color="white"
            bg="rgba(255, 255, 255, 0.3)"
            overBg="rgba(255, 255, 255, 0.5)"
            boxShadow="0px 0px 15px 4px rgba(0, 0, 0, 0.18)"
            onClick={onRemove}
          >
            <MdClear size={30} />
          </FlatButton>
        </Box>
      </Flex>
    </AspectRatioImage>
  </Box>
)

PhotoCard.propTypes = {
  onRemove: PropTypes.func.isRequired,
  onPrimaryChange: PropTypes.func.isRequired,
  photo: PropTypes.instanceOf(Map),
}

export default PhotoCard
