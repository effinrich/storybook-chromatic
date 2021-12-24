import React from 'react'
import { storiesOf } from '@storybook/react'
import { FieldArray, reduxForm } from 'redux-form/immutable'
import { Provider } from 'react-redux'

import locationsFixture from 'fixtures/fetch-locations.json'
import { Location } from 'models'
import createStore from 'store'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'

import Hours from '.'

const mockLocationSplit = new Location(locationsFixture.data[1])
const mockLocationNoHours = new Location(locationsFixture.data[3])
const mockLocationHours = new Location(locationsFixture.data[0])

const store = createStore()

const MockForm = reduxForm()(({ children }) => <form>{children}</form>)

const WrappedHours = (props) => (
  <Provider store={store}>
    <MockForm
      form="hoursMock"
      initialValues={
        props.initialValues ? props.initialValues.mapForReduxForm() : undefined
      }
    >
      <FieldArray name="hours" component={Hours} {...props} />
    </MockForm>
  </Provider>
)

storiesOf('Hours', module)
  .addDecorator(Decorator)
  .add('split hours', () => (
    <Padding>
      <WrappedHours initialValues={mockLocationSplit} />
    </Padding>
  ))
  .add('hours w/no initial values', () => (
    <Padding>
      <WrappedHours initialValues={mockLocationNoHours} />
    </Padding>
  ))
  .add('hours w/error', () => (
    <Padding>
      <WrappedHours
        initialValues={mockLocationHours}
        meta={{
          submitFailed: true,
          dirty: true,
          error: 'It broke',
        }}
      />
    </Padding>
  ))
  .add('hours w/warning', () => (
    <Padding>
      <WrappedHours
        initialValues={mockLocationHours}
        meta={{
          submitFailed: true,
          dirty: true,
          warning: 'You\'ve been warned',
        }}
      />
    </Padding>
  ))
