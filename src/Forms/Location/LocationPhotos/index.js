import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { formValues, FieldArray } from 'redux-form/immutable'
import { List, Map } from 'immutable'
import axios from 'axios'

import { fetchPresignedUrl } from 'store/locations/api'
import { Box } from 'reflexbox'
import LocationImageGrid from 'components/LocationImageGrid'
import ShadowBox from 'components/ShadowBox'
import FlatButton from 'components/FlatButton'
import Heading from 'components/Text/Heading'
import BodyCopy from 'components/Text/BodyCopy'
import Modal from 'components/Modal'

import LocationPhotosModal from './Modal'

export class LocationPhotosComponent extends PureComponent {
  static propTypes = {
    locationPhotos: PropTypes.instanceOf(List),
    change: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      show: false,
      isUploading: false,
      uploadProgress: new List(),
    }
  }

  initUploadProgress = (files) => {
    const initUploadProgress = files.reduce(
      (l, f, i) => l.set(i, new Map({ loaded: 0, total: f.size })),
      new List().setSize(files.length)
    )

    this.setState({ isUploading: true, uploadProgress: initUploadProgress })
  }

  uploadFiles = async (files) => {
    return await axios.all(
      files.map(async (f, i) => {
        const signedUrl = await fetchPresignedUrl(f.type)
        try {
          const response = await axios.put(signedUrl, f, {
            headers: {
              'Content-Type': f.type,
            },
            onUploadProgress: this.handleUploadProgress.bind(this, i),
          })
          return { signedUrl, response }
        } catch (err) {
          console.log(err) // eslint-disable-line no-console
        }
      })
    )
  }

  handleFeatureChange = (featuredIndex) => {
    const { change, locationPhotos } = this.props
    change(
      'photos',
      locationPhotos
        .map((p) => p.set('isPrimary', false))
        .setIn([featuredIndex, 'isPrimary'], true)
    )
  }

  handleUploadProgress = (index, event) => {
    const uploadProgress = this.state.uploadProgress.setIn(
      [index, 'loaded'],
      event.loaded
    )
    this.setState({ uploadProgress })
  }

  handleFileDrop = async (files) => {
    this.initUploadProgress(files)
    const uploadedFiles = await this.uploadFiles(files)
    this.handleUploadComplete(uploadedFiles)
  }

  handleUploadComplete = (uploadedFiles) => {
    const { change, locationPhotos } = this.props

    this.setState({ isUploading: false })

    const updatedPhotos = locationPhotos.push(
      ...uploadedFiles.map(
        (f) =>
          new Map({
            isPrimary: false,
            url: f.signedUrl.split('?')[0],
          })
      )
    )

    change('photos', updatedPhotos)
  }

  handleShowModal = (event) => {
    event && event.stopPropagation()
    event && event.preventDefault()
    this.setState({ show: true })
  }

  handleHideModal = () => {
    this.setState({ show: false })
  }

  render() {
    const { locationPhotos } = this.props
    const { show, isUploading, uploadProgress } = this.state

    const primaryPhoto = locationPhotos
      ? locationPhotos.filter((p) => p.get('isPrimary')).first() ||
        locationPhotos.first()
      : null

    return (
      <ShadowBox level={1} bg="white" p={3} width={1} mb={2}>
        <Heading size={2} mb={2}>
          Photos
        </Heading>
        <BodyCopy my={2}>
          Choose which photos will appear on the business' profile
        </BodyCopy>
        {locationPhotos && locationPhotos.size > 0 && (
          <Box my={2}>
            <LocationImageGrid
              gap="2%"
              primaryPhoto={primaryPhoto}
              photos={locationPhotos.filter((p) => p !== primaryPhoto)}
            />
          </Box>
        )}
        <Box mt={2}>
          <FlatButton primary onClick={this.handleShowModal} width={1}>
            Manage Photos
          </FlatButton>
        </Box>
        <Modal
          noX
          show={show}
          onClose={this.handleHideModal}
          align={['top', 'fullscreen', 'center']}
          width={[1, 1, 9 / 10]}
          maxW="950px"
          maxH={['100%', '725px', '900px']}
          p={[0, 2, 2]}
          closeOnOutsideClick={false}
        >
          {(closeModal) => (
            <FieldArray
              name="photos"
              component={LocationPhotosModal}
              closeModal={closeModal}
              onPrimaryChange={this.handleFeatureChange}
              onFileDrop={this.handleFileDrop}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              photos={locationPhotos}
            />
          )}
        </Modal>
      </ShadowBox>
    )
  }
}

export default formValues({ locationPhotos: 'photos' })(
  LocationPhotosComponent
)
