import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logoutUser } from 'store/session/duck'
import ErrorBoundry from 'components/ErrorBoundry'

const propTypes = {
  component: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  location: PropTypes.object,
}

const defaultProps = {
  logoutUser: () => {},
}

export const _PublicRoute = ({
  component: Component,
  logoutUser,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={(props) => (
      <ErrorBoundry logoutUser={logoutUser}>
        <Component {...props} />
      </ErrorBoundry>
    )}
  />
)

_PublicRoute.propTypes = propTypes
_PublicRoute.defaultProps = defaultProps

export default connect(null, { logoutUser })(_PublicRoute)
