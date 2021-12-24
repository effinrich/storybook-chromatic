import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'
import MockReduxFormField from 'utils/testing/MockReduxFormField'
import Radio from '.'

storiesOf('Radio', module)
  .addDecorator(Decorator)
  .add('untouched w/label', () => (
    <Padding>
      <MockReduxFormField>
        <Radio
          label="This is a label"
          name="radio"
          value="radio value"
          onChange={action('onChange')}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/label right', () => (
    <Padding>
      <MockReduxFormField>
        <Radio
          label="This is a label"
          name="radio"
          value="radio value"
          onChange={action('onChange')}
          labelPosition="right"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/label', () => (
    <Padding>
      <MockReduxFormField>
        <Radio
          label="This is a label"
          name="radio"
          value="radio value"
          checked
          onChange={action('onChange')}
          meta={{ touched: true }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/label & error', () => (
    <Padding>
      <MockReduxFormField>
        <Radio
          label="This is a label"
          name="radio"
          value="radio value"
          checked
          onChange={action('onChange')}
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
        <Radio
          label="This is a label"
          name="radio"
          value="radio value"
          checked
          onChange={action('onChange')}
          meta={{ touched: true, warning: 'Warning Message' }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('disabled w/label', () => (
    <Padding>
      <MockReduxFormField>
        <Radio
          label="This is a label"
          name="radio"
          value="radio value"
          disabled
          onChange={action('onChange')}
        />
      </MockReduxFormField>
    </Padding>
  ))
