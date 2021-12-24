import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Rollbar from 'utils/rollbar'
import ErrorCard from 'components/ErrorCard'

export default class ErrorBoundry extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true })
    // You can also log the error to an error reporting service
    Rollbar.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorCard onClick={this.props.logoutUser} />
    }
    return this.props.children
  }
}
