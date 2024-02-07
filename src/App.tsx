import { RouterProvider } from 'react-router-dom'
import router from '@/router'

function App() {
  return (
    <RouterProvider fallbackElement={<p>Initial Load...</p>} router={router} />
  )
}

export default App
