import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import { Padding } from 'components/StoryDecorators'
import ShadowBox from '../ShadowBox'
import MenuItem from '../MenuItem'
import Menu from '.'

storiesOf('Menu', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <Padding>
      <ShadowBox>
        <Menu>
          <MenuItem href="http://www.google.com" primaryText="Short Link" />
          <MenuItem
            primaryText="Really Supper Duper Long Link"
            onClick={action('clicked')}
          />
          <MenuItem
            href="http://www.google.com"
            primaryText="Medium Sized Link"
          />
        </Menu>
      </ShadowBox>
    </Padding>
  ))
