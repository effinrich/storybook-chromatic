import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form/immutable'
import { Prompt } from 'react-router-dom'
import moment from 'moment'

import theme from 'theme'
import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import ErrorPencil from 'components/ErrorPencil'
import Heading from 'components/Text/Heading'
import ShadowBox from 'components/ShadowBox'
import InputField from 'components/InputField'
import TextArea from 'components/TextArea'
import SingleDatePickerField from 'components/SingleDatePickerField'
import RadioFieldGroup from 'components/RadioFieldGroup'
import Radio from 'components/Radio'
import CheckboxField from 'components/CheckboxField'
import ToggleField from 'components/ToggleField'
import { required } from 'utils/validations'
import { normalizers } from 'utils/reduxForm'

import {
  attire,
  priceLevels,
  ratings,
  cuisines,
  categoryLabels,
} from './fieldData'

const validationRules = {
  name: [required('A name is required')],
  offerMaxDistance: [required('Max distance is required')],
  description: [required('Description is required')],
}

const promptMsg =
  'Your changes have not been saved yet. Are you sure you want to leave?'

class MetadataCarousel extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitSucceeded: PropTypes.bool,
    change: PropTypes.func,
    dirty: PropTypes.bool,
    error: PropTypes.string,
    initialValues: PropTypes.object,
    isEdit: PropTypes.bool,
  }

  componentDidMount() {
    if (!this.props.isEdit) {
      this.props.change('partnerSignupDateStart', moment())
    }
  }

  render() {
    const {
      handleSubmit,
      submitSucceeded,
      dirty,
      error: submissionError,
    } = this.props

    const secondColumnStart = Math.floor(categoryLabels.length / 2)

    return (
      <form onSubmit={handleSubmit}>
        <Prompt when={dirty && !submitSucceeded} message={promptMsg} />
        <ShadowBox level={1} bg="white" p={3} mb={2} width={1}>
          <Heading size={2} mb={2}>
            Carousel Details
          </Heading>
          {submissionError && (
            <ErrorPencil my={2}>{submissionError}</ErrorPencil>
          )}
          <Flex flexDirection={['column', 'row']} mb={[0, 2]}>
            <Box width={[1, 1 / 4]}>
              <Heading size={4} regular color={theme.medGrey}>
                General Features
              </Heading>
              <Field
                label="Outdoor seating"
                name="seatingOutdoor"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Good for groups"
                name="groupsGoodFor"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Good for kids"
                name="kidsGoodFor"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Kids menu"
                name="kidsMenu"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Cash only"
                name="paymentCashOnly"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Reservations"
                name="reservations"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Open 24 hrs"
                name="open24hrs"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Wifi"
                name="wifi"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
            </Box>
            <Box width={[1, 1 / 4]}>
              <Heading size={4} regular color={theme.medGrey}>
                Meals Served
              </Heading>
              <Field
                label="Breakfast"
                name="mealBreakfast"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Lunch"
                name="mealLunch"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Dinner"
                name="mealDinner"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Deliver"
                name="mealDeliver"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Takeout"
                name="mealTakeout"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
            </Box>
            <Box width={[1, 1 / 4]}>
              <Heading size={4} regular color={theme.medGrey}>
                Attire
              </Heading>
              {attire.map((attire, index) => (
                <Field
                  key={index}
                  label={`${attire.name}`}
                  value={attire.name}
                  name={`attire.${attire.value}`}
                  component={CheckboxField}
                  labelPosition="right"
                  my={2}
                  width={1}
                />
              ))}
            </Box>
            <Box width={[1, 1 / 4]}>
              <Heading size={4} regular color={theme.medGrey}>
                Alcohol
              </Heading>
              <Field
                label="Full Bar"
                name="alcoholBar"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Beer and Wine"
                name="alcoholBeerWine"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="BYOB"
                name="alcoholByob"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
            </Box>
          </Flex>
          <Flex flexDirection={['column', 'row']} mb={[0, 2]}>
            <Box width={[1, 1 / 4]}>
              <Heading size={4} regular color={theme.medGrey}>
                Parking
              </Heading>
              <Field
                label="Valet"
                name="parkingValet"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Garage"
                name="parkingGarage"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Street"
                name="parkingStreet"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Lot"
                name="parkingLot"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Validated"
                name="parkingValidated"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Free"
                name="parkingFree"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
            </Box>
            <Box width={[1, 1 / 4]}>
              <Heading size={4} regular color={theme.medGrey}>
                Options
              </Heading>
              <Field
                label="Vegetarian"
                name="optionsVegetarian"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Vegan"
                name="optionsVegan"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Gluten free"
                name="optionsGlutenFree"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Low fat"
                name="optionsLowFat"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Organic"
                name="optionsOrganic"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
              <Field
                label="Healthy"
                name="optionsHealthy"
                component={CheckboxField}
                labelPosition="right"
                my={2}
                width={1}
              />
            </Box>
            <Box width={[1, 1 / 4]}>
              <Heading size={4} regular color={theme.medGrey}>
                Rating
              </Heading>
              {ratings.map((rating, index) => (
                <Field
                  key={index}
                  label={rating.name}
                  value={rating.name}
                  name={`rating.${rating.value}`}
                  component={CheckboxField}
                  labelPosition="right"
                  my={2}
                  width={1}
                />
              ))}
            </Box>
            <Box width={[1, 1 / 4]}>
              <Heading size={4} regular color={theme.medGrey}>
                Price
              </Heading>
              {priceLevels.map((price, index) => (
                <Field
                  key={index}
                  label={price.name}
                  value={price.name}
                  name={`price.${price.value}`}
                  component={CheckboxField}
                  labelPosition="right"
                  my={2}
                  width={1}
                />
              ))}
            </Box>
          </Flex>
          <Flex flexDirection={['column', 'row']}>
            <Box width={[1, 1 / 4]}>
              <Heading size={4} regular color={theme.medGrey}>
                Cuisine
              </Heading>
              {cuisines.map((cuisine, index) => (
                <Field
                  key={index}
                  label={cuisine.name}
                  value={cuisine.name}
                  name={`cuisine.${cuisine.value}`}
                  component={CheckboxField}
                  labelPosition="right"
                  my={2}
                  width={1}
                />
              ))}
            </Box>
            <Box width={[1, 1 / 4]}>
              <Heading size={4} regular color={theme.medGrey}>
                Venue types
              </Heading>
              {categoryLabels
                .slice(0, secondColumnStart)
                .map((categoryLabel, index) => (
                  <Field
                    key={index}
                    label={categoryLabel.name}
                    value={categoryLabel.name}
                    name={`categoryLabels.${categoryLabel.value}`}
                    component={CheckboxField}
                    labelPosition="right"
                    my={2}
                    width={1}
                  />
                ))}
            </Box>
            <Box width={[1, 1 / 4]}>
              <Heading size={4} regular color={'transparent'}>
                Venue types
              </Heading>
              {categoryLabels
                .slice(secondColumnStart)
                .map((categoryLabel, index) => (
                  <Field
                    key={index}
                    label={categoryLabel.name}
                    value={categoryLabel.name}
                    name={`categoryLabels.${categoryLabel.value}`}
                    component={CheckboxField}
                    labelPosition="right"
                    my={2}
                    width={1}
                  />
                ))}
            </Box>
          </Flex>
          <Field
            label="Carousel name"
            name="name"
            component={InputField}
            placeholder="Carousel name"
            validate={validationRules.name}
            type="text"
            width={1}
          />
          <Field
            label="Carousel description"
            name="description"
            component={TextArea}
            validate={validationRules.description}
            placeholder="Carousel description"
            type="text"
            // maxLength="140"
            width={1}
          />
          <Flex flexDirection={['column', 'row']} mt={2}>
            <Box width={[1, 1 / 3]} pr={[0, 1]}>
              <Field
                label="Min ranking"
                name="minRanking"
                component={InputField}
                placeholder="Min ranking"
                type="number"
                width={1}
              />
            </Box>
            <Box width={[1, 1 / 3]} px={[0, 1]}>
              <Field
                label="Max ranking"
                name="maxRanking"
                component={InputField}
                placeholder="Max ranking"
                type="number"
                width={1}
              />
            </Box>
            <Box width={[1, 1 / 3]} pl={[0, 1]} mt={[0, 3]}>
              <Field
                label="Hide closed"
                name="hideClosed"
                component={ToggleField}
                width={1}
                labelPosition="left"
              />
            </Box>
          </Flex>
          <Flex flexDirection={['column', 'row']} mt={2}>
            <Box width={[1, 1 / 2]} pr={[0, 1]}>
              <Field
                label="Partner signup date"
                name="partnerSignupDateStart"
                component={SingleDatePickerField}
                normalize={(value) => value.value.format()}
                isOutsideRange={() => false}
                block={true}
              />
            </Box>
            <Box width={[1, 1 / 2]} pl={[0, 1]} mt={1}>
              <Field
                label="Max distance in miles"
                name="offerMaxDistance"
                component={InputField}
                placeholder="Max distance in miles"
                validate={validationRules.offerMaxDistance}
                normalize={normalizers.onlyDecimal}
                type="text"
                width={1}
              />
            </Box>
          </Flex>
          <Heading size={3}>Sorting options</Heading>
          <Flex flexDirection={['column', 'row']} mt={2}>
            <Box width={[1, 1 / 3]} pr={[0, 1]}>
              <Field
                mb={[2, 0]}
                name="sortBy"
                component={(props) => (
                  <RadioFieldGroup labelPosition="right" {...props}>
                    <Radio label="Distance" value="distance" />
                    <Radio label="Date of offer update" value="updatedDate" />
                  </RadioFieldGroup>
                )}
              />
            </Box>
            <Box width={[1, 1 / 3]} pl={[0, 1]}>
              <Field
                label="Points"
                name="points"
                component={CheckboxField}
                labelPosition="right"
                width={1}
              />
              <Field
                label="Cash"
                name="cashOnly"
                component={CheckboxField}
                labelPosition="right"
                width={1}
              />
            </Box>
          </Flex>
        </ShadowBox>
      </form>
    )
  }
}

export default reduxForm({
  form: 'metadataCarouselForm',
})(MetadataCarousel)
