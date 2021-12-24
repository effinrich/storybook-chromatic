import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ClipboardJS from 'clipboard'
import { FaCopy } from 'react-icons/fa'

import theme from 'theme'

import { Flex } from 'reflexbox'
import Box from '../Box'
import BodyCopy from '../Text/BodyCopy'
import FlatButton from '../FlatButton'

import StyledCopyClipboard from './style'

export default class CopyClipboard extends PureComponent {
  static propTypes = {
    link: PropTypes.string.isRequired,
    iconOnly: PropTypes.bool,
  }

  static defaultProps = {
    p: 2,
    iconOnly: false,
  }

  componentDidMount() {
    this.clipboard = new ClipboardJS(this.clipboardTrigger, {
      text: /* istanbul ignore next */ () => this.props.link,
    })
    this.clipboard.on('success', this.handleClick)
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  handleClick = (e) => {
    const { trigger } = e
    const ogOffsetWidth = trigger.offsetWidth
    const ogWidth = trigger.style.width
    const ogText = trigger.innerHTML
    const ogBg = trigger.style.backgroundColor

    if (!this.props.iconOnly) {
      trigger.innerHTML = 'Copied!'
    }

    trigger.style.width = `${ogOffsetWidth}px`
    trigger.style.backgroundColor = theme.successColor
    setTimeout(() => {
      trigger.innerHTML = ogText
      trigger.style.backgroundColor = ogBg
      trigger.style.width = ogWidth
    }, 1000)
  }

  _setCBTriggerRef = (el) => {
    this.clipboardTrigger = el
  }

  render() {
    const { link, iconOnly } = this.props
    return (
      <StyledCopyClipboard>
        <Flex flexDirection={['column', 'column', 'row']}>
          <Box order={[2, 2, 1]}>
            <FlatButton
              triggerRef={this._setCBTriggerRef}
              primary
              fullWidth
              p={1}
              style={{ whiteSpace: 'nowrap' }}
            >
              {iconOnly ? <FaCopy size={20} /> : <span>Copy Link</span>}
            </FlatButton>
          </Box>
          <Box order={[1, 1, 2]} flex="1 1 auto">
            <Box
              bg={theme.backgroundColor}
              ml={[0, 0, 1]}
              mb={[2, 2, 0]}
              p={1}
              style={{
                overflow: 'auto',
              }}
            >
              <BodyCopy
                style={{ whiteSpace: 'nowrap', maxWidth: 0 }}
                color={theme.darkMedGrey}
              >
                {link}
              </BodyCopy>
            </Box>
          </Box>
        </Flex>
      </StyledCopyClipboard>
    )
  }
}
