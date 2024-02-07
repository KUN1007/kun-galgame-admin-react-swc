import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#218bff',
        },
      }}
    >
      <RouterProvider
        fallbackElement={<p>Initial Load...</p>}
        router={router}
      />
    </ConfigProvider>
  )
}

export default App
