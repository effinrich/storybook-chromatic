import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { FaArrowUp, FaReply } from 'react-icons/fa'

import { MobileDown, TabletUp } from 'components/Responsive'
import { Box } from 'reflexbox'
import Dropzone from 'components/Dropzone'
import FlatButton from 'components/FlatButton'
import Heading from 'components/Text/Heading'
import BodyCopy from 'components/Text/BodyCopy'
import Flex from 'components/Flex'
import theme from 'theme'

import FeaturedCard from './FeaturedCard'
import PhotoCard from './PhotoCard'

const LocationPhotosModal = ({
  onPrimaryChange,
  onFileDrop,
  closeModal,
  isUploading,
  uploadProgress,
  photos: photoList,
  fields: photoFields,
}) => {
  let loaded = 0
  let total = 0

  const primaryPhoto =
    photoList.filter((p) => p.get('isPrimary')).first() || photoList.first()
  const nonPrimaryPhotos = photoList.filter((p) => p !== primaryPhoto)

  loaded = uploadProgress.reduce((sum, entry) => sum + entry.get('loaded'), 0)
  total = uploadProgress.reduce((sum, entry) => sum + entry.get('total'), 0)

  return (
    <Flex
      h={['auto', '100%', '80vw']}
      maxH={['auto', 'auto', '900px']}
      flexDirection={['column', 'row']}
    >
      <Box
        p={3}
        width={photoList.size > 0 ? ['auto', 1 / 2] : ['auto', 1]}
        bg={theme.backgroundColor}
      >
        {primaryPhoto ? (
          <Fragment>
            <FeaturedCard width={1} mb={2} photo={primaryPhoto} />
            <Heading size={2} my={2}>
              Featured Photo
            </Heading>
            <BodyCopy mt={2} mb={3}>
              This is the main photo and the first photo users will see of this
              location.{' '}
            </BodyCopy>
          </Fragment>
        ) : (
          <Fragment>
            <Heading size={2} my={2}>
              Upload Your Photos
            </Heading>
            <BodyCopy mt={2} mb={3}>
              Use the box below to start uploading your photos for this
              Location.{' '}
            </BodyCopy>
          </Fragment>
        )}
        <Box mb={[3, 4]}>
          <Dropzone
            isUploading={isUploading}
            onDrop={onFileDrop}
            ratio="37:17"
            multiple
            progress={loaded / total}
          />
        </Box>
        <FlatButton
          primary
          mx="auto"
          d="block"
          width={1 / 3}
          onClick={closeModal}
        >
          Done
        </FlatButton>
      </Box>
      {photoList.size > 0 && (
        <Box p={3} width={['auto', 1 / 2]} overflow="auto">
          {nonPrimaryPhotos.size === 0 ? (
            <Heading
              light
              grey
              fontSize={[3, 2, 3, 4]}
              size={2}
              pt={[25, 100]}
              pb={[75, 100]}
              textAlign="center"
            >
              <MobileDown>
                <FaArrowUp
                  size={45}
                  color={theme.warningColor}
                  style={{ margin: '12px' }}
                />
                <br />
              </MobileDown>
              Your featured photo is all alone{' '}
              <span role="img" aria-label="Sad Face">
                ☹️
              </span>
              <br />
              Add some more photos!
              <br />
              <TabletUp>
                <FaReply
                  size={45}
                  color={theme.warningColor}
                  style={{ margin: '12px', transform: 'rotate(180deg)' }}
                />
              </TabletUp>
            </Heading>
          ) : (
            <Fragment>
              <Heading size={2} my={2}>
                Manage Photos
              </Heading>
              <BodyCopy mt={2} mb={3}>
                Tap the star to select a new featured photo or delete any photos
                you no longer want to show on the app.
              </BodyCopy>
              {nonPrimaryPhotos.map((p, i) => (
                <PhotoCard
                  key={i}
                  width={1}
                  mb={2}
                  onPrimaryChange={
                    /* istanbul ignore next */ () =>
                      onPrimaryChange(photoList.indexOf(p))
                  }
                  onRemove={
                    /* istanbul ignore next */ () =>
                      photoFields.remove(photoList.indexOf(p))
                  }
                  photo={p}
                />
              ))}
            </Fragment>
          )}
        </Box>
      )}
    </Flex>
  )
}

LocationPhotosModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onPrimaryChange: PropTypes.func,
  onFileDrop: PropTypes.func,
  isUploading: PropTypes.bool,
  uploadProgress: PropTypes.instanceOf(List),
  photos: PropTypes.instanceOf(List),
  fields: PropTypes.object,
}

export default LocationPhotosModal
