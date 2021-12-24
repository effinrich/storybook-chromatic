# RadioFieldGroup

## Usage

```
import Button from '<path_to>/RadioFieldGroup'

<RadioGroup name"radioField" labelPosition="right">
  <Radio label="This is a label" value="radio value 1" />
  <Radio label="This is another label" value="radio value 2" />
  <Radio label="One more label" value="radio value 3" />
</RadioGroup>

```

## Properties

- **propName** - Prop Description

## Examples

```
import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import RadioFieldGroup from '../../../components/RadioFieldGroup'
import Radio from '../../../components/Radio'

const ExampleRadioFieldGroupForm = ({ handleSubmit, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="radio"
        component={RadioFieldGroup}
      >
        <Radio label="This is a label" value="radio value 1" />
        <Radio label="This is another label" value="radio value 2" />
        <Radio label="One more label" value="radio value 3" />
      </Field>
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  )
}

ExampleRadioFieldGroupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'radioFieldGroupForm'
})(ExampleRadioFieldGroupForm)

```
