import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import IPT from 'react-immutable-proptypes'
import { FaChevronDown } from 'react-icons/fa'
import truncate from 'truncate'

import { Location } from 'models'
import theme from 'theme'
import Flex from '../Flex'
import Box from '../Box'
import BodyCopy from '../Text/BodyCopy'
import Heading from '../Text/Heading'

import StyledLS, {
  StyledLSButton,
  StyledLSOptions,
  StyledLocationItem,
} from './style'

export default class LocationSelector extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    locations: IPT.mapOf(PropTypes.instanceOf(Location)).isRequired,
    activeLocation: PropTypes.instanceOf(Location),
    fullWidth: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.bool),
    ]),
    width: PropTypes.number,
  }

  static defaultProps = {
    fullWidth: false,
    width: 350,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this._setRef = this._setRef.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeLocation._id !== prevProps.activeLocation._id) {
      this.setState(() => ({ open: false }))
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleOutsideMouseClick)
    document.removeEventListener('touchend', this.handleOutsideMouseClick)
  }

  handleClick() {
    if (!this.state.open) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick)
      document.addEventListener('touchend', this.handleOutsideMouseClick)
    } else {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick)
      document.removeEventListener('touchend', this.handleOutsideMouseClick)
    }
    this.setState((prevState) => ({ open: !prevState.open }))
  }

  handleOutsideMouseClick(event) {
    if (this.el.contains(event.target)) {
      return
    }

    event.stopPropagation()
    this.setState(() => ({ open: false }))
    document.removeEventListener('mouseup', this.handleOutsideMouseClick)
    document.removeEventListener('touchend', this.handleOutsideMouseClick)
  }

  _setRef(el) {
    this.el = el
  }

  render() {
    const { width, fullWidth, locations, activeLocation, onChange } =
      this.props
    const { open } = this.state
    return (
      <StyledLS ref={this._setRef} width={width} fullWidth={fullWidth}>
        <StyledLSButton
          alignItems="center"
          role="button"
          onClick={this.handleClick}
          fullWidth={fullWidth}
        >
          <Box flex="1">
            <BodyCopy fontSize={1}>Select Location</BodyCopy>
            <Flex alignItems="stetch">
              <Box mr="auto">
                <Heading size={3}>{activeLocation.name}</Heading>
              </Box>
              <Box>
                <FaChevronDown color={theme.brandColor} />
              </Box>
            </Flex>
          </Box>
        </StyledLSButton>
        <StyledLSOptions open={open} fullWidth={fullWidth}>
          {locations &&
            locations
              .entrySeq()
              .map(([id, location]) => (
                <LocationItem
                  key={id}
                  active={id === activeLocation._id}
                  location={location}
                  onChange={onChange}
                />
              ))}
        </StyledLSOptions>
      </StyledLS>
    )
  }
}

export class LocationItem extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    location: PropTypes.instanceOf(Location),
    active: PropTypes.bool,
  }

  static defaultProps = {
    active: false,
  }

  handleClick = () => {
    if (!this.props.active) {
      this.props.onChange(this.props.location)
    }
  }

  render() {
    const { location, active } = this.props
    const locName = truncate(`${location.name} - ${location.address}`, 43)
    return (
      <StyledLocationItem
        onClick={this.handleClick}
        active={active}
        role="button"
      >
        <BodyCopy>{locName}</BodyCopy>
      </StyledLocationItem>
    )
  }
}
