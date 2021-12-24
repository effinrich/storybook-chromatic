import React, { PureComponent, createRef } from 'react'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import { ScrollElement as _ScrollElement, animateScroll } from 'react-scroll'
import { MdClear } from 'react-icons/md'

import Box from '../Box'
import Input from '../Input'
import PopOver from '../PopOver'
import ShadowBox from '../ShadowBox'
import Menu from '../Menu'
import SelectableMenuItem from '../SelectableMenuItem'
import ReactIconWrapper from '../ReactIconWrapper'

const ARROW_UP_KEY = 38
const ARROW_DOWN_KEY = 40

const ScrollElement = _ScrollElement((props) => {
  const { scrollRef, children, ...restProps } = props
  return (
    <div ref={scrollRef} {...omit(restProps, 'parentBindings')}>
      {children}
    </div>
  )
})

const scrollOptions = {
  containerId: 'autocomplete-scroller',
  duration: 200,
  delay: 0,
  smooth: true,
}

export default class AutoComplete extends PureComponent {
  static propTypes = {
    icon: PropTypes.func,
    onChange: PropTypes.func,
    onItemSelect: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    clearable: PropTypes.bool,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
      })
    ),
    autoFocus: PropTypes.bool,
    closeOnOutsideClick: PropTypes.bool,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    icon: null,
    onChange: /* istanbul ignore next */ () => {},
    onItemSelect: /* istanbul ignore next */ () => {},
    value: '',
    placeholder: '',
    disabled: false,
    clearable: false,
    results: [],
    autoFocus: false,
    closeOnOutsideClick: false,
  }

  constructor(props) {
    super(props)
    this.menuItemRefs = []
    this.searchInputRef = createRef()

    this.focusSearchInput = () => {
      // Focus the text input using the raw DOM API
      if (this.searchInputRef.current) this.searchInputRef.current.focus()
    }

    this.state = {
      focusIndex: -1,
      currentActiveEl: null,
    }
    this.handleActiveItem = this.handleActiveItem.bind(this)
  }

  componentDidMount() {
    const { results } = this.props
    if (results.length > 0) {
      window.addEventListener('keydown', this.handleKeydown)
    } else {
      window.removeEventListener('keydown', this.handleKeydown)
    }

    // autofocus the input on mount
    this.focusSearchInput()
  }

  componentDidUpdate(prevProps, prevState) {
    const { results } = this.props
    const prevResults = prevProps.results

    if (prevResults.length === 0 && results.length > 0) {
      window.addEventListener('keydown', this.handleKeydown)
    }
    if (prevResults.length > 0 && results.length === 0) {
      window.removeEventListener('keydown', this.handleKeydown)
      this.setState({ focusIndex: -1 })
    }

    if (prevState.focusIndex >= 0 && this.state.focusIndex < 0) {
      return this.giveInputFocus()
    }
    if (prevState.focusIndex < 0 && this.state.focusIndex >= 0) {
      return this.searchInputRef.current.blur()
    }
    if (this.state.focusIndex >= 0 && this.scrollContainer) {
      this.handleScroll()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
  }

  giveInputFocus() {
    this.searchInputRef.current.focus()
    setTimeout(
      /* istanbul ignore next */ () => {
        /* istanbul ignore next */ const end =
          this.searchInputRef.current.value.length * 2
        /* istanbul ignore next */ this.searchInputRef.current.setSelectionRange(
          end,
          end
        )
      },
      0
    )
  }

  handleKeydown = (event) => {
    const { keyCode } = event
    const nextState = {
      focusIndex: this.state.focusIndex,
    }
    if (keyCode === ARROW_DOWN_KEY) {
      nextState.focusIndex += 1
    }
    if (keyCode === ARROW_UP_KEY) {
      nextState.focusIndex -= 1
    }
    if (nextState.focusIndex >= this.props.results.length) {
      nextState.focusIndex = this.props.results.length - 1
    }
    if (nextState.focusIndex < -1) {
      nextState.focusIndex = -1
    }
    if (nextState.focusIndex === -1) {
      nextState.currentActiveEl = null
    }
    this.setState(nextState)
  }

  handleActiveItem = (_, itemEl) => {
    this.setState({ currentActiveEl: itemEl })
  }

  getScrollProperties = () => ({
    itemTop: this.state.currentActiveEl.offsetTop,
    itemHeight: this.state.currentActiveEl.offsetHeight,
    scrollHeight: this.scrollContainer.offsetHeight,
  })

  handleScroll = () => {
    const { itemTop, itemHeight, scrollHeight } = this.getScrollProperties()

    if (itemTop + itemHeight > scrollHeight) {
      const scrollPoint = itemTop - scrollHeight + itemHeight
      animateScroll.scrollTo(scrollPoint, scrollOptions)
    } else {
      animateScroll.scrollToTop(scrollOptions)
    }
  }

  handleClear = () => {
    this.searchInputRef.current.value = ''
    const event = new Event('input', { bubbles: true })
    this.searchInputRef.current.dispatchEvent(event)
  }

  renderMenuItems(results) {
    return results.map((r, i) => (
      <SelectableMenuItem
        key={i}
        fontSize={2}
        py={2}
        onItemSelect={this.props.onItemSelect}
        item={r.value}
        primaryText={r.text}
        active={i === this.state.focusIndex}
        onActive={this.handleActiveItem}
      />
    ))
  }

  render() {
    const {
      icon,
      onChange,
      value,
      disabled,
      clearable,
      placeholder,
      autoFocus,
      results,
      closeOnOutsideClick,
      onClose,
      ...restProps
    } = this.props

    return (
      <Box
        style={{ position: 'relative' }}
        {...omit(restProps, 'onItemSelect')}
      >
        {icon && (
          <ReactIconWrapper
            icon={icon}
            fontSize={4}
            p={1}
            style={{ position: 'absolute', top: '3px', left: 0 }}
          />
        )}
        {clearable && value && value !== '' && (
          <ReactIconWrapper
            icon={MdClear}
            fontSize={4}
            p={1}
            style={{ position: 'absolute', top: '3px', right: 0 }}
            className="__clearer__"
            onClick={this.handleClear}
          />
        )}
        <Input
          pl={icon ? '36px' : undefined}
          pr={clearable ? '36px' : undefined}
          inputTheme="bigbox"
          onChange={onChange}
          onClick={this.focusSearchInput}
          // scrollRef={el => (this.searchInputRef.current = el)}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          autoFocus={autoFocus}
          ref={this.searchInputRef}
          className="__searchInput__"
        />
        <PopOver
          anchorEl={this.searchInputRef.current}
          show={results.length > 0}
          closeOnOutsideClick={closeOnOutsideClick}
          onClose={onClose}
        >
          <ShadowBox
            level={1}
            width={
              this.searchInputRef.current
                ? this.searchInputRef.current.offsetWidth
                : 500
            }
            bg="white"
          >
            <ScrollElement
              id="autocomplete-scroller"
              scrollRef={(el) => (this.scrollContainer = el)}
              style={{
                position: 'relative',
                height: '200px',
                overflow: 'scroll',
              }}
            >
              <Menu scrollRef={(el) => (this.menu = el)} width="100%" py={0}>
                {this.renderMenuItems(results)}
              </Menu>
            </ScrollElement>
          </ShadowBox>
        </PopOver>
      </Box>
    )
  }
}
