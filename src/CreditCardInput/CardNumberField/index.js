import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import Payment from 'payment'

import InputField from '../../InputField'

export default class CardNumberField extends PureComponent {
  static propTypes = {
    // Props go here
  }

  static defaultProps = {
    // Default Props go here
  }

  componentDidMount() {
    Payment.formatCardNumber(this.inputEl)
  }

  _setRef = (el) => {
    this.inputEl = el
  }

  render() {
    return <InputField inputRef={this._setRef} {...this.props} />
  }
}
