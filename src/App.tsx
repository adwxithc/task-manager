
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/mainRoutes'
import Loading from './components/Loading'


function App() {


  return (
    <Suspense  fallback={<Loading />}>
      <RouterProvider router={router} fallbackElement={<Loading/>} />
    </Suspense>
  )
}

export default App
