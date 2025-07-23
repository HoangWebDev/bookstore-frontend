import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { Toaster } from 'react-hot-toast'
import publicRoutes from './routes'

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <BrowserRouter>
        <Routes>
          {publicRoutes?.map((route, index) => {
            const Layout = route.layout || Fragment
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <route.component />
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
