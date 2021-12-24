import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import StyledCheckbox, {
  StyledCheckboxSwitch,
  StyledCheckboxBox,
  StyledCheckboxInput,
} from './style'

export default class Checkbox extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    checked: PropTypes.oneOf(['', true, false]),
    onChange: PropTypes.func,
    error: PropTypes.bool,
    warning: PropTypes.bool,
  }

  static defaultProps = {
    checked: false,
    disabled: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      checked: props.checked === '' ? false : props.checked,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.checked !== prevProps.checked) {
      this.setState({ checked: this.props.checked })
    }
  }

  handleOnChange = (event) => {
    const nextChecked = !this.state.checked
    this.setState({ checked: nextChecked })

    if (this.props.onChange) {
      this.props.onChange(event, nextChecked)
    }

    event.stopPropagation()
  }

  render() {
    const { name, disabled, error, warning, ...styledProps } = this.props
    const { checked } = this.state
    const styledLogicProps = {
      disabled,
      checked,
      error,
      warning,
    }

    return (
      <StyledCheckbox {...styledLogicProps} {...styledProps}>
        <StyledCheckboxSwitch {...styledLogicProps}>
          <StyledCheckboxInput
            name={name}
            type="checkbox"
            onChange={this.handleOnChange}
            {...styledLogicProps}
          />
          <StyledCheckboxBox {...styledLogicProps} />
        </StyledCheckboxSwitch>
      </StyledCheckbox>
    )
  }
}
