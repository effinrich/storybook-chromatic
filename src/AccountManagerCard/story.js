import React from 'react'
import { storiesOf } from '@storybook/react'

import { Padding } from 'components/StoryDecorators'
import Decorator from 'utils/storybook'

import AccountManagerCard from '.'
import ShadowBox from '../ShadowBox'

import { User } from 'models'
import meFixture from 'fixtures/fetch-me.json'

const me = new User(meFixture.data[0])

storiesOf('AccountManagerCard', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <Padding>
      <AccountManagerCard me={me} />
    </Padding>
  ))
  .add('w/ShadowBox', () => (
    <Padding>
      <ShadowBox level={1} fullWidth>
        <AccountManagerCard me={me} />
      </ShadowBox>
    </Padding>
  ))
