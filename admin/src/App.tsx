import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { adminRoutes } from './routes'
import { Fragment } from 'react/jsx-runtime'
import Login from './authentication/Login'
import PrivateRoute from './routes/PrivateRoute'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {adminRoutes?.map((route, index) => {
            const Layout = route.layout || Fragment
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <Layout>
                      <route.component />
                    </Layout>
                  </PrivateRoute>
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
