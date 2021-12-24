import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { action } from '@storybook/addon-actions'

import { Padding } from 'components/StoryDecorators'
import Flex from '../Flex'
import Box from '../Box'
import FlatButton from '../FlatButton'
import ShadowBox from '../ShadowBox'
import Menu from '../Menu'
import MenuItem from '../MenuItem'
import PopOver from './'

export class PopOverWithButton extends PureComponent {
  static propTypes = {
    hAlign: PropTypes.oneOf(['left', 'right']),
  }

  static defaultProps = {
    hAlign: 'left',
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleButtonClick = (event) => {
    const currentTarget = event.currentTarget
    this.setState((prevState) => ({
      open: !prevState.open,
      anchorEl: currentTarget,
    }))
  }

  handleClose = () => {
    this.setState(() => ({ open: false }))
  }

  render() {
    const { hAlign } = this.props
    return (
      <Padding>
        <Flex justifyContent="center">
          <Box>
            <FlatButton primary onClick={this.handleButtonClick}>
              Open PopOver
            </FlatButton>
            <PopOver
              hAlign={hAlign}
              show={this.state.open}
              anchorEl={this.state.anchorEl}
              onClose={this.handleClose}
            >
              <ShadowBox>
                <Menu>
                  <MenuItem
                    href="http://www.google.com"
                    primaryText="Short Link"
                  />
                  <MenuItem
                    primaryText="Really Supper Duper Long Link"
                    onClick={action('clicked')}
                  />
                  <MenuItem
                    href="http://www.google.com"
                    primaryText="Medium Sized Link"
                  />
                </Menu>
              </ShadowBox>
            </PopOver>
          </Box>
        </Flex>
      </Padding>
    )
  }
}
