import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'

import VerticalNav, { NavItem } from '.'

storiesOf('VerticalNav', module)
  .addDecorator(Decorator)
  .add('nested', () => (
    <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
      <Padding>
        <VerticalNav>
          <NavItem to="/dashboard" label="Home" exact>
            <NavItem label="FAQ" href="http://freebirdrides.zendesk.com" />
            <NavItem label="Support" href="http://freebirdrides.zendesk.com" />
          </NavItem>
          <NavItem to="/dashboard/locations" label="Locations">
            <NavItem label="Create" to="/dashboard/locations/create" />
            <NavItem label="Delete" to="/dashboard/locations/delete" />
          </NavItem>
          <NavItem label="Account" to="/dashboard/account" />
        </VerticalNav>
      </Padding>
    </MemoryRouter>
  ))
  .add('flat', () => (
    <MemoryRouter initialEntries={['/dashboard']} initialIndex={0}>
      <Padding>
        <VerticalNav>
          <NavItem label="Home" to="/dashboard" exact />
          <NavItem label="Locations" to="/dashboard/locations" />
          <NavItem label="Account" to="/dashboard/account" />
        </VerticalNav>
      </Padding>
    </MemoryRouter>
  ))
