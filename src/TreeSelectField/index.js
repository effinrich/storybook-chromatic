import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TreeSelect } from 'antd'
import Immutable from 'immutable'
import rename from 'deep-rename-keys'
import { hasIn } from 'lodash'

import './antd.less'

import StyledTreeSelectField, {
  // StyledTreeSelectFieldPlaceholder,
  StyledTreeSelectFieldMessageContainer,
  StyledTreeSelectFieldMessage,
} from './style'

const propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  treeData: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }),
}

const defaultProps = {
  // Default Props go here
}

const HOC =
  (Wrapped) =>
    ({ treeData, ...rest }) => {
      if (treeData) {
        const tree = rename(treeData, (key) => {
          if (key === 'name') return 'title'
          if (key === '_id') return 'value'

          return key
        })

        return <Wrapped treeData={tree} {...rest} />
      }
    }

const TreeSelectField = (props) => {
  const { input, label, placeholder, meta, treeData, ...styledProps } = props
  const { onChange } = props.input
  const hasValue = !!input.value
  // const styleLogicProps = { hasValue, meta }

  const [mutatedValues, setMutatedValues] = useState(null)

  useEffect(() => {
    const isInputValList = Immutable.Iterable.isIterable(input.value)

    if (isInputValList) {
      if (hasIn(input.value && input.value.toJS()[0], 'parentId')) {
        const locCategoriesArray = []

        input.value.map((locCategory) => {
          return locCategoriesArray.push(locCategory.get('_id'))
        })

        setMutatedValues(locCategoriesArray)
      } else {
        setMutatedValues(input.value.toJS())
      }
    } else {
      setMutatedValues(input.value)
    }
  }, [input, setMutatedValues])

  return (
    <StyledTreeSelectField {...styledProps} meta={meta} hasValue={hasValue}>
      {/* <label htmlFor={input.name}>{label}</label> */}
      {/* {placeholder && (
        <StyledTreeSelectFieldPlaceholder {...styleLogicProps}>
          {placeholder}
        </StyledTreeSelectFieldPlaceholder>
      )} */}
      <div
        style={{
          position: 'relative',
        }}
        id="area"
      >
        <TreeSelect
          name={input.name}
          value={mutatedValues}
          onChange={onChange}
          treeData={treeData}
          getPopupContainer={() => document.getElementById('area')}
          {...props}
        />
      </div>

      <StyledTreeSelectFieldMessageContainer>
        {meta.touched &&
          ((meta.error && (
            <StyledTreeSelectFieldMessage error>
              {meta.error}
            </StyledTreeSelectFieldMessage>
          )) ||
            (meta.warning && (
              <StyledTreeSelectFieldMessage warning>
                {meta.warning}
              </StyledTreeSelectFieldMessage>
            )))}
      </StyledTreeSelectFieldMessageContainer>
    </StyledTreeSelectField>
  )
}

TreeSelectField.propTypes = propTypes
TreeSelectField.defaultProps = defaultProps

export default HOC(TreeSelectField)
// export default TreeSelectField
