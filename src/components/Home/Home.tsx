import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import Poster from '../Poster/Poster'
import Products from '../Products/Products'
import Categories from '../Categories/Categories'
import Banner from '../Banner/Banner'
import { filterByPrice } from '../../features/products/productsSlice'

export default function Home() {
  const dispatch = useAppDispatch()
  const { list, filtered } = useAppSelector((state) => state.products)
  const categories = useAppSelector((state) => state.categories)

  useEffect(() => {
    if (!list.length) return
    dispatch(filterByPrice(100))
  }, [dispatch, list.length])

  return (
    <>
      <Poster />
      <Products products={list} amount={5} title="Trending" />
      <Categories products={categories.list} amount={5} title="Worth seeing" />
      <Banner />
      <Products products={filtered} amount={5} title="Less then 100$" />
    </>
  )
}
