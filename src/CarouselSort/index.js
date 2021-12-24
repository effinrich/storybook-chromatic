import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { Carousel } from 'models'
import CarouselTile from 'components/CarouselTile'

import StyledCarouselSort, {
  StyledCarouselSortWrapper,
  StyledCarouselSortItem,
} from './style'

const propTypes = {
  carousel: PropTypes.instanceOf(Carousel),
  items: PropTypes.array,
  onDragEnd: PropTypes.func,
  handleDragEnd: PropTypes.func,
  isDragDisabled: PropTypes.bool,
  isCategory: PropTypes.bool,
}

const defaultProps = {
  isDragDisabled: false,
}

const CarouselSort = ({
  carousel,
  onDragEnd,
  items,
  isDragDisabled,
  isCategory,
}) => {
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
    <StyledCarouselSort>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <StyledCarouselSortWrapper
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
                    <StyledCarouselSortItem
                      isDragging={snapshot.isDragging}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps.style}
                    >
                      <CarouselTile item={item} isCategory={isCategory} />
                    </StyledCarouselSortItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </StyledCarouselSortWrapper>
          )}
        </Droppable>
      </DragDropContext>
    </StyledCarouselSort>
  )
}

CarouselSort.propTypes = propTypes
CarouselSort.defaultProps = defaultProps

export default CarouselSort
