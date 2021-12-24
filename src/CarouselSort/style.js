import styled from 'styled-components'

export default styled.div`
  width: 75vw;
  max-width: 915px;
`

export const StyledCarouselSortWrapper = styled.div`
  /* background-color: ${({ isDraggingOver, theme }) =>
    isDraggingOver ? theme.lightGrey : theme.superLightGrey}; */
  display: flex;
  padding: 8px;
  overflow: auto;
  max-height: 220px;
`

export const StyledCarouselSortItem = styled.div`
  user-select: none
  position: relative;
  margin: 0 10px 0 0;
  width: 100%;
  max-width: 150px;
  height: auto;
  box-shadow: ${({ isDragging }) =>
    isDragging ? '2px 2px 2px 2px rgba(0, 0, 0, 0.15)' : 'none'};
  opacity: ${({ isDragging }) => (isDragging ? 0.9 : 1)};
`
