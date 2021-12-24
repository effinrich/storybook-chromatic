# CheckboxField

## Usage

```
import CheckboxField from '<path_to>/CheckboxField'

<CheckboxField
  label="This is a label"
  name="checkboxField"
  onChange={this.handleChange}
  labelPosition="right"
  width="250px"
  disabled={false}
/>
```

## Properties

- **input** (required) - Object containing input field attributes.
- **onChange** (optional) - Function that can be passed to toggle change event.
- **label** (optional) - String value for optional toggle label
- **width** (optional) - Width of toggle field. Note: Max width is 250px and value must be in px. Ex: width="200px"
- **labelPosition** (optional) - Default: 'left' - Label position. Options are 'left' or 'right'. Default is 'left'.
- **disabled** (optional) - Default: false - Boolean that disables the toggle by muting color and preventing pointer events.
- **meta** (optional) - Shape containing touched, warning and error props from redux-form.

## Notes

## Examples

- For this to work in redux-form the type must be set to checkbox, see example redux-form usage below

```
import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import CheckboxField from '../../../components/CheckboxField'

const ExampleCheckboxFieldForm = ({ handleSubmit, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        label="checkbox"
        name="checkbox"
        component={CheckboxField}
        type="checkbox"
      />
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  )
}

ExampleCheckboxFieldForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'checkboxFieldForm'
})(ExampleCheckboxFieldForm)

```
