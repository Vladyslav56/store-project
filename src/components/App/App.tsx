import { useEffect } from 'react'
import { getCategories } from '../../features/categories/categoriesSlice'
import { getProducts } from '../../features/products/productsSlice'
import { useAppDispatch } from '../../features/hooks'

import AppRoutes from '../Routes/Routes'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Sidebar from '../Sidebar/Sidebar'
import UserForm from '../User/UserForm'

export default function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])

  return (
    <div className="app">
      <Header />
      <UserForm />
      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>

      <Footer />
    </div>
  )
}
