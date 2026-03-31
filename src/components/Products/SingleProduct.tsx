import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductQuery } from '../../features/api/apiSlice'
import { useEffect } from 'react'
import { ROUTES } from '../../utils/routes'
import Product from './Product'
import Products from './Products'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { getRelatedProducts } from '../../features/products/productsSlice'

export default function SingleProduct() {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { list, related } = useAppSelector((state) => state.products)

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({
    id: Number(id),
  })

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME)
    }
  }, [isLoading, isFetching, isSuccess, navigate])

  useEffect(() => {
    if (!data || !list.length) return
    dispatch(getRelatedProducts(data.category.id))
  }, [data, dispatch, list.length])

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products" />
    </>
  )
}
