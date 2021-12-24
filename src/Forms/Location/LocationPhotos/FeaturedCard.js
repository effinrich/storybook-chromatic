import React from 'react'
import PropTypes from 'prop-types'
import { GoStar } from 'react-icons/go'
import { Map } from 'immutable'

import Flex from 'components/Flex'
import AspectRatioImage from 'components/AspectRatioImage'
import { Box } from 'reflexbox'
import ReactIconWrapper from 'components/ReactIconWrapper'
import Circle from 'components/Circle'
import theme from 'theme'
import Config from 'config'

const FeaturedCard = ({ photo, ...styledProps }) => {
  return (
    <Box {...styledProps}>
      <AspectRatioImage
        width={1}
        ratio="25:16"
        alt=""
        bg={theme.lightMedGrey}
        src={`${Config.get(
          '/CloudFrontDomain'
        )}/images?url=${encodeURIComponent(photo.get('url'))}&width=415`}
      >
        <Flex h="100%" p={1} alignItems="flex-end" justifyContent="flex-start">
          <Circle p={1}>
            <ReactIconWrapper icon={GoStar} size={18} color={'white'} />
          </Circle>
        </Flex>
      </AspectRatioImage>
    </Box>
  )
}

FeaturedCard.propTypes = {
  photo: PropTypes.instanceOf(Map),
}

export default FeaturedCard
