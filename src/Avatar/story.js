import React from 'react'
import { storiesOf } from '@storybook/react'
import { FaFacebook } from 'react-icons/fa'
import Decorator from 'utils/storybook'

import Avatar from '.'

storiesOf('Avatar', module)
  .addDecorator(Decorator)
  .add('with image', () => (
    <Avatar src="https://avatars3.githubusercontent.com/u/9919?v=3&s=144" />
  ))
  .add('with text', () => <Avatar text="rt" />)
  .add('with icon', () => <Avatar icon={<FaFacebook />} />)
  .add('background color', () => <Avatar bg="#ff9900" text="rt" />)
  .add('text color', () => <Avatar color="black" text="rt" />)
  .add('size', () => (
    <Avatar
      src="https://avatars3.githubusercontent.com/u/9919?v=3&s=144"
      size="large"
    />
  ))
  .add('custom size with text', () => <Avatar text="AD" width={44} />)
  .add('custom size and fontSize with text', () => (
    <Avatar text="AD" width={44} fontSize={33} />
  ))
  .add('custom size and fontSize with icon', () => (
    <Avatar width={44} fontSize={48} icon={<FaFacebook />} />
  ))
