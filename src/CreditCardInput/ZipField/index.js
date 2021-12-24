import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import Payment from 'payment'

import InputField from '../../InputField'

export default class ZipField extends PureComponent {
  static propTypes = {
    // PropTypes go here
  }

  static defaultProps = {
    // Default Props go here
  }

  componentDidMount() {
    Payment.restrictNumeric(this.inputEl)
  }

  _setRef = (el) => {
    this.inputEl = el
  }

  render() {
    return <InputField inputRef={this._setRef} {...this.props} />
  }
}
