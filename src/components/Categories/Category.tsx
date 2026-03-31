import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../../features/api/apiSlice'

import styles from '../../styles/Category.module.css'
import Products from '../Products/Products'
import { useAppSelector } from '../../features/hooks'
import type { Product, Category } from '../../types/types'

export default function Category() {
  const { id } = useParams<{ id: string }>()
  const { list } = useAppSelector((state) => state.categories)

  const defaultValues = {
    title: '',
    price_min: 0,
    price_max: 0,
  }
  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  }

  const [isEnd, setIsEnd] = useState(false)
  const [cat, setCat] = useState<Category | null>(null)
  const [items, setItems] = useState<Product[]>([])
  const [params, setParams] = useState(defaultParams)
  const [values, setValues] = useState(defaultValues)

  const { data = [], isLoading, isSuccess } = useGetProductsQuery({ params })

  useEffect(() => {
    if (!id) return

    setItems([])
    setIsEnd(false)
    setValues(defaultValues)
    setParams({ ...defaultParams, categoryId: id })
  }, [id])

  useEffect(() => {
    if (isLoading) return

    if (!data.length) return setIsEnd(true)

    setItems((_items) => [..._items, ...data])
  }, [data, isLoading])

  useEffect(() => {
    if (!id || !list.length) return

    const category = list.find((item) => item.id === Number(id))

    setCat(category || null)
  }, [list, id])

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setItems([])
    setIsEnd(false)
    setParams({ ...defaultParams, ...values })
  }

  const handleReset = () => {
    setValues(defaultValues)
    setParams(defaultParams)
    setIsEnd(false)
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Product name"
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleChange}
            placeholder="0"
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleChange}
            placeholder="0"
            value={values.price_max}
          />
          <span>Price to</span>
        </div>

        <button type="submit" hidden />
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}
      {!isEnd && (
        <div className={styles.more}>
          <button
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        </div>
      )}
    </section>
  )
}
