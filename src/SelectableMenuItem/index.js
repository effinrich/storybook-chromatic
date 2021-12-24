import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'

import MenuItem from '../MenuItem'

const ENTER_KEYCODE = 13

export default class SelectableMenuItem extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    item: PropTypes.any.isRequired,
    onItemSelect: PropTypes.func,
    onActive: PropTypes.func,
  }

  static defaultProps = {
    active: false,
    onItemSelect: () => {},
    onActive: () => {},
  }

  componentDidMount() {
    if (this.props.active) {
      window.addEventListener('keyup', this.handleEnterPress)
      this.props.onActive(this.props.item, this.itemEl)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.active) {
      window.addEventListener('keyup', this.handleEnterPress)
      if (!prevProps.active) {
        this.props.onActive(this.props.item, this.itemEl)
      }
    } else {
      window.removeEventListener('keyup', this.handleEnterPress)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleEnterPress)
  }

  handleEnterPress = (event) => {
    if (event.keyCode === ENTER_KEYCODE) {
      this.props.onItemSelect(this.props.item)
    }
  }

  handleClick = () => {
    this.props.onItemSelect(this.props.item)
  }

  render() {
    const passProps = omit(this.props, ['onItemSelect', 'onActive'])
    return (
      <MenuItem
        onClick={this.handleClick}
        itemRef={(el) => (this.itemEl = el)}
        {...passProps}
      />
    )
  }
}
