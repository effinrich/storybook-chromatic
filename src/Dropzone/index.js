import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { GoCloudUpload } from 'react-icons/go'
import { MdCloudUpload, MdCheckCircle, MdCancel } from 'react-icons/md'
import { useDropzone } from 'react-dropzone'
import { useMediaQuery } from 'react-responsive'

import ReactIconWrapper from 'components/ReactIconWrapper'
import FlatButton from 'components/FlatButton'
import BodyCopy from 'components/Text/BodyCopy'
import Flex from 'components/Flex'
import AspectRatioContainer from 'components/AspectRatioContainer'
import ProgressBar from 'components/ProgressBar'
import ProgressCircle from 'components/ProgressCircle'
import theme from 'theme'

import {
  StyledDropzone,
  StyledDropzoneChildWrapper,
  StyledDropzoneFlex,
} from './style'

export const DropzoneChildren = ({
  isDragActive,
  isDragAccept,
  isDragReject,
  isUploading,
  placeholderCopy,
  disabled,
  csvProcessing,
}) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 991px)' })
  return (
    <StyledDropzoneFlex
      width={1}
      h="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      isDragActive={isDragActive}
      isDragAccept={isDragAccept}
      isDragReject={isDragReject}
      disabled={disabled}
      p={2}
    >
      {csvProcessing ? (
        <Flex alignItems="center" justifyContent="center">
          <ProgressCircle scale={0.35} />
        </Flex>
      ) : (
        <Fragment>
          <Flex alignItems="center" justifyContent="center">
            <ReactIconWrapper
              icon={
                (isUploading && MdCloudUpload) ||
                (isDragActive && isDragAccept && MdCheckCircle) ||
                (isDragActive && isDragReject && MdCancel) ||
                GoCloudUpload
              }
              size={45}
              color={disabled ? theme.lightMedGrey : theme.brandColor}
            />
            <BodyCopy
              ml={1}
              color={disabled ? theme.lightMedGrey : theme.darkGrey}
            >
              {(isUploading && <span>Upload In Progress...</span>) ||
                (isDragActive && isDragAccept && (
                  <span>Drop to upload!</span>
                )) ||
                (isDragActive && isDragReject && (
                  <span>File type rejected!</span>
                )) || <span>{placeholderCopy}</span>}
            </BodyCopy>
          </Flex>
          {!isDragActive && !isUploading && !isTabletOrMobile && (
            <FlatButton
              d="block"
              width={1 / 2}
              mx="auto"
              mt={1}
              py={1}
              px={2}
              primary
              disabled={disabled}
              type="button"
            >
              Upload
            </FlatButton>
          )}
        </Fragment>
      )}
    </StyledDropzoneFlex>
  )
}

DropzoneChildren.propTypes = {
  isDragActive: PropTypes.bool,
  isDragAccept: PropTypes.bool,
  isDragReject: PropTypes.bool,
  isUploading: PropTypes.bool,
  placeholderCopy: PropTypes.string,
  disabled: PropTypes.bool,
  csvProcessing: PropTypes.bool,
}

const Dropzone = ({
  onDrop,
  isUploading,
  ratio,
  csvName,
  placeholderCopy,
  acceptType,
  multiple,
  progress,
  disabled,
  csvProcessing,
  disableRatio,
  ...styledProps
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    multiple: multiple,
    accept: acceptType,
  })

  return (
    <AspectRatioContainer
      ratio={ratio}
      disableRatio={disableRatio}
      {...styledProps}
    >
      <StyledDropzone>
        <StyledDropzoneChildWrapper {...getRootProps()}>
          <input {...getInputProps()} disabled={disabled || csvProcessing} />
          <DropzoneChildren
            isDragActive={isDragActive}
            isUploading={isUploading}
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
            placeholderCopy={placeholderCopy}
            disabled={disabled || csvProcessing}
            csvProcessing={csvProcessing}
          />
        </StyledDropzoneChildWrapper>
      </StyledDropzone>
      <ProgressBar
        show={isUploading}
        progress={progress}
        style={{
          position: 'relative',
          zIndex: 10,
          top: '-2px',
        }}
      />
      {csvName && (
        <BodyCopy fontSize={1} pt={1}>
          Last file uploaded: {csvName}
        </BodyCopy>
      )}
    </AspectRatioContainer>
  )
}

Dropzone.propTypes = {
  onDrop: PropTypes.func,
  isUploading: PropTypes.bool,
  ratio: PropTypes.string,
  disableRatio: PropTypes.bool,
  csvName: PropTypes.string,
  placeholderCopy: PropTypes.string,
  acceptType: PropTypes.string,
  multiple: PropTypes.bool,
  progress: PropTypes.number,
  disabled: PropTypes.bool,
  csvProcessing: PropTypes.bool,
}

Dropzone.defaultProps = {
  onDrop: /* istanbul ignore next */ () => {},
  isUploading: false,
  ratio: '25:16',
  placeholderCopy: 'Drag image here to upload, or click below',
  acceptType: 'image/*',
  multiple: false,
}

export default Dropzone
