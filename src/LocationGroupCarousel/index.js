import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import LocationGroupTile from 'components/LocationGroupTile'

import StyledLocationGroupCarousel, {
  StyledLocationGroupCarouselWrapper,
  StyledLocationGroupCarouselItem,
} from './style'

const propTypes = {
  items: PropTypes.array,
  onDragEnd: PropTypes.func,
  handleDragEnd: PropTypes.func,
  isDragDisabled: PropTypes.bool,
}

const defaultProps = {
  isDragDisabled: false,
}

const LocationGroupCarousel = ({ onDragEnd, items, isDragDisabled }) => {
  // const handleToggleChange = event => {
  //   onToggleCarousel(carousel, event.target.checked)
  // }

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    if (onDragEnd) {
      onDragEnd(result)
    }
  }

  return (
    <StyledLocationGroupCarousel>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <StyledLocationGroupCarouselWrapper
              isDraggingOver={snapshot.isDraggingOver}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  isDragDisabled={isDragDisabled}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <StyledLocationGroupCarouselItem
                      isDragging={snapshot.isDragging}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps.style}
                    >
                      <LocationGroupTile item={item} />
                    </StyledLocationGroupCarouselItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </StyledLocationGroupCarouselWrapper>
          )}
        </Droppable>
      </DragDropContext>
    </StyledLocationGroupCarousel>
  )
}

LocationGroupCarousel.propTypes = propTypes
LocationGroupCarousel.defaultProps = defaultProps

export default LocationGroupCarousel
