import {   useState } from "react"

import Column from "../components/Column";
import DeleteCard from "../components/DeleteCard";
import AddColumn from "../components/AddColumn";




function Tasks() {
  return ( 
    <div className="min-h-screen h-full w-full bg-neutral-950 text-neutral-50  ">
      <div className="h-16"></div>
      <Board />

    </div>
  )
}

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  return <div className="flex  min-h-screen w-full gap-3 overflow-auto p-12">
    <Column
      title="TODO"
      column="todo"
      headingColor="text-yellow-200"
      cards={cards}
      setCards={setCards}
    />
    <Column
      title="TEST"
      column="test"
      headingColor="text-yellow-200"
      cards={cards}
      setCards={setCards}
    />
    <Column
      title="CAR"
      column="car"
      headingColor="text-yellow-200"
      cards={cards}
      setCards={setCards}
    />
    <Column
      title="Backlog"
      column="backlog"
      headingColor="text-yellow-200"
      cards={cards}
      setCards={setCards}
    />
    <Column
      title="in progress"
      column="doing"
      headingColor="text-yellow-200"
      cards={cards}
      setCards={setCards}
    />
    <Column
      title="Completed"
      column="done"
      headingColor="text-yellow-200"
      cards={cards}
      setCards={setCards}
    />
    <AddColumn />
    <DeleteCard setCards={setCards} />
  </div>
}









export default Tasks

const DEFAULT_CARDS = [
  // BACKLOG
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
    
  // TODO
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  // DOING
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  // DONE
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
  // test
  { title: "Look into render bug in dashboard", id: "11", column: "test" },
  { title: "SOX compliance checklist", id: "12", column: "test" },
  { title: "[SPIKE] Migrate to Azure", id: "13", column: "test" },
  { title: "Document Notifications service", id: "14", column: "test" },
];