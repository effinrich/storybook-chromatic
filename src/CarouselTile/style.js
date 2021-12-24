import styled from 'styled-components'

import ShadowBox from 'components/ShadowBox'

export default styled(ShadowBox)`
  border: solid 1px ${(props) => props.theme.lightGrey};
`

export const StyledCarouselTileImageWrapper = styled.div`
  position: relative;
`

export const StyledCarouselTileName = styled.div`
  position: absolute;
  z-index: 1;
  color: white;
  bottom: 8px;
  left: 8px;
  text-shadow: 2px 2px 2px ${(props) => props.theme.superDarkGrey};
  font-size: 16px;
`

export const StyledCarouselTileDetails = styled.div`
  padding: 5px;
  background-color: white;
  width: 100%;
  max-width: 140px;
  height: 60px;
`
