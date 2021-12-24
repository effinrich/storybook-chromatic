import React from 'react'
import PropTypes from 'prop-types'

import StyledLogoText from './style'

const propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
  reverse: PropTypes.bool,
}

const defaultProps = {
  size: 150,
  reverse: false,
}

const setFill = (props) => {
  if (props.fill) return props.fill
  if (props.reverse) return 'white'
  return 'black'
}

const LogoText = (props) => {
  return (
    <StyledLogoText
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      viewBox="0 0 298 71"
    >
      <g fill={setFill(props)} fillRule="evenodd">
        <path d="M8 0h55a8 8 0 0 1 8 8v55a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8zm46.31 39.303c0-5.252-3.892-9.486-8.714-9.486-4.822 0-8.713 4.234-8.713 9.486 0 4.743 7.275 18.633 8.544 21.09.085.169.338.169.423 0 1.184-2.457 8.46-16.347 8.46-21.09zm-16.75-6.014c-.593-4.573.676-9.317 1.776-12.196 1.607-4.235 4.23-7.708 7.698-10.08.254-.169.085-.592-.169-.507-1.1.254-2.2.593-3.3 1.016a21.849 21.849 0 0 0-6.513 3.896 21.288 21.288 0 0 0-4.992 6.014c-.93 1.609-1.692 3.387-2.115 5.25-.169.594-.253 1.102-.423 1.695v-1.101c0-4.405.846-8.3 3.807-12.366.339-.424.085-.424-.253-.254-1.016.593-1.946 1.355-2.877 2.117h-.084c-7.022 6.098-9.137 15.67-5.922 23.8-2.961-4.574-4.146-9.655-3.215-14.314.085-.254-.254-.338-.338-.17-.593.848-1.1 1.695-1.523 2.627-.846 1.863-1.438 3.81-1.608 5.759-.253 2.54-.084 5.082.677 7.538 3.215 12.62 14.974 16.855 23.265 13.128.084 0 .084-.085.084-.17-2.537-5.25-5.668-12.365-5.668-15.584a10.328 10.328 0 0 1 1.692-6.098zM99.909 30v-5.917h5.97v-1.102h-5.97v-4.896h6.495v-1.12H98.67V30h1.238zm10.433-11.933v5.492h3.333c1.888 0 3-1.002 3-2.746 0-1.707-1.157-2.746-3.054-2.746h-3.279zm0 6.594V30h-1.238V16.965h4.67c2.539 0 4.165 1.49 4.165 3.812 0 1.843-1.048 3.225-2.791 3.686L118.309 30h-1.445l-2.999-5.339h-3.523zm18.464 4.219h-6.64v-5.005h6.306v-1.102h-6.305v-4.688h6.639v-1.12h-7.877V30h7.877v-1.12zm10.813 0h-6.64v-5.005h6.305v-1.102h-6.305v-4.688h6.64v-1.12h-7.877V30h7.877v-1.12zm7.723 1.12h-4.788V16.965h4.689c2.403 0 3.875 1.238 3.875 3.216 0 1.463-1.003 2.629-2.385 2.872v.118c1.834.199 3.053 1.436 3.053 3.225 0 2.267-1.617 3.604-4.444 3.604zm-3.55-11.942v4.652h2.918c2.014 0 3.161-.813 3.161-2.33 0-1.464-1.084-2.322-2.863-2.322h-3.216zm0 10.849h3.378c2.186 0 3.352-.903 3.352-2.574 0-1.654-1.238-2.548-3.505-2.548h-3.225v5.122zM155.707 30V16.965h-1.238V30h1.238zm4.58-11.933v5.492h3.333c1.888 0 2.999-1.002 2.999-2.746 0-1.707-1.156-2.746-3.053-2.746h-3.28zm0 6.594V30h-1.238V16.965h4.67c2.539 0 4.165 1.49 4.165 3.812 0 1.843-1.048 3.225-2.792 3.686L168.254 30h-1.445l-3-5.339h-3.522zm10.587-7.696h4.29c3.975 0 6.188 2.466 6.188 6.513 0 4.056-2.204 6.522-6.188 6.522h-4.29V16.965zm1.237 1.12V28.88h2.981c3.189 0 4.995-2.024 4.995-5.393 0-3.37-1.815-5.402-4.995-5.402h-2.98zm18.292-.018v5.492h3.334c1.888 0 2.999-1.002 2.999-2.746 0-1.707-1.157-2.746-3.054-2.746h-3.279zm0 6.594V30h-1.237V16.965h4.67c2.538 0 4.164 1.49 4.164 3.812 0 1.843-1.048 3.225-2.791 3.686L198.371 30h-1.446l-2.999-5.339h-3.523zM202.228 30V16.965h-1.238V30h1.238zm3.342-13.035h4.29c3.975 0 6.189 2.466 6.189 6.513 0 4.056-2.205 6.522-6.188 6.522h-4.29V16.965zm1.238 1.12V28.88h2.98c3.19 0 4.996-2.024 4.996-5.393 0-3.37-1.816-5.402-4.995-5.402h-2.981zm19.927 10.795h-6.64v-5.005h6.306v-1.102h-6.306v-4.688h6.64v-1.12h-7.877V30h7.877v-1.12zm2.303-2.267c.154 2.177 2.096 3.658 4.788 3.658 2.854 0 4.724-1.527 4.724-3.803 0-1.843-1.102-2.909-3.794-3.577l-1.291-.325c-1.988-.497-2.792-1.157-2.792-2.295 0-1.418 1.292-2.448 3.162-2.448 1.807 0 3.062.94 3.26 2.33h1.248c-.136-1.986-1.979-3.459-4.472-3.459-2.647 0-4.462 1.509-4.462 3.613 0 1.77 1.03 2.792 3.477 3.397l1.491.38c2.014.496 2.909 1.291 2.909 2.52 0 1.445-1.4 2.538-3.352 2.538-1.987 0-3.477-1.03-3.65-2.53h-1.246zM247.511 30v-5.917h5.971v-1.102h-5.97v-4.896h6.494v-1.12h-7.732V30h1.237zm14.58-13.306c3.658 0 5.89 2.62 5.89 6.784 0 4.155-2.223 6.793-5.89 6.793-3.677 0-5.908-2.629-5.908-6.793 0-4.173 2.276-6.784 5.908-6.784zm0 1.147c-2.846 0-4.643 2.186-4.643 5.637 0 3.433 1.761 5.646 4.643 5.646 2.863 0 4.625-2.213 4.625-5.646 0-3.45-1.77-5.637-4.625-5.637zm9.954.226v5.492h3.334c1.888 0 2.999-1.002 2.999-2.746 0-1.707-1.157-2.746-3.054-2.746h-3.279zm0 6.594V30h-1.237V16.965h4.67c2.538 0 4.164 1.49 4.164 3.812 0 1.843-1.048 3.225-2.79 3.686l3.16 5.537h-1.445l-2.999-5.339h-3.523zM108.8 58h-9.475V38.271h9.201c3.938 0 6.262 1.86 6.262 4.922 0 2.12-1.586 3.91-3.678 4.198v.26c2.584.136 4.58 2.146 4.58 4.661 0 3.46-2.666 5.688-6.89 5.688zm-4.457-16.188v4.499h2.652c1.832 0 2.899-.848 2.899-2.243 0-1.408-.998-2.255-2.707-2.255h-2.844zm0 12.647h3.035c2.078 0 3.213-.916 3.213-2.584 0-1.613-1.162-2.516-3.24-2.516h-3.008v5.1zm19.96-16.188h-5.017v12.92c0 4.43 3.377 7.342 8.504 7.342s8.49-2.912 8.49-7.342v-12.92h-5.017v12.387c0 2.297-1.244 3.65-3.473 3.65-2.228 0-3.486-1.353-3.486-3.65V38.271zm15.778 14.11c.082 3.8 3.227 6.152 8.217 6.152 5.168 0 8.312-2.488 8.312-6.603 0-3.131-1.75-4.895-5.646-5.647l-2.543-.492c-2.078-.41-2.953-1.039-2.953-2.12 0-1.312 1.162-2.146 2.926-2.146 1.763 0 3.09.971 3.199 2.366h4.635c-.082-3.65-3.282-6.153-7.903-6.153-4.758 0-7.847 2.53-7.847 6.385 0 3.104 1.859 5.072 5.468 5.756l2.598.52c2.256.45 3.117 1.038 3.117 2.132 0 1.3-1.285 2.201-3.158 2.201-2.078 0-3.514-.916-3.637-2.351h-4.785zM165.414 58V38.271h-5.018V58h5.018zm9.406 0V46.79h.26L183.324 58h3.979V38.271h-4.758v11.102h-.26l-8.217-11.102h-4.006V58h4.758zm30.653-4.033h-8.504v-4.033h7.998v-3.692h-7.998v-3.937h8.504V38.27H191.95V58h13.522v-4.033zm3.418-1.586c.082 3.8 3.226 6.152 8.216 6.152 5.168 0 8.313-2.488 8.313-6.603 0-3.131-1.75-4.895-5.647-5.647l-2.543-.492c-2.078-.41-2.953-1.039-2.953-2.12 0-1.312 1.162-2.146 2.926-2.146 1.764 0 3.09.971 3.2 2.366h4.634c-.082-3.65-3.281-6.153-7.902-6.153-4.758 0-7.848 2.53-7.848 6.385 0 3.104 1.86 5.072 5.469 5.756l2.598.52c2.255.45 3.117 1.038 3.117 2.132 0 1.3-1.285 2.201-3.159 2.201-2.078 0-3.513-.916-3.636-2.351h-4.785zm19.455 0c.082 3.8 3.226 6.152 8.216 6.152 5.168 0 8.313-2.488 8.313-6.603 0-3.131-1.75-4.895-5.646-5.647l-2.543-.492c-2.079-.41-2.954-1.039-2.954-2.12 0-1.312 1.163-2.146 2.926-2.146 1.764 0 3.09.971 3.2 2.366h4.634c-.082-3.65-3.281-6.153-7.902-6.153-4.758 0-7.848 2.53-7.848 6.385 0 3.104 1.86 5.072 5.469 5.756l2.598.52c2.255.45 3.117 1.038 3.117 2.132 0 1.3-1.285 2.201-3.158 2.201-2.079 0-3.514-.916-3.637-2.351h-4.785zm33.838 1.586h-8.504v-4.033h7.998v-3.692h-7.998v-3.937h8.504V38.27h-13.522V58h13.522v-4.033zm3.418-1.586c.082 3.8 3.226 6.152 8.216 6.152 5.168 0 8.313-2.488 8.313-6.603 0-3.131-1.75-4.895-5.647-5.647l-2.543-.492c-2.078-.41-2.953-1.039-2.953-2.12 0-1.312 1.162-2.146 2.926-2.146 1.764 0 3.09.971 3.2 2.366h4.634c-.082-3.65-3.281-6.153-7.902-6.153-4.758 0-7.848 2.53-7.848 6.385 0 3.104 1.86 5.072 5.469 5.756l2.597.52c2.256.45 3.118 1.038 3.118 2.132 0 1.3-1.286 2.201-3.159 2.201-2.078 0-3.513-.916-3.636-2.351h-4.785z" />
      </g>
    </StyledLogoText>
  )
}

LogoText.propTypes = propTypes
LogoText.defaultProps = defaultProps

export default LogoText