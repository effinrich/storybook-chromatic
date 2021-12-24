import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form/immutable'
import { Prompt } from 'react-router-dom'
import moment from 'moment-timezone'
import padStart from 'lodash/padStart'

import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import ErrorPencil from 'components/ErrorPencil'
import Heading from 'components/Text/Heading'
import ShadowBox from 'components/ShadowBox'
import InputField from 'components/InputField'
import ToggleField from 'components/ToggleField'
import TextArea from 'components/TextArea'
import TimeField from 'components/TimeField'
import Select from 'components/Select'
import SelectField from 'components/SelectField'
import { TabletDown } from 'components/Responsive'
import { required } from 'utils/validations'
import { normalizers } from 'utils/reduxForm'
import {
  daysOfWeekOptions,
  typeOptions,
  offerTargetOptions,
  userTargetOptions,
} from 'utils/ruleOptions'

const validationRules = {
  name: required('A name is required'),
  description: required('Description is required'),
  startDate: required('Start date is required'),
  endDate: required('End date is required'),
  timeStart: required('Time range start is required'),
  timeEnd: required('Time range end is required'),
  type: required('Type start is required'),
  offerTarget: required('Offer target is required'),
  userTarget: required('User target is required'),
  daysOfWeek: required('At least one day is required'),
  userSegments: required('At least one user segment is required'),
}

const promptMsg =
  'Your changes have not been saved yet. Are you sure you want to leave?'

class RuleForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func,
    submitSucceeded: PropTypes.bool,
    onSubmit: PropTypes.func,
    change: PropTypes.func,
    dirty: PropTypes.bool,
    error: PropTypes.string,
    rule: PropTypes.object,
    form: PropTypes.string,
    isEdit: PropTypes.bool,
    markets: PropTypes.object,
  }

  constructor() {
    super()

    this.state = {
      daysOfWeekValues: [],
      userSegmentsValues: [],
      offerMarkets: [],
      offerMarketValues: [],
    }
  }

  componentDidMount() {
    const { rule, isEdit, markets } = this.props

    if (isEdit) {
      // daysOfWeeks
      const daysOfWeekArr = []
      const daysOfWeeks = rule.get('daysOfWeek') ? rule.get('daysOfWeek') : []

      daysOfWeeks.map((daysOfWeek) => {
        daysOfWeekArr.push({ value: daysOfWeek, label: daysOfWeek })
        return daysOfWeekArr
      })

      // userSegments
      const userSegmentsArr = []
      const userSegments = rule.get('userSegments')
        ? rule.get('userSegments')
        : []

      userSegments.map((userSegment) => {
        userSegmentsArr.push({ value: userSegment, label: userSegment })
        return userSegmentsArr
      })

      // offerMarkets
      const offerMarketsArr = []
      const offerMarkets = rule.get('offerMarkets')
        ? rule.get('offerMarkets')
        : []

      offerMarkets.map((offerMarket) => {
        offerMarketsArr.push({ value: offerMarket, label: offerMarket })
        return offerMarketsArr
      })

      this.setState({
        daysOfWeekValues: daysOfWeekArr,
        userSegmentsValues: userSegmentsArr,
        offerMarketValues: offerMarketsArr,
      })
    }

    const offerMarketOptions = []
    markets
      .sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
        return 0
      })
      .map((market) => {
        const shortenMarket = market.name.substr(0, market.name.indexOf(','))
        offerMarketOptions.push({ value: shortenMarket, label: shortenMarket })
        return market
      })
    this.setState({ offerMarketOptions })
  }

  handleOnDaysOfWeekChange = (daysOfWeekValues) => {
    this.setState({ daysOfWeekValues })

    const daysOfWeek = []
    daysOfWeekValues &&
      daysOfWeekValues.map((tag) => {
        daysOfWeek.push(tag.value)
        return daysOfWeek
      })

    this.props.change('daysOfWeek', daysOfWeek)
  }

  handleOnOfferMarketsChange = (offerMarketValues) => {
    this.setState({ offerMarketValues })

    const offerMarkets = []
    offerMarketValues &&
      offerMarketValues.map((tag) => {
        offerMarkets.push(tag.value)
        return offerMarkets
      })
    this.props.change('offerMarkets', offerMarkets)
  }

  handleOnUserSegmentsChange = (userSegmentsValues) => {
    this.setState({ userSegmentsValues })

    const userSegments = []
    userSegmentsValues &&
      userSegmentsValues.map((tag) => {
        userSegments.push(tag.value)
        return userSegments
      })
    this.props.change('userSegments', userSegments)
  }

  handleParseTime = ([time]) => parseInt(moment(time).format('HHmm'), 10)

  handleFormatTime = (time) => {
    if (time || time === 0) {
      return moment(padStart(time, 4, 0), 'Hmm').format('HH:mm')
    }
  }

  render() {
    const {
      handleSubmit,
      submitSucceeded,
      dirty,
      error: submissionError,
    } = this.props
    const {
      daysOfWeekValues,
      userSegmentsValues,
      offerMarketValues,
      offerMarketOptions,
    } = this.state

    return (
      <TabletDown>
        {(isTablet) => (
          <form onSubmit={handleSubmit}>
            <Prompt when={dirty && !submitSucceeded} message={promptMsg} />
            <ShadowBox level={1} bg="white" p={3} mb={2} width={1} pb={4}>
              <Heading size={2} mb={2}>
                Rule Details
              </Heading>
              {submissionError && (
                <ErrorPencil my={2}>{submissionError}</ErrorPencil>
              )}
              <Field
                label="Name"
                name="name"
                component={InputField}
                placeholder="Name"
                validate={validationRules.name}
                type="text"
                width={1}
              />
              <Field
                label="Description"
                name="description"
                component={TextArea}
                validate={validationRules.description}
                placeholder="Description"
                type="text"
                width={1}
              />
              <Flex flexDirection={['column', 'row']} mt={2}>
                <Box width={[1, 1 / 2]} pr={[0, 1]}>
                  <Field
                    label="Points"
                    name="points"
                    component={InputField}
                    allowNull={false}
                    placeholder="100"
                    parse={normalizers.noDecimal}
                    type="number"
                    width={1}
                  />
                </Box>
                <Box width={[1, 1 / 2]} pl={[0, 1]}>
                  <Field
                    label="Cash back"
                    name="cashback"
                    component={InputField}
                    placeholder="i.e $10"
                    adornmentText="$"
                    parse={normalizers.currency}
                    type="number"
                    width={1}
                  />
                </Box>
              </Flex>
              <Flex flexDirection={['column', 'row']} mt={2}>
                <Box width={[1, 1 / 2]} pr={[0, 1]}>
                  <Field
                    label="Points differential"
                    name="pointsDifferential"
                    component={InputField}
                    placeholder="100"
                    parse={normalizers.noDecimal}
                    type="number"
                    width={1}
                  />
                </Box>
                <Box width={[1, 1 / 2]} pl={[0, 1]}>
                  <Field
                    label="Cashback differential"
                    name="cashbackDifferential"
                    component={InputField}
                    placeholder="100"
                    parse={normalizers.noDecimal}
                    type="number"
                    width={1}
                  />
                </Box>
              </Flex>
              <Flex flexDirection={['column', 'row']} mt={2}>
                <Box width={[1, 1 / 2]} pr={[0, 1]}>
                  <Field
                    label="Cash multiplier"
                    name="cashMultiplier"
                    component={InputField}
                    placeholder="100"
                    parse={normalizers.noDecimal}
                    type="number"
                    width={1}
                  />
                </Box>
                <Box width={[1, 1 / 2]} pl={[0, 1]}>
                  <Field
                    label="Points multiplier"
                    name="pointsMultiplier"
                    component={InputField}
                    placeholder="100"
                    parse={normalizers.noDecimal}
                    type="number"
                    width={1}
                  />
                </Box>
              </Flex>
              <Flex flexDirection={['column', 'row']} mt={2} mb={4}>
                <Box width={[1, 1 / 2]} pr={[0, 1]} mb={[4, 0]}>
                  <Field
                    name="startDate"
                    type="text"
                    component={TimeField}
                    label="Start date"
                    validate={validationRules.startDate}
                    enableTime={false}
                    noCalendar={false}
                    dateFormat="m/d/y"
                    defaultHour={0}
                    expandLabel={isTablet}
                  />
                </Box>
                <Box width={[1, 1 / 2]} pl={[0, 1]}>
                  <Field
                    name="endDate"
                    type="text"
                    component={TimeField}
                    label="End date"
                    validate={validationRules.endDate}
                    enableTime={false}
                    noCalendar={false}
                    dateFormat="m/d/y"
                    defaultHour={0}
                    expandLabel={isTablet}
                  />
                </Box>
              </Flex>
              <Flex flexDirection={['column', 'row']} mt={2} mb={2}>
                <Box width={[1, 1 / 2]} pr={[0, 1]} mb={[4, 0]}>
                  <Field
                    name="timeRangeStart"
                    type="text"
                    component={TimeField}
                    label="Time range start"
                    validate={validationRules.timeStart}
                    enableTime={true}
                    noCalendar={true}
                    dateFormat="h:i K"
                    defaultHour={0}
                    expandLabel={isTablet}
                    parse={this.handleParseTime}
                    format={this.handleFormatTime}
                  />
                </Box>
                <Box width={[1, 1 / 2]} pl={[0, 1]}>
                  <Field
                    name="timeRangeEnd"
                    type="text"
                    component={TimeField}
                    label="Time range end"
                    validate={validationRules.timeEnd}
                    enableTime={true}
                    noCalendar={true}
                    dateFormat="h:i K"
                    defaultHour={0}
                    expandLabel={isTablet}
                    parse={this.handleParseTime}
                    format={this.handleFormatTime}
                  />
                </Box>
              </Flex>
              <Flex flexDirection={['column', 'row']} mt={3}>
                <Box width={[1, 1 / 2]} pr={[0, 1]}>
                  <Field
                    label="Type"
                    name="type"
                    component={SelectField}
                    validate={validationRules.type}
                    parse={(value) => value.value}
                    options={typeOptions}
                    blurInputOnSelect
                    placeholder="Type"
                    type="text"
                    width={1}
                  />
                </Box>
                <Box width={[1, 1 / 2]} pl={[0, 1]}>
                  <Field
                    label="Offer target"
                    name="offerTarget"
                    component={SelectField}
                    validate={validationRules.offerTarget}
                    parse={(value) => value.value}
                    options={offerTargetOptions}
                    onChange={this.handleOnOfferTargetChange}
                    blurInputOnSelect
                    placeholder="Offer target"
                    type="text"
                    width={1}
                  />
                </Box>
              </Flex>

              <Select
                altLabel="Offer Markets"
                name="offerMarkets"
                isMulti
                isClearable={false}
                value={offerMarketValues}
                options={offerMarketOptions}
                onChange={this.handleOnOfferMarketsChange}
                type="text"
                placeholder="Offer Markets"
              />

              <Flex flexDirection={['column', 'row']} mt={2}>
                <Box width={[1, 1 / 2]} pr={[0, 1]}>
                  <Field
                    label="User target"
                    name="userTarget"
                    component={SelectField}
                    validate={validationRules.userTarget}
                    parse={(value) => value.value}
                    options={userTargetOptions}
                    blurInputOnSelect
                    placeholder="User target"
                    type="text"
                    width={1}
                  />
                </Box>
                <Box width={[1, 1 / 2]} pl={[0, 1]}>
                  <Select
                    altLabel="Days of week"
                    name="daysOfWeek"
                    isMulti
                    isClearable={false}
                    value={daysOfWeekValues}
                    options={daysOfWeekOptions}
                    onChange={this.handleOnDaysOfWeekChange}
                    type="text"
                    placeholder="Days of week"
                    // validate={validationRules.daysOfWeek}
                  />
                </Box>
              </Flex>
              <Flex flexDirection={['column', 'row']} mt={2} pb={2}>
                <Box width={1}>
                  <Select
                    altLabel="User segments"
                    isMulti
                    hideOptions
                    creatable
                    isClearable={false}
                    value={userSegmentsValues}
                    onChange={this.handleOnUserSegmentsChange}
                    type="text"
                    placeholder="User segments"
                  />
                </Box>
              </Flex>
              <Flex flexDirection={['column', 'row']} mt={2}>
                <Box width={[1, 1 / 2]} pr={[0, 1]}>
                  <Field
                    label="Force cash"
                    name="forceCash"
                    component={ToggleField}
                    width={1}
                    labelPosition="left"
                    type="checkbox"
                  />
                </Box>
                <Box width={[1, 1 / 2]} pl={[0, 1]}>
                  <Field
                    label="Force points"
                    name="forcePoints"
                    component={ToggleField}
                    width={1}
                    labelPosition="left"
                    type="checkbox"
                  />
                </Box>
              </Flex>
              <Flex flexDirection={['column', 'row']} mt={2}>
                <Box width={[1, 1 / 2]} pr={[0, 1]}>
                  <Field
                    label="Stackable"
                    name="stackable"
                    component={ToggleField}
                    width={1}
                    labelPosition="left"
                    type="checkbox"
                  />
                </Box>
                <Box width={[1, 1 / 2]} pl={[0, 1]}>
                  <Field
                    label="Enabled"
                    name="enabled"
                    component={ToggleField}
                    width={1}
                    labelPosition="left"
                    type="checkbox"
                  />
                </Box>
              </Flex>
            </ShadowBox>
          </form>
        )}
      </TabletDown>
    )
  }
}

export default reduxForm({ enableReinitialize: true })(RuleForm)
