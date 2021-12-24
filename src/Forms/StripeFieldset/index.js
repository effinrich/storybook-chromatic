import * as React from 'react'
import * as PropTypes from 'prop-types'
import { fromJS } from 'immutable'
import { Field } from 'redux-form/immutable'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import styled from 'styled-components'
import { space } from 'styled-system'
import { FaUniversity } from 'react-icons/fa'

import Config from 'config'
import Plaid from 'utils/plaid'
import theme from 'theme'
import Flex from 'components/Flex'
import { Box } from 'reflexbox'
import Heading from 'components/Text/Heading'
import InputField from 'components/InputField'
import CheckboxField from 'components/CheckboxField'
import FlatButton from 'components/FlatButton'
import { required, name, zip } from 'utils/validations'
import StripeElementField, {
  stripeFieldValidator,
} from 'components/StripeElementField'

const StyledTabs = styled(Box)`
  ${space};
  .react-tabs__tab-list {
    display: flex;
    border-bottom: 1px solid ${theme.brandColor};
    margin: 0 0 25px;
    padding: 0;
  }

  .react-tabs__tab {
    display: flex !important;
    flex: 1;
    align-items: center;
    justify-content: center;
    /* display: inline-block; */
    border: 1px solid transparent;
    border-bottom: none;
    bottom: -1px;
    position: relative;
    list-style: none;
    padding: 8px 4px;
    cursor: pointer;
  }

  .react-tabs__tab--selected {
    background: #fff;
    border-color: ${theme.brandColor};
    /* color: black; */
    border-radius: 5px 5px 0 0;
  }
  .react-tabs__tab:focus {
    box-shadow: 0 0 5px ${theme.primaryButtonOverBg};
    border-color: ${theme.primaryButtonOverBg};
    outline: none;
  }
`
const validationRules = {
  cardholderName: [required('Cardholder name is required'), name()],
  zip: [required('Cardholder zip is required'), zip()],
  terms: [required('Accepting terms is required')],
}

const terms = (
  <div>
    <span>Check here to indicate you have read and agree to the Freebird </span>
    <a
      href="https://www.freebirdrides.com/terms/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Terms of Service
    </a>
    <span> and </span>
    <a
      href="https://www.freebirdrides.com/privacy/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Privacy Policy
    </a>
    .
  </div>
)

const methodMap = ['cc', 'ach']

const StripeFieldset = ({
  form,
  method,
  plaidMeta,
  change,
  clearSubmitErrors,
}) => {
  const launchPlaid = () => {
    const plaidLink = Plaid.create({
      env: Config.get('/Plaid/env'),
      clientName: 'Portal',
      key: Config.get('/Plaid/publicKey'),
      product: ['auth'],
      selectAccount: true,
      onSuccess: function (public_token, metadata) {
        clearSubmitErrors(form)
        change('_plaid', fromJS(metadata))
      },
      onExit: function (err, metadata) {
        if (err != null) {
          // eslint-disable-next-line no-console
          console.log('err', err)
        }
      },
    })
    plaidLink.open()
  }

  return (
    <StyledTabs mt={3}>
      <Tabs
        selectedIndex={methodMap.indexOf(method)}
        onSelect={(index) => change('_method', methodMap[index])}
      >
        <TabList>
          <Tab>Credit Card</Tab>
          <Tab>ACH (Bank Account)</Tab>
        </TabList>
        <TabPanel>
          <Field
            label="Name (as it appears on card)"
            name="cardholderName"
            component={InputField}
            validate={validationRules.cardholderName}
            placeholder="Cardholder Name"
            type="text"
            width={1}
            expandLabel
          />
          <Field
            label="Credit Card Number"
            name="_creditcard"
            component={StripeElementField}
            validate={stripeFieldValidator}
            type="cc"
            width={1}
          />
          <Field
            label="Expiration Date"
            name="_expiration"
            component={StripeElementField}
            validate={stripeFieldValidator}
            type="exp"
            width={1}
          />
          <Field
            label="CVC"
            name="_cvc"
            component={StripeElementField}
            validate={stripeFieldValidator}
            type="cvc"
            width={1}
          />
          <Field
            label="Postal Code"
            name="postalCode"
            component={InputField}
            validate={validationRules.zip}
            placeholder="90210"
            type="zip"
            width={1}
            expandLabel
          />
          <Field
            mt={2}
            name="terms"
            component={CheckboxField}
            validate={validationRules.terms}
            label={terms}
            type="checkbox"
            labelPosition="right"
            maxWidth={800}
            parse={(value) => (value === true ? value : undefined)}
          />
        </TabPanel>
        <TabPanel>
          {plaidMeta && (
            <Flex alignItems="center">
              <Flex
                width="100px"
                h="100px"
                justifyContent="center"
                alignItems="center"
              >
                <FaUniversity size={30} />w
              </Flex>
              <Box>
                <Heading size={2}>
                  {plaidMeta.getIn(['institution', 'name'])}
                </Heading>
                <Heading grey size={3}>
                  {plaidMeta.getIn(['account', 'name'])}
                </Heading>
              </Box>
            </Flex>
          )}
          <FlatButton
            fullWidth
            primaryInvert
            type="button"
            onClick={launchPlaid}
          >
            {plaidMeta
              ? 'Select a Different Account'
              : 'Click Here to Select Your Bank Account'}
          </FlatButton>
        </TabPanel>
      </Tabs>
    </StyledTabs>
  )
}

StripeFieldset.propTypes = {
  form: PropTypes.string,
  method: PropTypes.string,
  plaidMeta: PropTypes.object,
  change: PropTypes.func,
  clearSubmitErrors: PropTypes.func,
}

export default StripeFieldset
