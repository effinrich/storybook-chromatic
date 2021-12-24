import React from 'react'
import PropTypes from 'prop-types'

import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import BodyCopy from 'components/Text/BodyCopy'
import LocationImage from 'components/LocationImage'

import StyledLocationGroupTile, {
  StyledLocationGroupTileImageWrapper,
  StyledLocationGroupTileName,
  StyledLocationGroupTileDetails,
} from './style'

const propTypes = {
  item: PropTypes.object,
}

const defaultProps = {
  isCategory: false,
}

const LocationGroupTile = ({ item }) => {
  return (
    <StyledLocationGroupTile level={1}>
      <StyledLocationGroupTileImageWrapper>
        <LocationImage
          src={item.photo}
          alt={`Photo for ${item.name}`}
          maxWidth={200}
        />
        <StyledLocationGroupTileName>{item.name}</StyledLocationGroupTileName>
      </StyledLocationGroupTileImageWrapper>

      <StyledLocationGroupTileDetails>
        <Flex justifyContent="space-between" mb={1}>
          <Box>
            <BodyCopy fontSize={1} lineHeight={1.5}>
              {item.address}
            </BodyCopy>
            <BodyCopy fontSize={1} lineHeight={1.5}>
              {item.city}, {item.state} {item.zipcode}
            </BodyCopy>
          </Box>
        </Flex>
      </StyledLocationGroupTileDetails>
    </StyledLocationGroupTile>
  )
}

LocationGroupTile.propTypes = propTypes
LocationGroupTile.defaultProps = defaultProps

export default LocationGroupTile
