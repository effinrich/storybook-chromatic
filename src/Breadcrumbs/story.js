import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter, Route } from 'react-router-dom'
import {
  BreadcrumbsProvider,
  BreadcrumbsItem,
} from 'react-breadcrumbs-dynamic'
// import { action } from '@storybook/addon-actions'

import Decorator from 'utils/storybook'

import Breadcrumbs from '.'

storiesOf('Breadcrumbs', module)
  .addDecorator(Decorator)
  .add('naked story', () => (
    <MemoryRouter initialEntries={['/test1/test2/test3']} initialIndex={0}>
      <BreadcrumbsProvider>
        <div>
          <Breadcrumbs avatarProps={{ text: 'AD' }} />
          <Route
            path="/test1"
            render={() => (
              <div>
                <BreadcrumbsItem to="/test1">Test 1</BreadcrumbsItem>
                <Route
                  path="/test1/test2"
                  render={() => (
                    <div>
                      <BreadcrumbsItem to="/test1/test2">
                        Test 2
                      </BreadcrumbsItem>
                      <Route
                        path="/test1/test2/test3"
                        render={() => (
                          <BreadcrumbsItem to="/test1/test2/test3">
                            Test 3
                          </BreadcrumbsItem>
                        )}
                      />
                    </div>
                  )}
                />
              </div>
            )}
          />
        </div>
      </BreadcrumbsProvider>
    </MemoryRouter>
  ))
