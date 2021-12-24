import React from 'react'
import { storiesOf } from '@storybook/react'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'

import TimeField from '.'

storiesOf('TimeField', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <Padding>
      <TimeField
        label="Hour"
        input={{ value: '17:30', onBlur: () => {} }}
        meta={{}}
      />
    </Padding>
  ))
  .add('w/ date/time', () => (
    <Padding>
      <TimeField
        noCalendar={false}
        dateFormat="m/d/y h:i K"
        label="Date/time"
        input={{ value: '17:30', onBlur: () => {} }}
        meta={{}}
      />
    </Padding>
  ))
  .add('w/ date/no time', () => (
    <Padding>
      <TimeField
        noCalendar={false}
        dateFormat="m/d/y"
        label="Date/time"
        input={{ value: '17:30', onBlur: () => {} }}
        meta={{}}
      />
    </Padding>
  ))
  .add('w/ error', () => (
    <Padding>
      <TimeField
        label="Hour"
        input={{ value: '17:30', onBlur: () => {} }}
        meta={{
          touched: true,
          error: 'You effed up',
        }}
      />
    </Padding>
  ))
  .add('w/ warning', () => (
    <Padding>
      <TimeField
        label="Hour"
        input={{ value: '17:30', onBlur: () => {} }}
        meta={{
          touched: true,
          warning: 'just a warning',
        }}
      />
    </Padding>
  ))
