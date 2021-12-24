import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
// import { action } from '@storybook/addon-actions'
import { MemoryRouter } from 'react-router-dom'

import Decorator from 'utils/storybook'

import theme from 'theme'
import { Padding } from 'components/StoryDecorators'
import ShadowBox from '../ShadowBox'
import CollapsibleNav, { CollapsibleNavItem } from '.'

storiesOf('CollapsibleNav', module)
  .addDecorator(Decorator)
  .addDecorator(withKnobs)
  .add('non-collapsible', () => (
    <MemoryRouter initialEntries={['/someplace']} initialIndex={0}>
      <Padding>
        <ShadowBox level={1} fullWidth>
          <CollapsibleNav>
            <CollapsibleNavItem to="/someplace" label="Someplace" />
            <CollapsibleNavItem to="/anotherplace" label="Anotherplace" />
          </CollapsibleNav>
        </ShadowBox>
      </Padding>
    </MemoryRouter>
  ))
  .add('collapsible', () => (
    <MemoryRouter initialEntries={['/someplace']} initialIndex={0}>
      <Padding>
        <ShadowBox level={1} fullWidth>
          <CollapsibleNav collapsible>
            <CollapsibleNavItem to="/someplace" label="Someplace" />
            <CollapsibleNavItem to="/anotherplace" label="Anotherplace" />
          </CollapsibleNav>
        </ShadowBox>
      </Padding>
    </MemoryRouter>
  ))
  .add('w/sub nav', () => (
    <MemoryRouter initialEntries={['/someplace']} initialIndex={0}>
      <Padding>
        <ShadowBox level={1} fullWidth>
          <CollapsibleNav>
            <CollapsibleNavItem to="/someplace" label="Someplace" exact>
              <CollapsibleNavItem to="/someplace2" label="Someplace2" />
              <CollapsibleNavItem to="/someplace3" label="Someplace3" />
              <CollapsibleNavItem to="/someplace4" label="Someplace4" />
            </CollapsibleNavItem>
            <CollapsibleNavItem to="/anotherplace" label="Anotherplace" />
          </CollapsibleNav>
        </ShadowBox>
      </Padding>
    </MemoryRouter>
  ))
  .add('collapsible w/sub nav', () => (
    <MemoryRouter initialEntries={['/someplace']} initialIndex={0}>
      <Padding>
        <ShadowBox level={1} fullWidth>
          <CollapsibleNav collapsible>
            <CollapsibleNavItem to="/someplace" label="Someplace" exact>
              <CollapsibleNavItem to="/someplace2" label="Someplace2" />
              <CollapsibleNavItem to="/someplace3" label="Someplace3" />
              <CollapsibleNavItem to="/someplace4" label="Someplace4" />
            </CollapsibleNavItem>
            <CollapsibleNavItem to="/anotherplace" label="Anotherplace" />
          </CollapsibleNav>
        </ShadowBox>
      </Padding>
    </MemoryRouter>
  ))
  .add('changeable (use knobs)', () => (
    <MemoryRouter initialEntries={['/someplace']} initialIndex={0}>
      <Padding>
        <ShadowBox level={1} fullWidth>
          <CollapsibleNav collapsible={boolean('Collapse', false)}>
            <CollapsibleNavItem to="/someplace" label="Someplace" />
            <CollapsibleNavItem to="/anotherplace" label="Anotherplace" />
          </CollapsibleNav>
        </ShadowBox>
      </Padding>
    </MemoryRouter>
  ))
  .add('w/hidden', () => (
    <MemoryRouter initialEntries={['/someplace']} initialIndex={0}>
      <Padding>
        <ShadowBox level={1} fullWidth>
          <CollapsibleNav collapsible>
            <CollapsibleNavItem to="/someplace" label="Someplace" />
            <CollapsibleNavItem
              to="/anotherplace"
              label="Anotherplace"
              hidden
            />
          </CollapsibleNav>
        </ShadowBox>
      </Padding>
    </MemoryRouter>
  ))
  .add('w/navBgColor, activeColor, labelColor and isNavItemsBg', () => (
    <MemoryRouter initialEntries={['/someplace']} initialIndex={0}>
      <Padding>
        <ShadowBox level={1} fullWidth>
          <CollapsibleNav
            collapsible
            navBgColor={theme.brandColor}
            activeColor="white"
            labelColor="rgba(255, 255, 255, 0.75)"
            isNavItemsBg
          >
            <CollapsibleNavItem to="/someplace" label="Someplace" />
            <CollapsibleNavItem
              to="/anotherplace"
              label="Anotherplace"
              hidden
            />
          </CollapsibleNav>
        </ShadowBox>
      </Padding>
    </MemoryRouter>
  ))
