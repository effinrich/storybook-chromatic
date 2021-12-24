import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { Field } from 'redux-form/immutable'

import { Location } from 'models'
import ShadowBox from 'components/ShadowBox'
import Heading from 'components/Text/Heading'
import ErrorPencil from 'components/ErrorPencil'
import TreeSelectField from 'components/TreeSelectField'
import { required, minLength, maxLength } from 'utils/validations'
import { fetchCategories, selectCategories } from 'store/categories/duck'

const validationRules = {
  categories: [required('Categories are required'), minLength(1), maxLength(2)],
}

const CategoriesField = ({ location, change, error: submissionError }) => {
  const dispatch = useDispatch()

  const categories = useSelector((state) => selectCategories(state))

  useEffect(() => {
    const handleFetchCategories = async () => {
      await dispatch(fetchCategories())
    }
    handleFetchCategories()
  }, [dispatch, location, change])

  if (!categories) return null

  return (
    <ShadowBox level={1} bg="white" p={3} mb={2} width={1}>
      <Heading size={2} pb={2}>
        Categories
      </Heading>
      {submissionError && <ErrorPencil mb={2}>{submissionError}</ErrorPencil>}
      <div
        style={{
          position: 'relative',
        }}
        id="area"
      >
        <Field
          label="Categories"
          component={TreeSelectField}
          treeData={categories.toJS()}
          name="categories"
          treeCheckable
          placeholder="Choose at up to 2 categories..."
          maxTagCount={2}
          showCheckedStrategy={'SHOW_PARENT'}
          allowClear
          style={{
            width: '100%',
          }}
          treeNodeFilterProp="title"
          validate={validationRules.categories}
          width={1}
        />
      </div>
    </ShadowBox>
  )
}

CategoriesField.propTypes = {
  location: PropTypes.instanceOf(Location),
  error: PropTypes.string,
  change: PropTypes.func,
}

export default CategoriesField
