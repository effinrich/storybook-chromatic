/* eslint-disable no-restricted-globals */
import React, { useState, useRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import { formValues } from 'redux-form/immutable'
import { List, Map } from 'immutable'
import axios from 'axios'

import theme from 'theme'
import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import Dropzone from 'components/Dropzone'
import AspectRatioImage from 'components/AspectRatioImage'
import Image from 'components/Image'
import ShadowBox from 'components/ShadowBox'
import Heading from 'components/Text/Heading'
import FlatButton from 'components/FlatButton'
import { fetchPresignedUrl } from 'store/locations/api'
import Config from 'config'

const propTypes = {
  uploadedPhoto: PropTypes.instanceOf(List),
  change: PropTypes.func,
  ratio: PropTypes.string,
  isEditPartnerLocation: PropTypes.bool,
}

const defaultProps = {
  ratio: '2:1',
}

const PhotoUploader = ({
  uploadedPhoto,
  change,
  ratio,
  isEditPartnerLocation,
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(new List())

  const uploadProgressRef = useRef(new List())

  const handleInitUploadProgress = async (file) => {
    const initUploadProgress = file.reduce(
      (l, f, i) => l.set(i, new Map({ loaded: 0, total: f.size })),
      new List().setSize(file.length)
    )
    setIsUploading(true)
    uploadProgressRef.current = initUploadProgress
  }

  const handleUploadProgress = (index, event) => {
    const progress = uploadProgressRef.current.setIn(
      [index, 'loaded'],
      event.loaded
    )
    setUploadProgress(progress)
  }

  const handleUploadFiles = async (files) => {
    return await axios.all(
      files.map(async (f, i) => {
        const signedUrl = await fetchPresignedUrl(f.type)
        try {
          const response = await axios.put(signedUrl, f, {
            headers: {
              'Content-Type': f.type,
            },
            onUploadProgress: handleUploadProgress.bind(this, i),
          })
          return { signedUrl, response }
        } catch (err) {
          console.log(err) // eslint-disable-line no-console
        }
      })
    )
  }

  const handleUploadComplete = (uploadedFile) => {
    setIsUploading(false)
    setUploadProgress(new List())

    const updatedPhoto = new List([
      new Map({
        isPrimary: false,
        url: uploadedFile[0].signedUrl.split('?')[0],
      }),
    ])

    change('photos', updatedPhoto)
  }

  const handleFileDrop = async (file) => {
    handleInitUploadProgress(file)
    const uploadedFile = await handleUploadFiles(file)
    handleUploadComplete(uploadedFile)
  }

  const handleDeletePhoto = () => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this photo?  Select "ok" to proceed.'
    )

    if (confirmDelete) {
      change('photos', new List())
    }
  }

  let loaded = 0
  let total = 0

  loaded = uploadProgress.reduce((sum, entry) => sum + entry.get('loaded'), 0)
  total = uploadProgress.reduce((sum, entry) => sum + entry.get('total'), 0)

  return (
    <ShadowBox level={1} bg="white" p={3} mb={2} width={1}>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Heading size={2}>Photo</Heading>

        {uploadedPhoto && uploadedPhoto.size > 0 && (
          <FlatButton type="button" danger small onClick={handleDeletePhoto}>
            Delete photo
          </FlatButton>
        )}
      </Flex>
      <Flex flexDirection={['column', 'column', 'row', 'row']}>
        {uploadedPhoto && uploadedPhoto.size > 0 ? (
          <Fragment>
            <Box
              width={[
                1,
                1,
                isEditPartnerLocation ? 2 / 3 : 1,
                isEditPartnerLocation ? 2 / 3 : 1 / 2,
              ]}
              pr={[0, 0, isEditPartnerLocation ? 1 : 0, 1]}
            >
              <Dropzone
                disableRatio={isEditPartnerLocation}
                isUploading={isUploading}
                onDrop={handleFileDrop}
                placeholderCopy="Drag image here or click anywhere to upload"
                progress={loaded / total}
              />
            </Box>
            <Box
              width={[
                1,
                1,
                isEditPartnerLocation ? 1 / 3 : 1,
                isEditPartnerLocation ? 1 / 3 : 1 / 2,
              ]}
              pl={[0, 0, isEditPartnerLocation ? 1 : 0, 1]}
              pt={[2, 2, isEditPartnerLocation ? 0 : 2, 0]}
            >
              {isEditPartnerLocation ? (
                <Image
                  src={`${Config.get(
                    '/CloudFrontDomain'
                  )}/images?url=${encodeURIComponent(
                    uploadedPhoto.getIn([0, 'url'])
                  )}&width=375&height=270`}
                  alt="location offer photo"
                  maxWidth={'100%'}
                  // showSpinner
                  borderColor={theme.primaryButtonOverBg}
                />
              ) : (
                <AspectRatioImage
                  width={1}
                  ratio={ratio}
                  alt=""
                  bg={theme.lightMedGrey}
                  src={`${Config.get(
                    '/CloudFrontDomain'
                  )}/images?url=${encodeURIComponent(
                    uploadedPhoto.getIn([0, 'url'])
                  )}&width=415`}
                  border
                />
              )}
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Box
              width={[
                1,
                1,
                isEditPartnerLocation ? 2 / 3 : 1,
                isEditPartnerLocation ? 2 / 3 : 1 / 2,
              ]}
              pr={[0, 0, isEditPartnerLocation ? 2 : 0, 2]}
            >
              <Dropzone
                disableRatio={isEditPartnerLocation}
                isUploading={isUploading}
                onDrop={handleFileDrop}
                placeholderCopy="Drag image here or click anywhere to upload"
                progress={loaded / total}
              />
            </Box>
            <Box
              width={[
                1,
                1,
                isEditPartnerLocation ? 1 / 3 : 1,
                isEditPartnerLocation ? 1 / 3 : 1 / 2,
              ]}
              pl={[0, 0, isEditPartnerLocation ? 2 : 0, 2]}
              mt={[2, 2, isEditPartnerLocation ? 0 : 2, 0]}
              style={{ border: `2px solid ${theme.primaryButtonOverBg}` }}
            >
              <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection={'column'}
                p={3}
                m={0}
                height="100%"
              >
                <Box>
                  To ensure the highest quality image is shown in the Freebird
                  app please adhear to the following image guidelines:
                  <ul style={{ fontSize: '15px' }}>
                    <li style={{ marginBottom: '9px' }}>
                      <strong>
                        Uploaded image should be no smaller than 375x270 pixels.
                      </strong>
                    </li>
                    <li style={{ marginBottom: '9px' }}>
                      <strong>Accepted file types are JPEG and PNG.</strong>
                    </li>
                    <li>
                      <strong>
                        Please avoid logos and images containing people. We
                        reccomend a location or food/beverage photo.
                      </strong>
                    </li>
                  </ul>
                </Box>
              </Flex>
            </Box>
          </Fragment>
        )}
      </Flex>
    </ShadowBox>
  )
}

PhotoUploader.propTypes = propTypes
PhotoUploader.defaultProps = defaultProps

export default formValues({ uploadedPhoto: 'photos' })(PhotoUploader)
