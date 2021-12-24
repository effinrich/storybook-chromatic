import React from 'react'
import { storiesOf } from '@storybook/react'

import Decorator from 'utils/storybook'
import { Padding } from 'components/StoryDecorators'
import { Stage } from 'components/StoryDecorators'

import Dropzone from '.'

let isUploading = false
const onDrop = () => {
  isUploading = true
}

storiesOf('Dropzone', module)
  .addDecorator(Decorator)
  .add('Dropzone', () => (
    <Stage width="600px">
      <Padding>
        <Dropzone isUploading={isUploading} onDrop={onDrop} />
      </Padding>
    </Stage>
  ))
  .add('Dropzone w/ratio', () => (
    <Stage width="600px">
      <Padding>
        <Dropzone isUploading={isUploading} onDrop={onDrop} ratio="40:15" />
      </Padding>
    </Stage>
  ))
  .add('Dropzone w/csvName and csv acceptType', () => (
    <Stage width="600px">
      <Padding>
        <Dropzone
          isUploading={isUploading}
          onDrop={onDrop}
          csvName="test csv copy"
          acceptType="text/csv"
        />
      </Padding>
    </Stage>
  ))
  .add('Dropzone w/placeholderCopy', () => (
    <Stage width="600px">
      <Padding>
        <Dropzone
          isUploading={isUploading}
          onDrop={onDrop}
          placeholderCopy="some placeholder text"
        />
      </Padding>
    </Stage>
  ))
  .add('Dropzone w/ProgressBar progress', () => (
    <Stage width="600px">
      <Padding>
        <Dropzone
          isUploading={isUploading}
          onDrop={onDrop}
          placeholderCopy="some placeholder text"
          progress={1}
        />
      </Padding>
    </Stage>
  ))
  .add('Dropzone w/disabled', () => (
    <Stage width="600px">
      <Padding>
        <Dropzone
          disabled
          onDrop={onDrop}
          placeholderCopy="some placeholder text"
        />
      </Padding>
    </Stage>
  ))
  .add('Dropzone w/csvProcessing', () => (
    <Stage width="600px">
      <Padding>
        <Dropzone
          csvProcessing
          onDrop={onDrop}
          placeholderCopy="some placeholder text"
        />
      </Padding>
    </Stage>
  ))
