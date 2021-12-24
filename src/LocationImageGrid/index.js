import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { List, Map } from 'immutable'
import { Textfit } from 'react-textfit'

// import Image from 'components/Image'
import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import AspectRatioContainer from 'components/AspectRatioContainer'
import BodyCopy from 'components/Text/BodyCopy'
import Config from 'config'

import { StyledLocationImage } from './style'

const propTypes = {
  primaryPhoto: PropTypes.instanceOf(Map).isRequired,
  photos: PropTypes.instanceOf(List).isRequired,
  gap: PropTypes.string,
  ratio: PropTypes.string,
}

const defaultProps = {
  height: '30px',
  ratio: '10:3',
  gap: '1%',
}

const LocationImageGrid = ({ primaryPhoto, photos, gap, ratio }) => {
  const [primaryPhotoUrl, setPrimaryPhotoUrl] = useState('')

  useEffect(() => {
    setPrimaryPhotoUrl(
      `${Config.get('/CloudFrontDomain')}/images?url=${encodeURIComponent(
        primaryPhoto.get('url')
      )}&height=184`
    )
  }, [primaryPhoto])

  let diff = 0

  if (photos.size > 8) {
    diff = photos.size - 8
    photos = photos.setSize(7)
  }

  return (
    <AspectRatioContainer ratio={ratio}>
      <Flex
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        justifyContent="stretch"
      >
        <Box flex="1" mr={gap}>
          <StyledLocationImage
            src={primaryPhotoUrl}
            onError={() => setPrimaryPhotoUrl(primaryPhoto.get('url'))}
          />
        </Box>
        <Flex flexWrap="wrap" width={2 / 3} m={`calc(-${gap} / 2)`}>
          {photos.valueSeq().map((p, i) => (
            <Box
              key={i}
              m={`calc(${gap} / 2)`}
              flex={`0 0 calc(25% - ${gap})`}
              style={{
                height: `calc(50% - ${gap})`,
              }}
            >
              <StyledLocationImage
                src={`${Config.get(
                  '/CloudFrontDomain'
                )}/images?url=${encodeURIComponent(p.get('url'))}&height=95`}
              />
            </Box>
          ))}
          {diff > 0 && (
            <Flex
              m={`calc(${gap} / 2)`}
              flex={`0 0 calc(25% - ${gap})`}
              alignItems="center"
              justifyContent="center"
              style={{
                height: `calc(50% - ${gap})`,
              }}
            >
              <Textfit mode="multi" style={{ width: '65%', height: '65%' }}>
                <BodyCopy light fontSize="inherit" textAlign="center">
                  +{diff}
                  <br />
                  More
                </BodyCopy>
              </Textfit>
            </Flex>
          )}
        </Flex>
      </Flex>
    </AspectRatioContainer>
  )
}

LocationImageGrid.propTypes = propTypes
LocationImageGrid.defaultProps = defaultProps

export default LocationImageGrid
