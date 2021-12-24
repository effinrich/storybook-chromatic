import React from 'react'
import { Breadcrumbs as RDBreadcrumbs } from 'react-breadcrumbs-dynamic'
import PropTypes from 'prop-types'

import Box from '../Box'
import Avatar from '../Avatar'
import Heading from '../Text/Heading'

import StyledBreadcrumbs, {
  StyledBreadcrumbSeperator,
  StyledBreadcrumbFinal,
  StyledBreadcrumbItem,
} from './style'

const BreadcrumbSeperator = () => (
  <StyledBreadcrumbSeperator> / </StyledBreadcrumbSeperator>
)

const propTypes = {
  avatarProps: PropTypes.object,
}

const defaultProps = {
  // Default Props go here
}

const Breadcrumbs = ({ avatarProps, ...styleProps }) => {
  return (
    <StyledBreadcrumbs alignItems="center" {...styleProps}>
      <Box pr={1}>
        <Avatar width={47} fontSize={25} {...avatarProps} />
      </Box>
      <Box>
        <Heading size={2} fontSize={[3, 3, 4]} light>
          <RDBreadcrumbs
            separator={<BreadcrumbSeperator />}
            item={StyledBreadcrumbItem}
            finalItem={StyledBreadcrumbFinal}
          />
        </Heading>
      </Box>
    </StyledBreadcrumbs>
  )
}

Breadcrumbs.propTypes = propTypes
Breadcrumbs.defaultProps = defaultProps

export default Breadcrumbs
