import { Dispatch, DragEvent, useState } from "react";

const DeleteCard = ({ setCards }: {
    setCards: Dispatch<React.SetStateAction<{
      title: string;
      id: string;
      column: string;
    }[]>>
  }) => {
    const [active, setActive] = useState(false)
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setActive(true)
    }
    const handleDragLeave = () => {
      setActive(false)
    }
    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
      
      
      const cardId = e.dataTransfer.getData('cardId')
  
  
      setCards((pv) => pv.filter((c) => c.id !== cardId));
  
      setActive(false);
    }
  
    return <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
     
      className={`mt-10 grid h-56 w-56 shrink-0
    place-content-center rounded border text-3xl
    ${active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
        }
    `}
    >
      {
        active ? <span className="animate-bounce">fire</span> : <span>trash</span>
      }
  
    </div>
  }

  export default DeleteCard