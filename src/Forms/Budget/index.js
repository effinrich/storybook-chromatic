import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form/immutable'
import { Prompt } from 'react-router-dom'

import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import ErrorPencil from 'components/ErrorPencil'
import Heading from 'components/Text/Heading'
import ShadowBox from 'components/ShadowBox'
import InputField from 'components/InputField'
import ToggleField from 'components/ToggleField'
import TextArea from 'components/TextArea'
import SelectField from 'components/SelectField'
import { TabletDown } from 'components/Responsive'
import { required } from 'utils/validations'
import { normalizers } from 'utils/reduxForm'
import { typeOptions, periodTypeOptions } from 'utils/budgetOptions'

const validationRules = {
  name: required('A name is required'),
  description: required('Description is required'),
  type: required('Type is required'),
  periodType: required('Period type is required'),
  min: required('Min is required'),
  max: required('Max is required'),
  target: required('Target is required'),
}

const promptMsg =
  'Your changes have not been saved yet. Are you sure you want to leave?'

class BudgetForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func,
    submitSucceeded: PropTypes.bool,
    onSubmit: PropTypes.func,
    change: PropTypes.func,
    dirty: PropTypes.bool,
    error: PropTypes.string,
    budget: PropTypes.object,
    form: PropTypes.string,
    isEdit: PropTypes.bool,
  }

  render() {
    const {
      handleSubmit,
      submitSucceeded,
      dirty,
      error: submissionError,
    } = this.props

    return (
      <TabletDown>
        {(isTablet) => (
          <form onSubmit={handleSubmit}>
            <Prompt when={dirty && !submitSucceeded} message={promptMsg} />
            <ShadowBox level={1} bg="white" p={3} mb={2} width={1} pb={3}>
              <Heading size={2} mb={2}>
                Budget Details
              </Heading>
              {submissionError && (
                <ErrorPencil my={2}>{submissionError}</ErrorPencil>
              )}
              <Field
                label="Name"
                name="name"
                component={InputField}
                placeholder="Name"
                validate={validationRules.name}
                type="text"
                width={1}
              />
              <Field
                label="Description"
                name="description"
                component={TextArea}
                validate={validationRules.description}
                placeholder="Description"
                type="text"
                width={1}
              />
              <Flex flexDirection={['column', 'row']} mt={2}>
                <Box width={[1, 1 / 2]} pr={[0, 1]}>
                  <Field
                    label="Type"
                    name="type"
                    component={SelectField}
                    validate={validationRules.type}
                    parse={(value) => value.value}
                    options={typeOptions}
                    blurInputOnSelect
                    placeholder="Type"
                    type="text"
                    width={1}
                  />
                </Box>
                <Box width={[1, 1 / 2]} pl={[0, 1]}>
                  <Field
                    label="Period type"
                    name="periodType"
                    component={SelectField}
                    validate={validationRules.periodType}
                    parse={(value) => value.value}
                    options={periodTypeOptions}
                    blurInputOnSelect
                    placeholder="Period type"
                    type="text"
                    width={1}
                  />
                </Box>
              </Flex>
              <Flex flexDirection={['column', 'row']} mt={2}>
                <Box width={[1, 1 / 4]} pr={[0, 1]}>
                  <Field
                    label="Min"
                    name="min"
                    component={InputField}
                    placeholder="Min"
                    validate={validationRules.min}
                    normalize={normalizers.onlyDecimal}
                    type="number"
                    width={1}
                  />
                </Box>
                <Box width={[1, 1 / 4]} px={[0, 1]}>
                  <Field
                    label="Max"
                    name="max"
                    component={InputField}
                    placeholder="Max"
                    validate={validationRules.max}
                    normalize={normalizers.onlyDecimal}
                    type="number"
                    width={1}
                  />
                </Box>
                <Box width={[1, 1 / 2]} pl={[0, 1]}>
                  <Field
                    label="Target"
                    name="target"
                    component={InputField}
                    placeholder="target"
                    validate={validationRules.target}
                    type="text"
                    width={1}
                  />
                </Box>
              </Flex>
              <Flex flexDirection={['column', 'row']} mt={1}>
                <Box width={[1, 1 / 2]} pr={[0, 1]}>
                  <Field
                    label="Enabled"
                    name="enabled"
                    component={ToggleField}
                    width={1}
                    labelPosition="left"
                    type="checkbox"
                  />
                </Box>
              </Flex>
            </ShadowBox>
          </form>
        )}
      </TabletDown>
    )
  }
}

export default reduxForm({ enableReinitialize: true })(BudgetForm)
