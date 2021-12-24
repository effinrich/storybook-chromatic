import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import theme from 'theme'
import Image from 'components/Image'
import { Flex } from 'reflexbox'
import { Box } from 'reflexbox'
import BodyCopy from 'components/Text/BodyCopy'
import Config from 'config'

import placeholder from 'assets/placeholder.jpg'

import StyledCarouselTile, {
  StyledCarouselTileImageWrapper,
  StyledCarouselTileName,
  StyledCarouselTileDetails,
} from './style'

const propTypes = {
  item: PropTypes.object,
  isCategory: PropTypes.bool,
}

const defaultProps = {
  isCategory: false,
}

const CarouselTile = ({ item, isCategory }) => {
  const [photo, setPhoto] = useState('')

  useEffect(() => {
    setPhoto(
      `${Config.get('/CloudFrontDomain')}/images?url=${encodeURIComponent(
        item.photo
      )}&width=250`
    )
  }, [item])

  return (
    <StyledCarouselTile>
      <StyledCarouselTileImageWrapper>
        <StyledCarouselTileName>{item.name}</StyledCarouselTileName>
        <Image
          src={photo}
          alt={`Photo for ${item.name}`}
          maxWidth={150}
          altImage
          onError={() => setPhoto(item.photo ? item.photo : placeholder)}
          thumb
          showSpinner
        />
      </StyledCarouselTileImageWrapper>

      {!isCategory && (
        <StyledCarouselTileDetails>
          <Flex justifyContent="space-between" mb={1}>
            <Box>
              <BodyCopy fontWeight="bold" fontSize={1}>
                {item.rideContribution
                  ? `$${item.rideContribution} cash-back`
                  : `${item.points} points`}
              </BodyCopy>
            </Box>
            <Box>
              <BodyCopy fontSize={1} color={theme.medGrey}>
                {item.distance}
              </BodyCopy>
            </Box>
          </Flex>

          <BodyCopy fontSize={1}>{item.locationCategory}</BodyCopy>
          <BodyCopy fontSize={1}>{item.location}</BodyCopy>
        </StyledCarouselTileDetails>
      )}
    </StyledCarouselTile>
  )
}

CarouselTile.propTypes = propTypes
CarouselTile.defaultProps = defaultProps

export default CarouselTile
