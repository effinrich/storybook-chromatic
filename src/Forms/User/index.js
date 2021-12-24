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
import Select from 'components/Select'
import { TabletDown } from 'components/Responsive'
import {
  required,
  requiredWhen,
  mustEqualField,
  email,
} from 'utils/validations'
import { normalizers } from 'utils/reduxForm'

const validationRules = {
  name: required('Required'),
  email: [required('Email is required'), email('Invalid email')],
  roles: required('At least one role is required'),
  password: [required('Password cannot be empty')],
  confirmPassword: [
    requiredWhen(
      (allValues) =>
        allValues.get('password') && allValues.get('password') !== '',
      'A confirmation password is required'
    ),
    mustEqualField('password', 'Your passwords do not match'),
  ],
}

const promptMsg =
  'Your changes have not been saved yet. Are you sure you want to leave?'

const rolesOptions = [
  { value: 'admin', label: 'admin' },
  { value: 'superadmin', label: 'superadmin' },
  { value: 'support', label: 'support' },
]

class UserForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func,
    submitSucceeded: PropTypes.bool,
    onSubmit: PropTypes.func,
    change: PropTypes.func,
    dirty: PropTypes.bool,
    error: PropTypes.string,
    user: PropTypes.object,
    form: PropTypes.string,
    isEdit: PropTypes.bool,
  }

  constructor() {
    super()

    this.state = {
      values: [{ label: 'admin', value: 'admin' }],
    }
  }

  componentDidMount() {
    const { user, isEdit, change } = this.props

    if (isEdit) {
      const tagsArr = []
      const roles = user.get('roles') ? user.get('roles') : []

      roles.map((role) => {
        tagsArr.push({ value: role, label: role })
        return tagsArr
      })

      this.setState({
        values: tagsArr,
      })
    } else {
      const rolesArr = []
      this.state.values.map((role) => {
        rolesArr.push(role.value)
        return rolesArr
      })

      change('roles', rolesArr)
    }
  }

  handleOnRolesChange = (values) => {
    this.setState({ values })

    const roles = []
    values &&
      values.map((role) => {
        roles.push(role.value)
        return roles
      })

    this.props.change('roles', roles)
  }

  render() {
    const {
      handleSubmit,
      submitSucceeded,
      dirty,
      error: submissionError,
    } = this.props
    const { values } = this.state

    return (
      <TabletDown>
        {(isTablet) => (
          <form onSubmit={handleSubmit}>
            <Prompt when={dirty && !submitSucceeded} message={promptMsg} />
            <ShadowBox level={1} bg="white" p={3} mb={2} width={1} pb={3}>
              <Heading size={2} mb={2}>
                User Details
              </Heading>
              {submissionError && (
                <ErrorPencil my={2}>{submissionError}</ErrorPencil>
              )}
              <Field
                label="First name"
                name="firstName"
                component={InputField}
                placeholder="First name"
                validate={validationRules.name}
                type="text"
                width={1}
                autoComplete="nope"
                normalize={normalizers.capitalize}
              />
              <Field
                label="Last name"
                name="lastName"
                component={InputField}
                placeholder="Last name"
                validate={validationRules.name}
                type="text"
                width={1}
                autoComplete="nope"
                normalize={normalizers.capitalize}
              />
              <Field
                label="Email"
                name="email"
                component={InputField}
                validate={validationRules.email}
                placeholder="Email"
                type="email"
                width={1}
                autoComplete="nope"
              />
              <Select
                altLabel="Roles"
                placeholder="Roles"
                name="roles"
                isMulti
                isClearable={false}
                value={values}
                options={rolesOptions}
                onChange={this.handleOnRolesChange}
                type="text"
                validate={validationRules.roles}
              />
              <Flex flexDirection={['column', 'row']} mt={3}>
                <Box width={[1, 1 / 2]} pr={[0, 1]}>
                  <Field
                    label="Password"
                    name="password"
                    component={InputField}
                    validate={validationRules.password}
                    blurInputOnSelect
                    placeholder="Password"
                    type="password"
                    width={1}
                    autoComplete="nope"
                  />
                </Box>
                <Box width={[1, 1 / 2]} pl={[0, 1]}>
                  <Field
                    label="Confirm password"
                    name="confirmPassword"
                    component={InputField}
                    validate={validationRules.confirmPassword}
                    blurInputOnSelect
                    placeholder="Confirm password"
                    type="password"
                    width={1}
                    autoComplete="nope"
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

export default reduxForm({ enableReinitialize: true })(UserForm)
