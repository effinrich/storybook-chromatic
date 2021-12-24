import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutUser } from 'store/session/duck'
import ErrorBoundry from 'components/ErrorBoundry'

const propTypes = {
  component: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  location: PropTypes.object,
  token: PropTypes.string,
}

const defaultProps = {
  logoutUser: () => {},
}

export const _PrivateRoute = ({
  component: Component,
  logoutUser,
  token,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={(props) =>
      token && token.length > 0 ? (
        <ErrorBoundry logoutUser={logoutUser}>
          <Component {...props} />
        </ErrorBoundry>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

_PrivateRoute.propTypes = propTypes
_PrivateRoute.defaultProps = defaultProps

export default connect(null, { logoutUser })(_PrivateRoute)
