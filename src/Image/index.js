import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import LogoBug from 'components/Icons/LogoBug'

import StyledImage, { StyledImageError } from './style'
import spinner from './spinner.gif'

export default class Image extends PureComponent {
  static propTypes = {
    // image src
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    // Crops image to square if true
    thumb: PropTypes.bool,
    // Sets a border around the image if true
    border: PropTypes.bool,
    borderColor: PropTypes.string,
    maxWidth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
    ]),
    // If true, a default error image isn't rendered.
    // This is used in case you want to load another image
    // on error instead of the placeholder
    altImage: PropTypes.bool,
    showSpinner: PropTypes.bool,
  }

  static defaultProps = {
    maxWidth: 100,
    thumb: false,
    border: false,
    altImage: false,
    showSpinner: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      error: false,
      loaded: false,
      isLoading: props.showSpinner,
    }
  }

  handleImageLoaded = () => {
    this.setState({
      error: false,
      loaded: true,
      isLoading: false,
    })
  }

  handleImageError = () => {
    if (!this.props.altImage) {
      this.setState({
        error: true,
        loaded: false,
        isLoading: false,
      })
    }
  }

  render() {
    const { src, alt, maxWidth, ...styledProps } = this.props
    const { error, isLoading } = this.state

    const divideBy = 2
    return (
      <StyledImage maxWidth={maxWidth} {...styledProps} error={error}>
        {error ? (
          <StyledImageError>
            <LogoBug size={maxWidth / divideBy} reverse />
          </StyledImageError>
        ) : (
          <img
            src={isLoading ? spinner : src}
            onLoad={this.handleImageLoaded}
            onError={this.handleImageError}
            alt={alt}
          />
        )}
      </StyledImage>
    )
  }
}
