import styled from 'styled-components'

import ShadowBox from 'components/ShadowBox'

export default styled(ShadowBox)`
  border: solid 1px ${(props) => props.theme.lightGrey};
`

export const StyledLocationGroupTileImageWrapper = styled.div`
  position: relative;
`

export const StyledLocationGroupTileName = styled.div`
  position: absolute;
  color: white;
  bottom: 8px;
  left: 8px;
  text-shadow: 2px 2px 2px ${(props) => props.theme.superDarkGrey};
  font-size: 20px;
`

export const StyledLocationGroupTileDetails = styled.div`
  padding: 5px;
  background-color: white;
  width: 190px;
  min-height: 40px;
`
