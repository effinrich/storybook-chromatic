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
import { typeOptions, targetTypeOptions } from 'utils/segmentOptions'

const validationRules = {
  name: required('A name is required'),
  description: required('Description is required'),
  type: required('Type is required'),
  targetType: required('Target type is required'),
}

const promptMsg =
  'Your changes have not been saved yet. Are you sure you want to leave?'

class SegmentForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func,
    submitSucceeded: PropTypes.bool,
    onSubmit: PropTypes.func,
    change: PropTypes.func,
    dirty: PropTypes.bool,
    error: PropTypes.string,
    segment: PropTypes.object,
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
                Segment Details
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
                    label="Target type"
                    name="targetType"
                    component={SelectField}
                    validate={validationRules.targetType}
                    parse={(value) => value.value}
                    options={targetTypeOptions}
                    blurInputOnSelect
                    placeholder="Target type"
                    type="text"
                    width={1}
                  />
                </Box>
              </Flex>
              <Flex flexDirection={['column', 'row']} my={2}>
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

export default reduxForm({ enableReinitialize: true })(SegmentForm)
