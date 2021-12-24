import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import theme from 'theme'
import Flex from 'components/Flex'
import ShadowBox from 'components/ShadowBox'
import Heading from 'components/Text/Heading'
import BodyCopy from 'components/Text/BodyCopy'
import FlatButton from 'components/FlatButton'

const propTypes = {
  onClick: PropTypes.func,
  customMessage: PropTypes.string,
}

const defaultProps = {
  onClick: () => {},
}

const ErrorCard = ({ onClick, customMessage }) => {
  return (
    <Flex justifyContent="center" py={4}>
      <ShadowBox level={1} p={3} bg="white" width="50%">
        <Heading textAlign="center" size={2} color={theme.errorColor}>
          Oops... Something went wrong!
        </Heading>
        <Heading size={3} mb={3} pt={2} textAlign="center">
          Our team has been alerted about this, and will work on a fix.
        </Heading>
        {customMessage ? (
          <BodyCopy mb={3} mt={3} textAlign="center" lineHeight="1.25em">
            {customMessage}
          </BodyCopy>
        ) : (
          <Fragment>
            <BodyCopy mb={3} mt={3} textAlign="center" lineHeight="1.25em">
              First try refreshing the page. If the error persists, click the
              button below to logout, then log back in. If you're still getting
              an error, please contact support at{' '}
              <a
                href="mailto:support@freebirdrides.com?subject=Issues with Freebird Portal"
                rel="noopener noreferrer"
                target="_blank"
              >
                support@freebirdrides.com
              </a>{' '}
              or try the green 'Help' button on the bottom of this page.
            </BodyCopy>
            <FlatButton primaryInvert fullWidth onClick={onClick}>
              Click Here to Logout and Try Again
            </FlatButton>
          </Fragment>
        )}
      </ShadowBox>
    </Flex>
  )
}

ErrorCard.propTypes = propTypes
ErrorCard.defaultProps = defaultProps

export default ErrorCard
