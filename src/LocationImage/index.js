import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Image from 'components/Image'
import Config from 'config'
import placeholder from 'assets/placeholder.jpg'

const LocationImage = ({ src, ...props }) => {
  const [imageSrc, setImageSrc] = useState('')

  useEffect(() => {
    if (src) {
      setImageSrc(
        `${Config.get('/CloudFrontDomain')}/images?url=${encodeURIComponent(
          src
        )}&width=250`
      )
    } else {
      setImageSrc(placeholder)
    }
  }, [src])

  return (
    <Image
      src={imageSrc}
      altImage
      thumb
      showSpinner
      onError={() => setImageSrc(src || placeholder)}
      {...props}
    />
  )
}

LocationImage.propTypes = {
  src: PropTypes.string,
}

export default LocationImage
