import { RingLoader } from "react-spinners"

function Loading() {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-neutral-950 backdrop-blur-md">
      <RingLoader color="#ffff" size={80}   />
    </div>
  )
}

export default Loading
