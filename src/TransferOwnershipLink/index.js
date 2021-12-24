import React from 'react'
import PropTypes from 'prop-types'

import CopyClipboard from '../CopyClipboard'
import BodyCopy from '../Text/BodyCopy'

import StyledTransferOwnershipLink from './style'

const propTypes = {
  link: PropTypes.string.isRequired,
}

const TransferOwnershipLink = ({ link, ...styledProps }) => {
  return (
    <StyledTransferOwnershipLink {...styledProps}>
      <BodyCopy my={2} fontSize={1}>
        Copy the link below and email it to the new user, it will help them
        create an account and take ownership of the location.
      </BodyCopy>
      <CopyClipboard link={link} />
    </StyledTransferOwnershipLink>
  )
}

TransferOwnershipLink.propTypes = propTypes

export default TransferOwnershipLink
