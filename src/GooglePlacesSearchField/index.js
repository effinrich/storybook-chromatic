import React, { PureComponent } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import PropTypes from 'prop-types'

import ShadowBox from '../ShadowBox'
import Menu from '../Menu'
import SelectableMenuItem from '../SelectableMenuItem'
import BaseInputField, { BaseInputFieldProps } from '../BaseInputField'

import { StyledInputFieldInput } from '../BaseInputField/style'

import StyledGooglePlacesSearchField, { StyledAutoCompleteRoot } from './style'

export default class GooglePlacesSearchField extends PureComponent {
  static propTypes = {
    ...BaseInputFieldProps,
    children: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    input: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      active: PropTypes.bool,
      error: PropTypes.string,
      warning: PropTypes.string,
    }),
  }

  static defaultProps = {
    // Default Props go here
  }

  constructor(props) {
    super(props)

    this.state = {
      error: null,
    }
  }

  onError = (status, clearSuggestions) => {
    this.setState({
      error: 'Zero results. Try entering the address.',
    })
    clearSuggestions()
  }

  handleOnChange = (event) => {
    this.setState({ error: null })
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  render() {
    const {
      placeholder,
      input,
      meta,
      type,
      label,
      helpText,
      helpIcon,
      location,
      disabled,
      ...styledProps
    } = this.props

    const hasValue = input && !!input.value

    const options = {
      location: location,
      radius: 10000,
      types: ['establishment'],
    }

    return (
      <StyledGooglePlacesSearchField {...styledProps}>
        <PlacesAutocomplete
          onChange={this.handleOnChange}
          value={input.value}
          onError={this.onError}
          searchOptions={location && options}
          {...this.props}
        >
          {({ getInputProps, getSuggestionItemProps, suggestions }) => {
            return (
              <StyledAutoCompleteRoot>
                <BaseInputField
                  {...getInputProps()}
                  name={input.name}
                  label={label}
                  meta={meta}
                  hasValue={hasValue}
                  width={1}
                  helpText={this.state.error ? this.state.error : helpText}
                  helpIcon={helpIcon}
                  disabled={disabled}
                >
                  <StyledInputFieldInput
                    placeholder={placeholder}
                    type={type}
                    meta={meta}
                    hasValue={hasValue}
                    fontSize={18}
                    autoComplete="nope"
                    disabled={disabled}
                    ref={(el) => (this.input = el)}
                    {...input}
                  />
                </BaseInputField>
                {suggestions.length > 0 ? (
                  <ShadowBox level={1} bg="white">
                    <Menu>
                      {suggestions.map((suggestion, index) => (
                        <SelectableMenuItem
                          {...getSuggestionItemProps(suggestion)}
                          key={index}
                          item={suggestion}
                          primaryText={suggestion.description}
                        />
                      ))}
                    </Menu>
                  </ShadowBox>
                ) : null}
              </StyledAutoCompleteRoot>
            )
          }}
        </PlacesAutocomplete>
      </StyledGooglePlacesSearchField>
    )
  }
}
