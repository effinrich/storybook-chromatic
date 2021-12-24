import React from 'react'
import { storiesOf /*, action */ } from '@storybook/react'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'
import MockReduxFormField from 'utils/testing/MockReduxFormField'
import InputField from '.'

storiesOf('InputField', module)
  .addDecorator(Decorator)
  .add('untouched', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'field' }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/ helptext', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          helpText="This is some help text"
          input={{ name: 'field' }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/ help text & help icon', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          helpText="This is some help text"
          helpIcon
          input={{ name: 'field' }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/ adornment', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          adornmentText="$"
          input={{ name: 'field' }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/ error', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'field' }}
          meta={{
            error:
              'This is a super long mega crazy extravagantly huge Error Message',
          }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/ warning', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'field' }}
          meta={{ warning: 'Warning Message' }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/ value', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'field', value: 'Whammmy' }}
          meta={{
            touched: true,
          }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/ error', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'field' }}
          meta={{
            touched: true,
            error:
              'This is a super long mega crazy extravagantly huge Error Message',
          }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/ error + value', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'field', value: 'Whammmy' }}
          meta={{
            touched: true,
            error:
              'This is a super long mega crazy extravagantly huge Error Message',
          }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/ error + help text', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          helpText="This is some help text"
          input={{ name: 'field' }}
          meta={{
            touched: true,
            error:
              'This is a super long mega crazy extravagantly huge Error Message',
          }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/ error + help text + help icon', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          helpText="This is some help text"
          helpIcon
          input={{ name: 'field' }}
          meta={{
            touched: true,
            error:
              'This is a super long mega crazy extravagantly huge Error Message',
          }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/ warning', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'field' }}
          meta={{ touched: true, warning: 'Warning Message' }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('touched w/ warning + value', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'field', value: 'Whammmmy' }}
          meta={{ touched: true, warning: 'Warning Message' }}
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/adornmentText', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          input={{ name: 'field' }}
          adornmentText="$"
          type="text"
        />
      </MockReduxFormField>
    </Padding>
  ))
  .add('untouched w/ disabled', () => (
    <Padding>
      <MockReduxFormField>
        <InputField
          label="Label"
          placeholder="Placeholder"
          adornmentText="$"
          input={{ name: 'field' }}
          type="text"
          disabled
        />
      </MockReduxFormField>
    </Padding>
  ))
