import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form/immutable'

import InputField from 'components/InputField'
import RadioFieldGroup from 'components/RadioFieldGroup'
import Radio from 'components/Radio'
import FlatButton from 'components/FlatButton'
import ErrorPencil from 'components/ErrorPencil'
import { required } from 'utils/validations'

const validationRules = {
  name: [required('Name is required')],
  parentCategory: [required('Must check one parent category')],
}

const CreateCategoryForm = ({
  handleSubmit,
  submitting,
  pristine,
  error: submissionError,
  categories,
}) => {
  if (!categories) return null
  return (
    <div>
      {submissionError && <ErrorPencil mb={2}>{submissionError}</ErrorPencil>}
      <form onSubmit={handleSubmit}>
        <Field
          label="Name"
          name="name"
          component={InputField}
          validate={validationRules.name}
          placeholder="Name"
          type="text"
          width={1}
        />
        <Field
          name="parentCategory"
          component={RadioFieldGroup}
          validate={validationRules.parentCategory}
        >
          {categories.map((category, index) => (
            <Radio
              label={category.get('label')}
              value={category.get('value')}
              key={index}
            />
          ))}
        </Field>
        <FlatButton
          mt={1}
          primary
          disabled={submitting || pristine}
          submitting={submitting}
          type="submit"
          width={1}
        >
          Create
        </FlatButton>
      </form>
    </div>
  )
}

CreateCategoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  pristine: PropTypes.bool,
  error: PropTypes.string,
  categories: PropTypes.object,
}

export default reduxForm({
  form: 'createCategoryForm',
})(CreateCategoryForm)
