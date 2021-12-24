import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import isArray from 'lodash/isArray'

class PlayOnHover extends PureComponent {
  static propTypes = {
    src: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    // Default Props go here
  }

  constructor(props) {
    super(props)
    this.volume = 0
    this.playing = false
  }

  handleOver = () => {
    this.player.volume = this.volume
    this.player.play()
    this.playing = true
    const fadeIn = () => {
      if (this.player) {
        if (this.playing && this.volume < 1) {
          this.volume += 0.03
          this.volume = this.volume > 1 ? 1 : this.volume

          this.player.volume = this.volume
          window.requestAnimationFrame(fadeIn)
        }
      }
    }
    fadeIn()
  }

  handleOut = () => {
    this.playing = false
    const fadeOut = () => {
      if (this.player) {
        if (!this.playing && this.volume > 0) {
          this.volume -= 0.03
          this.volume = this.volume < 0 ? 0 : this.volume
          if (this.player) {
            this.player.volume = this.volume
          }
          window.requestAnimationFrame(fadeOut)
        } else {
          this.player.pause()
        }
      }
    }
    fadeOut()
  }

  render() {
    const { children, src } = this.props
    const sources = isArray(src) ? src : [src]
    return (
      <div onMouseEnter={this.handleOver} onMouseLeave={this.handleOut}>
        <audio ref={(n) => (this.player = n)} preload="auto" loop>
          {sources.map((s, i) => (
            <source key={i} src={s} />
          ))}
        </audio>
        {children}
      </div>
    )
  }
}

export default PlayOnHover
