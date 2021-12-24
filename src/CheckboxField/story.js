import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'
import MockReduxFormField from 'utils/testing/MockReduxFormField'
import CheckboxField from '.'

storiesOf('CheckboxField', module)
  .addDecorator(Decorator)
  .add('untouched w/label', () => (
    <Padding>
      <MockReduxFormField>
        <CheckboxField
          label="This is a label"
          input={{ name: 'checkboxField' }}
          onChange={action('onChange')}
          type="checkbox"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/maxWidth', () => (
    <Padding>
      <MockReduxFormField>
        <CheckboxField
          label="This is a label"
          input={{ name: 'checkboxField' }}
          onChange={action('onChange')}
          maxWidth={250}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/label right', () => (
    <Padding>
      <MockReduxFormField>
        <CheckboxField
          label="This is a label"
          input={{ name: 'checkboxField' }}
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
        <CheckboxField
          label="This is a label"
          input={{ name: 'checkboxField', checked: true }}
          onChange={action('onChange')}
          type="checkbox"
          meta={{ touched: true }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/label & error', () => (
    <Padding>
      <MockReduxFormField>
        <CheckboxField
          label="This is a label"
          input={{ name: 'checkboxField', checked: true }}
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
        <CheckboxField
          label="This is a label"
          input={{ name: 'checkboxField', checked: true }}
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
        <CheckboxField
          label="This is a label"
          input={{ name: 'checkboxField' }}
          disabled
          onChange={action('onChange')}
          type="checkbox"
        />
      </MockReduxFormField>
    </Padding>
  ))
