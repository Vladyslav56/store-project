import { Link, useNavigate } from 'react-router-dom'

import styles from '../../styles/Header.module.css'

import { ROUTES } from '../../utils/routes'

import LOGO from '../../images/logo.svg'
import AVATAR from '../../images/avatar.jpg'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { toggleForm } from '../../features/user/userSlice'
import { useEffect, useState } from 'react'
import { useGetProductsQuery } from '../../features/api/apiSlice'

export default function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState('')
  const { currentUser, cart } = useAppSelector((state) => state.user)

  const [values, setValues] = useState({ name: 'Guest', avatar: AVATAR })

  const { data = [], isLoading } = useGetProductsQuery({
    params: { title: searchValue },
  })

  useEffect(() => {
    if (!currentUser) {
      setValues({ name: 'Guest', avatar: AVATAR })
      return
    }

    setValues(currentUser)
  }, [currentUser])

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true))
    else navigate(ROUTES.PROFILE)
  }

  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(value)
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>
      <div className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatar})` }}
          />
          <div className={styles.username}>{values.name}</div>
        </div>

        <form className={styles.form}>
          <div className={styles.icon}>
            <svg className="icon">
              <use xlinkHref={`../../sprite.svg#search`} />
            </svg>
          </div>
          <div className={styles.input}>
            <input
              type="search"
              name="search"
              placeholder="Search for anything..."
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>

          {searchValue && (
            <div className={styles.box}>
              {isLoading
                ? 'Loading'
                : !data.length
                  ? 'No results'
                  : data.map(({ title, images, id }) => {
                      return (
                        <Link
                          key={id}
                          onClick={() => setSearchValue('')}
                          className={styles.item}
                          to={`/products/${id}`}
                        >
                          <div
                            className={styles.image}
                            style={{ backgroundImage: `url(${images[0]})` }}
                          />
                          <div className={styles.title}>{title}</div>
                        </Link>
                      )
                    })}
            </div>
          )}
        </form>

        <div className={styles.account}>
          <Link to={ROUTES.HOME} className={styles.favorites}>
            <svg className={styles['icon-fav']}>
              <use xlinkHref={`../../sprite.svg#heart`} />
            </svg>
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles['icon-cart']}>
              <use xlinkHref={`../../sprite.svg#bag`} />
            </svg>
            {!!cart.length && (
              <span className={styles.count}>{cart.length}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
}
