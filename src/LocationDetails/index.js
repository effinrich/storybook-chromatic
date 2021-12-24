/* eslint no-magic-numbers: 0 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Flex from '../Flex'
import Box from '../Box'
import Image from '../Image'
import Heading from '../Text/Heading'
import BodyCopy from '../Text/BodyCopy'
// import ToggleField from '../ToggleField'
import { Location } from 'models'
import Config from 'config'

import StyledLocationDetails, { StyledLocationImgBox } from './style'

export default class LocationDetails extends PureComponent {
  static propTypes = {
    location: PropTypes.instanceOf(Location),
    // onChange: PropTypes.func
  }

  static defaultProps = {
    bg: 'white',
    p: 2,
  }

  // constructor(props) {
  //   super(props)
  //
  //   this.state = {
  //     status: props.location.status === 10
  //   }
  // }

  render() {
    const { location, /*onChange,*/ ...styleProps } = this.props

    // const { status } = this.state

    const locationPhotos = location.photos.toJS()
    const photo = locationPhotos.find((p) => p.isPrimary)
      ? locationPhotos.find((p) => p && p.isPrimary).url
      : locationPhotos[0] && locationPhotos[0].url

    return (
      <StyledLocationDetails {...styleProps}>
        <Flex alignItems="center">
          <StyledLocationImgBox width={1 / 4} mr={2}>
            <Image
              src={`${Config.get(
                '/CloudFrontDomain'
              )}/images?url=${encodeURIComponent(photo)}&height=100`}
              alt={location.name}
              thumb
              showSpinner
            />
          </StyledLocationImgBox>
          <Box width={3 / 4} ml={[3, 2, 0]}>
            <Heading size={4}>{location.name}</Heading>
            <BodyCopy>
              {location.address}
              <br />
              {location.city}, {location.state}
              <br />
              {location.zipcode}
            </BodyCopy>
          </Box>
        </Flex>
        {/* <Flex mt={2}>
          <ToggleField
            label="Turn this location on or off"
            input={{ name: 'status', checked: status, onChange }}
            meta={{}}
          />
        </Flex> */}
      </StyledLocationDetails>
    )
  }
}
