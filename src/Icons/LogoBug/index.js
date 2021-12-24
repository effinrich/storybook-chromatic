import React from 'react'
import PropTypes from 'prop-types'

import StyledLogoBug from './style'

const propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
  reverse: PropTypes.bool,
}

const defaultProps = {
  size: 36,
  reverse: false,
}

const setFill = (props) => {
  if (props.fill) return props.fill
  if (props.reverse) return 'white'
  return 'black'
}

const LogoBug = (props) => {
  return (
    <StyledLogoBug
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox={'0 0 79 79'}
    >
      <path
        fill={setFill(props)}
        fillRule="evenodd"
        d="M8 0h63a8 8 0 0 1 8 8v63a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8zm52.43 43.731c0-5.843-4.33-10.555-9.696-10.555s-9.696 4.712-9.696 10.555c0 5.278 8.096 20.733 9.508 23.466.094.188.376.188.47 0 1.318-2.733 9.413-18.188 9.413-23.466zm-18.639-6.69c-.659-5.09.753-10.367 1.977-13.572 1.789-4.712 4.707-8.575 8.566-11.214.282-.189.094-.66-.188-.566-1.224.283-2.448.66-3.671 1.131a24.31 24.31 0 0 0-7.248 4.335 23.686 23.686 0 0 0-5.554 6.691c-1.036 1.791-1.883 3.77-2.353 5.843-.189.66-.283 1.225-.471 1.885V30.35c0-4.9.941-9.236 4.236-13.76.376-.47.094-.47-.283-.282-1.13.66-2.165 1.508-3.2 2.356h-.094c-7.813 6.785-10.166 17.435-6.59 26.482-3.294-5.09-4.612-10.744-3.576-15.927.094-.283-.283-.377-.377-.188-.659.942-1.224 1.884-1.694 2.921-.941 2.073-1.6 4.24-1.789 6.408-.282 2.828-.094 5.655.753 8.388C23.812 60.789 36.897 65.5 46.121 61.354c.095 0 .095-.094.095-.188-2.824-5.843-6.307-13.76-6.307-17.34-.094-2.64.659-4.901 1.882-6.786z"
      />
    </StyledLogoBug>
  )
}

LogoBug.propTypes = propTypes
LogoBug.defaultProps = defaultProps

export default LogoBug
