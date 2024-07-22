import { DragEvent, useState } from "react";
import DropIndicator from "./DropIndicator";
import SingleTask from "./SingleTask";
import AddTask from "./AddTask";

interface IColumnProps {
    title: string;
    headingColor: string
    column: string
    cards: {
      title: string;
      id: string;
      column: string;
    }[]
    setCards: React.Dispatch<React.SetStateAction<{
      title: string;
      id: string;
      column: string;
    }[]>>
  }

const Column = ({ title, headingColor, column, cards, setCards }: IColumnProps) => {
    const filteredCards = cards.filter((c) => c.column == column)
    const [active, setActive] = useState(false)
  
    const handleDragStart = (e: DragEvent<HTMLDivElement>, card: {
      title: string;
      id: string;
      column: string;
    }) => {
      console.log(card.id);
      
      e.dataTransfer.setData("cardId", card.id);
    }
  
    const handleDragOver =(e:DragEvent<HTMLDivElement>)=>{
        e.preventDefault()
        highlightIndicator(e)
        setActive(true)
    }
  
    const handleDragLeave =()=>{
      clearHighlights()
      setActive(false)
    }
  
    const handleDragEnd =(e:DragEvent<HTMLDivElement>)=>{
      clearHighlights()
      setActive(false)
      const cardId = e.dataTransfer.getData('cardId');
      const indicators =getIndicators();
      const {element } =getNearesIndicator(e,indicators)
      const before = element.getAttribute('data-before')||'-1';
      if(before !==cardId){
        let copy =[...cards]
        let cardToTransfer = copy.find(c=>c.id === cardId);
        if(!cardToTransfer) return
  
        cardToTransfer = {...cardToTransfer, column}
        copy = copy.filter(c=>c.id!==cardId);
        const moveToBack =  before ==="-1"
        if(moveToBack){
          copy.push(cardToTransfer)
        }else{
          const insertAtIndex = copy.findIndex(el=>el.id===before);
          if(insertAtIndex === undefined) return;
          copy.splice(insertAtIndex,0,cardToTransfer)
        }
        setCards(copy)
      }
    }
  
    const highlightIndicator =(e:DragEvent<HTMLDivElement>)=>{
      const indicators = getIndicators()
      clearHighlights()
      const el = getNearesIndicator(e,indicators)
      if (el.element instanceof HTMLElement) {
        el.element.style.opacity = '1';
      }
   
    }
  
    const clearHighlights =()=>{
      const indicators = getIndicators()
      indicators.forEach(el=>{
        if (el instanceof HTMLElement) {
          el.style.opacity = '0';
        }
      }
      )
    }
    const getNearesIndicator=(e:DragEvent<HTMLDivElement>,indicators:Element[])=>{
      const DISTANCE_OFFSET = 50;
      const el = indicators.reduce(
        (closest,child)=>{
          const box =child.getBoundingClientRect();
          const offset = e.clientY-(box.top + 
            DISTANCE_OFFSET
          );
          if(offset<0 && offset>closest.offset){
            return {offset: offset, element:child}
          }else{
            return closest;
          }
        },
        {
          offset:Number.NEGATIVE_INFINITY,
          element:indicators[indicators.length-1]
        }
      )
      return el
    }
  
    const getIndicators=()=>{
      return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    }
  
    return <div className="w-72 shrink-0 border p-3 rounded-md border-neutral-600">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title} </h3>
        <span className="rounded text-sm text-neutral-400">{filteredCards.length}</span>
  
      </div>
      <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDragEnd}
        className={`h-full w-full transition-colors ${active ? 'bg-neutral-800/50' : 'bg-neutral-800/0'}`}
      >
        {
          filteredCards.map(c => (
            <SingleTask handleDragStart={(e)=>handleDragStart(e,c)} key={c.id} {...c} />
          ))
        }
        <DropIndicator beforeId={"-1"} column={column} />
        <AddTask column={column} setCards={setCards} />
      </div>
    </div>
  }

  export default Column