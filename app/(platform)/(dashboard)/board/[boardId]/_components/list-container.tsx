'use client'

import { ListWithCards } from '@/types'
import { ListForm } from './list-form'
import { useEffect, useState } from 'react'
import { ListItem } from './list.item'
import {
  DragDropContext,
  Droppable,
} from '@hello-pangea/dnd'
import { useAction } from '@/hooks/use-action'
import { updateListOrder } from '@/actions/update-list-order'
import { toast } from 'sonner'
import { updateCardOrder } from '@/actions/update-card-order'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

function reorder<T>(
  list: T[],
  startIndex: number,
  endIndex: number,
) {
  const result = Array.from(list)

  const [removed] = result.splice(startIndex, 1)

  result.splice(endIndex, 0, removed)

  return result
}

export const ListContainer = ({
  data,
  boardId,
}: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  const { execute: executeUpdateListOrder } = useAction(
    updateListOrder,
    {
      onSuccess: () => {
        toast.success('List reorderd')
      },
      onError: error => {
        toast.error(error)
      },
    },
  )

  const { execute: executeUpdateCardOrder } = useAction(
    updateCardOrder,
    {
      onSuccess: () => {
        toast.success('Card reorderd')
      },
      onError: error => {
        toast.error(error)
      },
    },
  )

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result

    if (!destination) {
      return
    }

    //if dropped in the same position

    if (
      destination.droppableId === source.draggableId &&
      destination.index === source.index
    ) {
      return
    }

    //moving a list

    if (type === 'list') {
      const items = reorder(
        orderedData,
        source.index,
        destination.index,
      ).map((item, index) => ({ ...item, order: index }))
      setOrderedData(items)

      executeUpdateListOrder({ items, boardId })
    }

    //moving a card

    if (type === 'card') {
      let newOrderedData = [...orderedData]

      //source and destination list

      const sourceList = newOrderedData.find(
        list => list.id === source.droppableId,
      )

      const destinationList = newOrderedData.find(
        list => list.id === destination.droppableId,
      )

      if (!sourceList || !destinationList) {
        return
      }

      //check if cards exist on source list

      if (!sourceList.cards) {
        sourceList.cards = []
      }

      if (!destinationList.cards) {
        destinationList.cards = []
      }

      //drag and drop in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        )

        reorderedCards.forEach((card, idx) => {
          card.order = idx
        })

        sourceList.cards = reorderedCards

        setOrderedData(newOrderedData)

        executeUpdateCardOrder({
          boardId: boardId,
          items: reorderedCards,
        })
      }
      //user moves card to another list
      else {
        //remove card from the source list

        const [movedCard] = sourceList.cards.splice(
          source.index,
          1,
        )

        //assign the new list id to the moved card

        movedCard.listId = destination.droppableId

        //add the card to the destination list

        destinationList.cards.splice(
          destination.index,
          0,
          movedCard,
        )

        //update the order of the cards on source list

        sourceList.cards.forEach((card, idx) => {
          card.order = idx
        })

        //update the order of the cards on destination list
        destinationList.cards.forEach((card, idx) => {
          card.order = idx
        })

        setOrderedData(newOrderedData)
        executeUpdateCardOrder({
          boardId: boardId,
          items: destinationList.cards,
        })
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId='lists'
        type='list'
        direction='horizontal'
      >
        {provided => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='flex gap-x-3 h-full'
          >
            {orderedData.map((list, index) => (
              <ListItem
                key={list.id}
                index={index}
                data={list}
              />
            ))}

            {provided.placeholder}
            <ListForm />
            <div className='flex shrink-0 w-1' />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
