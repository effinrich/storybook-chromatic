import React from 'react'
import PropTypes from 'prop-types'
import { FaUser } from 'react-icons/fa'
import { PhoneNumberUtil } from 'google-libphonenumber'

import { Flex } from 'reflexbox'
import Avatar from '../Avatar'
import Heading from '../Text/Heading'
import BodyCopy from '../Text/BodyCopy'
import theme from 'theme'

import { User } from 'models'

import StyledAccountManagerCard from './style'

const phoneUtil = PhoneNumberUtil.getInstance()

const propTypes = {
  me: PropTypes.instanceOf(User),
}

const defaultProps = {
  bg: 'white',
  p: 2,
}

const AccountManagerCard = (props) => {
  const { me, ...styledProps } = props
  return (
    <StyledAccountManagerCard {...styledProps}>
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        {me.profile.picture && me.profile.picture[0] ? (
          <Avatar src={me.profile.picture[0]} size="medium" />
        ) : (
          <Avatar
            icon={<FaUser size={40} />}
            size="medium"
            bg={theme.brandColor}
          />
        )}
        <Heading size={4} textAlign="center" p={1}>
          {me.profile.name}
        </Heading>
        <BodyCopy textAlign="center">
          Account Manager
          <br />
          {me.mobile && phoneUtil.format(phoneUtil.parse(me.mobile, 'US'))}
          <br />
          {me.email && me.email}
        </BodyCopy>
      </Flex>
    </StyledAccountManagerCard>
  )
}

AccountManagerCard.propTypes = propTypes
AccountManagerCard.defaultProps = defaultProps

export default AccountManagerCard
