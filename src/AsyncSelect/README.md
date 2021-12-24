# AsyncSelect

## Usage

```
import React, { useState } from 'react'

import AsyncSelect from 'components/AsyncSelect'
```

## Properties

- **propName** - Prop Description

## Examples

- **use in view or whatever** -

const AsyncExample =({change, fetchThingsAutocomplete}) => {
const [sponsorValue, setSponsorValue] = useState(null)

const handleFetchThings = async input => {
if (input && input !== '') {
return await fetchThingsAutocomplete(input).then(response => {
if (!response.error) {
/_ Reshaping response to match the record cominig down from the server.
This is a fix for a giant headache 2 different key/value arrays would cause in a select box._/

          const thingsArray = []
          response.payload.forEach(thing => {
            thingsArray.push({
              _id: thing.userId,
              inviteCode: thing.code
            })
          })

          return referralsArray
        }
      })
    }

}

const handleOnChangeSponsor = sponsorValue => {
setSponsorValue(sponsorValue)

    change('sponsor', sponsorValue ? sponsorValue._id : null)

}

<AsyncSelect
name="sponsor"
isClearable={true}
value={sponsorValue}
onChange={handleOnChangeSponsor}
placeholder="Enter invite code..."
altLabel="Invite/referral code"
loadOptions={input =>
handleFetchThings(input)
}
getOptionValue={option => option.\_id}
getOptionLabel={option => option.inviteCode}
type="text"
/>
}

export default AsyncExample

- **API for fetchThingsAutocomplete** -
  export const fetchReferralsAutocomplete = async thing => {
  const res = await axios(`/things/autocomplete/${thing}`)
  const payload = await res

  return payload.data
  }
