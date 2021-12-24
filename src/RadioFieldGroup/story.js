import React from 'react'
import { storiesOf } from '@storybook/react'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'
import MockReduxFormField from 'utils/testing/MockReduxFormField'
import RadioGroup from '.'
import Radio from '../Radio'

storiesOf('RadioFieldGroup', module)
  .addDecorator(Decorator)
  .add('3 radios', () => (
    <Padding>
      <MockReduxFormField>
        <RadioGroup input={{ name: 'radioField' }}>
          <Radio label="This is a label" value="radio value 1" />
          <Radio label="This is another label" value="radio value 2" />
          <Radio label="One more label" value="radio value 3" />
        </RadioGroup>
      </MockReduxFormField>
    </Padding>
  ))
  .add('3 radios w/label right', () => (
    <Padding>
      <MockReduxFormField>
        <RadioGroup input={{ name: 'radioField' }} labelPosition="right">
          <Radio label="This is a label" value="radio value 1" />
          <Radio label="This is another label" value="radio value 2" />
          <Radio label="One more label" value="radio value 3" />
        </RadioGroup>
      </MockReduxFormField>
    </Padding>
  ))
  .add('3 radios w/error', () => (
    <Padding>
      <MockReduxFormField>
        <RadioGroup
          input={{ name: 'radioField' }}
          meta={{
            touched: true,
            error:
              'This is a super long mega crazy extravagantly huge Error Message',
          }}
        >
          <Radio label="This is a label" value="radio value 1" />
          <Radio label="This is another label" value="radio value 2" />
          <Radio label="One more label" value="radio value 3" />
        </RadioGroup>
      </MockReduxFormField>
    </Padding>
  ))
  .add('3 radios w/warning', () => (
    <Padding>
      <MockReduxFormField>
        <RadioGroup
          input={{ name: 'radioField' }}
          meta={{
            touched: true,
            warning: 'This is a warning',
          }}
        >
          <Radio label="This is a label" value="radio value 1" />
          <Radio label="This is another label" value="radio value 2" />
          <Radio label="One more label" value="radio value 3" />
        </RadioGroup>
      </MockReduxFormField>
    </Padding>
  ))
  .add('3 radios disabled', () => (
    <Padding>
      <MockReduxFormField>
        <RadioGroup input={{ name: 'radioField' }} disabled>
          <Radio label="This is a label" value="radio value 1" />
          <Radio label="This is another label" value="radio value 2" />
          <Radio label="One more label" value="radio value 3" />
        </RadioGroup>
      </MockReduxFormField>
    </Padding>
  ))
  .add('3 radios w/help text', () => (
    <Padding>
      <MockReduxFormField>
        <RadioGroup
          helpText="This is some help text"
          input={{ name: 'radioField' }}
          meta={{
            touched: true,
          }}
        >
          <Radio label="This is a label" value="radio value 1" />
          <Radio label="This is another label" value="radio value 2" />
          <Radio label="One more label" value="radio value 3" />
        </RadioGroup>
      </MockReduxFormField>
    </Padding>
  ))
  .add('3 horizontal radios w/error', () => (
    <Padding>
      <MockReduxFormField>
        <RadioGroup
          horizontal
          labelPosition="right"
          input={{ name: 'radioField' }}
          meta={{
            touched: true,
            error:
              'This is a super long mega crazy extravagantly huge Error Message',
          }}
        >
          <Radio label="This is a label" value="radio value 1" width="33%" />
          <Radio
            label="This is another label"
            value="radio value 2"
            width="33%"
          />
          <Radio label="One more label" value="radio value 3" width="33%" />
        </RadioGroup>
      </MockReduxFormField>
    </Padding>
  ))
