import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'
import MockReduxFormField from 'utils/testing/MockReduxFormField'
import RadioField from '.'

storiesOf('RadioField', module)
  .addDecorator(Decorator)
  .add('untouched w/label', () => (
    <Padding>
      <MockReduxFormField>
        <RadioField
          label="This is a label"
          input={{ name: 'radioField' }}
          onChange={action('onChange')}
          type="radio"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/label right', () => (
    <Padding>
      <MockReduxFormField>
        <RadioField
          label="This is a label"
          input={{ name: 'radioField' }}
          onChange={action('onChange')}
          type="radio"
          labelPosition="right"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/label', () => (
    <Padding>
      <MockReduxFormField>
        <RadioField
          label="This is a label"
          input={{ name: 'radioField' }}
          onChange={action('onChange')}
          type="radio"
          meta={{ touched: true }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/label & error', () => (
    <Padding>
      <MockReduxFormField>
        <RadioField
          label="This is a label"
          input={{ name: 'radioField' }}
          onChange={action('onChange')}
          type="radio"
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
        <RadioField
          label="This is a label"
          input={{ name: 'radioField' }}
          onChange={action('onChange')}
          type="radio"
          meta={{ touched: true, warning: 'Warning Message' }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('disabled w/label', () => (
    <Padding>
      <MockReduxFormField>
        <RadioField
          label="This is a label"
          input={{ name: 'radioField' }}
          onChange={action('onChange')}
          type="radio"
          disabled
        />
      </MockReduxFormField>
    </Padding>
  ))
