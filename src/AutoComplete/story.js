import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import { FaSearch } from 'react-icons/fa/'

import Decorator from 'utils/storybook'

import { Padding } from 'components/StoryDecorators'
import AutoComplete from '.'

const mockResults = [
  { text: 'This is a result', value: 'Result 1' },
  { text: 'This is another result', value: 'Result 2' },
  { text: 'This is one more result', value: 'Result 3' },
  { text: 'This is yet again, a result', value: 'Result 4' },
  { text: 'This is an additional result', value: 'Result 5' },
  { text: 'Another result', value: 'Result 6' },
  { text: 'One more result', value: 'Result 7' },
]

const ControlledAutoComplete = ({ ...restProps }) => {
  const [value, setValue] = useState('')
  const [results, setResults] = useState([])

  return (
    <AutoComplete
      onChange={(event) => {
        const { value: inputValue } = event.target
        setValue(inputValue)
        if (inputValue === '') {
          setResults([])
        } else {
          setResults(mockResults)
        }
      }}
      value={value}
      results={results}
      {...restProps}
    />
  )
}

storiesOf('AutoComplete', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <Padding>
      <ControlledAutoComplete placeholder="Type for example results..." />
    </Padding>
  ))
  .add('clearable', () => (
    <Padding>
      <ControlledAutoComplete
        placeholder="Type for example results..."
        clearable
      />
    </Padding>
  ))
  .add('w/ icon', () => (
    <Padding>
      <ControlledAutoComplete
        placeholder="Type for example results..."
        icon={FaSearch}
        clearable
      />
    </Padding>
  ))
