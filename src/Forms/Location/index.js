import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'
import { Prompt } from 'react-router-dom'

import LocationInfoFields from './LocationInfoFields'
import LocationPhotos from './LocationPhotos'
import PhotoUploader from 'components/Forms/PhotoUploader'
import HoursFields from './HoursFields'
import CategoriesField from './CategoriesField'

const promptMsg =
  'Your changes have not been saved yet. Are you sure you want to leave?'

const LocationForm = (props) => {
  const {
    isAdmin,
    handleSubmit,
    dirty,
    error: submissionError,
    children,
  } = props

  return (
    <form onSubmit={handleSubmit}>
      <Prompt when={dirty} message={promptMsg} />
      <LocationInfoFields {...props} />
      <HoursFields error={submissionError} {...props} />
      {isAdmin ? (
        <LocationPhotos error={submissionError} {...props} />
      ) : (
        <>
          <CategoriesField error={submissionError} {...props} />
          <PhotoUploader
            error={submissionError}
            isEditPartnerLocation
            {...props}
          />
        </>
      )}
      {children && children(props)}
    </form>
  )
}

LocationForm.propTypes = {
  isAdmin: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  dirty: PropTypes.bool,
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  children: PropTypes.func,
}

export default reduxForm({
  enableReinitialize: true,
  initialValues: {
    geo: [],
  },
})(LocationForm)
