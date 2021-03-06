import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'
import MockReduxFormField from 'utils/testing/MockReduxFormField'
import ToggleField from '.'

storiesOf('ToggleField', module)
  .addDecorator(Decorator)
  .add('untouched w/label', () => (
    <Padding>
      <MockReduxFormField>
        <ToggleField
          label="This is a label"
          input={{ name: 'toggleField' }}
          meta={{ active: true }}
          onChange={action('onChange')}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/maxWidth', () => (
    <Padding>
      <MockReduxFormField>
        <ToggleField
          label="This is a label"
          input={{ name: 'toggleField' }}
          onChange={action('onChange')}
          maxW="250px"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/label right', () => (
    <Padding>
      <MockReduxFormField>
        <ToggleField
          label="This is a label"
          input={{ name: 'toggleField' }}
          onChange={action('onChange')}
          labelPosition="right"
          type="checkbox"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/label', () => (
    <Padding>
      <MockReduxFormField>
        <ToggleField
          label="This is a label"
          input={{ name: 'toggleField', value: true }}
          onChange={action('onChange')}
          type="checkbox"
          meta={{ touched: true, active: true }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/label + help text', () => (
    <Padding>
      <MockReduxFormField>
        <ToggleField
          label="This is a label"
          helpText="This is some help text"
          input={{ name: 'toggleField', value: true }}
          onChange={action('onChange')}
          type="checkbox"
          meta={{ touched: true, active: true }}
          maxW="250px"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/label & error', () => (
    <Padding>
      <MockReduxFormField>
        <ToggleField
          label="This is a label"
          input={{ name: 'toggleField', value: true }}
          onChange={action('onChange')}
          type="checkbox"
          meta={{
            touched: true,
            error:
              'This is a super long mega crazy extravagantly huge Error Message',
          }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/label & warning', () => (
    <Padding>
      <MockReduxFormField>
        <ToggleField
          label="This is a label"
          input={{ name: 'toggleField', value: true }}
          onChange={action('onChange')}
          type="checkbox"
          meta={{ touched: true, warning: 'Warning Message' }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('disabled w/label', () => (
    <Padding>
      <MockReduxFormField>
        <ToggleField
          label="This is a label"
          input={{ name: 'toggleField' }}
          disabled
          type="checkbox"
          onChange={action('onChange')}
        />
      </MockReduxFormField>
    </Padding>
  ))
