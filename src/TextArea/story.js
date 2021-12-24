import React from 'react'
import { storiesOf } from '@storybook/react'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'
import MockReduxFormField from 'utils/testing/MockReduxFormField'

import TextArea from '.'

storiesOf('TextArea', module)
  .addDecorator(Decorator)
  .add('untouched', () => (
    <Padding>
      <MockReduxFormField>
        <TextArea
          label="Label"
          placeholder="Placeholder"
          input={{
            name: 'description',
            value:
              'Applebee\'s International, Inc., is an American company which develops, franchises, and operates the Applebee\'s Neighborhood Grill + Bar restaurant chain.',
          }}
          type="text"
          meta={{}}
          maxLength="200"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/ error', () => (
    <Padding>
      <MockReduxFormField>
        <TextArea
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'description' }}
          type="text"
          meta={{
            error:
              'This is a super long mega crazy extravagantly huge Error Message',
          }}
          maxLength="25"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/ warning', () => (
    <Padding>
      <MockReduxFormField>
        <TextArea
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'description' }}
          type="text"
          meta={{ warning: 'Warning Message' }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/ error', () => (
    <Padding>
      <MockReduxFormField>
        <TextArea
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'description', value: 'Here\'s some text' }}
          type="text"
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
        <TextArea
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'description', value: 'Here\'s some text' }}
          type="text"
          meta={{ touched: true, active: true, warning: 'Warning Message' }}
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/ holdMessageSpace', () => (
    <Padding>
      <MockReduxFormField>
        <TextArea
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'description', value: 'Here\'s some text' }}
          type="text"
          meta={{}}
          holdMessageSpace
        />
      </MockReduxFormField>
    </Padding>
  ))
