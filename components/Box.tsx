import React from 'react'
import { useDrag } from 'react-dnd'



export const Box = (props:{name:string}) => {

      
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { props },
        end: (item, monitor) => {
          const dropResult:any = monitor.getDropResult()
          if (item && dropResult) {
            alert(`You dropped ${item.props.name} into ${dropResult.name}!`)
          }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
          handlerId: monitor.getHandlerId(),
        }),
      }))


  return (
    <div  ref={drag}  className={` ${isDragging?' opacity-70':''}  `}  >
    {props.name} 
  </div>
  )
}
