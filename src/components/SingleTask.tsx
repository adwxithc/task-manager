import { DragEvent } from "react";
import {motion} from 'framer-motion'

import DropIndicator from "./DropIndicator";

const SingleTask = ({ title, id, column, handleDragStart }: {
    title: string, id: string, column: string, handleDragStart: (e: DragEvent<HTMLDivElement>, card: {
      title: string;
      id: string;
      column: string;
    }) => void
  }) => {
    return <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
      layout
      layoutId={id}
        onDragStart={(e) => handleDragStart(e as unknown as DragEvent<HTMLDivElement>, { title, id, column })}
        draggable="true"
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grab">
        <p className="text-neutral-100">
          {title}
        </p>
      </motion.div>
    </>
  }

  export default SingleTask