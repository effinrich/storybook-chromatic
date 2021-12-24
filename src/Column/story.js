import React from 'react'
import { storiesOf /*, action */ } from '@storybook/react'
import { Flex } from 'reflexbox'

import FlatButton from 'components/FlatButton'
import Decorator from 'utils/storybook'

import Column from '.'

storiesOf('Column', module)
  .addDecorator(Decorator)
  .add('w/string body', () => (
    <Flex flexDirection={['column', 'row']} mb={2}>
      <Column
        width={1 / 2}
        heading="this is a title"
        body="this is a string body"
      />
    </Flex>
  ))
  .add('w/number body', () => (
    <Flex flexDirection={['column', 'row']} mb={2}>
      <Column width={1 / 2} heading="this is a title" body={100} />
    </Flex>
  ))
  .add('w/node body', () => (
    <Flex flexDirection={['column', 'row']} mb={2}>
      <Column
        width={1 / 2}
        heading="this is a title"
        body={
          <FlatButton primary onClick={() => {}}>
            I'm a button node!
          </FlatButton>
        }
      />
    </Flex>
  ))
