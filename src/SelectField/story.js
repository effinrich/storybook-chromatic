import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'
import MockReduxFormField from 'utils/testing/MockReduxFormField'
import { usStateOptions } from 'utils/usStates'

import SelectField from '.'

storiesOf('SelectField', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <Padding>
      <MockReduxFormField>
        <SelectField
          label="This is a label"
          placeholder="Placeholder"
          input={{ name: 'checkboxField' }}
          onChange={action('onChange')}
          options={usStateOptions}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/ error', () => (
    <Padding>
      <MockReduxFormField>
        <SelectField
          label="Label"
          input={{ name: 'select' }}
          onChange={action('onChange')}
          options={usStateOptions}
          meta={{
            error:
              'This is a super long mega crazy extravagantly huge Error Message',
          }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/ warning', () => (
    <Padding>
      <MockReduxFormField>
        <SelectField
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'select' }}
          onChange={action('onChange')}
          options={usStateOptions}
          meta={{ warning: 'Warning Message' }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/ error', () => (
    <Padding>
      <MockReduxFormField>
        <SelectField
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'select', value: 'CA' }}
          onChange={action('onChange')}
          options={usStateOptions}
          meta={{
            touched: true,
            error:
              'This is a super long mega crazy extravagantly huge Error Message',
          }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/ warning', () => (
    <Padding>
      <MockReduxFormField>
        <SelectField
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'select', value: 'CA' }}
          onChange={action('onChange')}
          options={usStateOptions}
          meta={{ touched: true, warning: 'Warning Message' }}
        />
      </MockReduxFormField>
    </Padding>
  ))
