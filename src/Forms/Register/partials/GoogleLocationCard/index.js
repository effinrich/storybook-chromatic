/* eslint no-magic-numbers: 0 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import theme from 'theme'
import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import Image from 'components/Image'
import Heading from 'components/Text/Heading'
import BodyCopy from 'components/Text/BodyCopy'
import Config from 'config'

import StyledGoogleLocationCard, { StyledLocationImgBox } from './style'

const propTypes = {
  googlePlace: PropTypes.object,
}

const defaultProps = {
  bg: 'white',
  p: 2,
}

const GoogleLocationCard = ({ googlePlace, ...styleProps }) => {
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    const locationPhotos = googlePlace.photos.toJS()
    const photo = locationPhotos.find((p) => p.isPrimary)
      ? locationPhotos.find((p) => p && p.isPrimary).url
      : locationPhotos[0] && locationPhotos[0].url

    setPhoto(photo)
  }, [googlePlace])

  return (
    <StyledGoogleLocationCard {...styleProps}>
      <Flex alignItems="center">
        <StyledLocationImgBox width={1 / 4} mr={2}>
          <Image
            src={`${Config.get(
              '/CloudFrontDomain'
            )}/images?url=${encodeURIComponent(photo)}&height=100`}
            alt={googlePlace.name}
            thumb
            showSpinner
            border
            borderColor={theme.lightGrey}
          />
        </StyledLocationImgBox>
        <Box width={3 / 4} ml={[3, 2, 0]}>
          <Heading size={4}>{googlePlace.name}</Heading>
          <BodyCopy>
            {googlePlace.address}
            <br />
            {googlePlace.city}, {googlePlace.state} {googlePlace.zipcode}
          </BodyCopy>
        </Box>
      </Flex>
    </StyledGoogleLocationCard>
  )
}

GoogleLocationCard.propTypes = propTypes
GoogleLocationCard.defaultProps = defaultProps

export default GoogleLocationCard
