import { useEffect, useState } from 'react'
import styles from '../../styles/Profile.module.css'
import { useAppDispatch, useAppSelector } from '../../features/hooks'
import { updateUser, logout } from '../../features/user/userSlice'
import type { User } from '../../types/types'
import { useNavigate } from 'react-router'
import { ROUTES } from '../../utils/routes'

export default function Profile() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.user)

  const [values, setValues] = useState<Partial<User>>({
    name: '',
    email: '',
    password: '',
    avatar: '',
  })

  useEffect(() => {
    if (!currentUser) return

    setValues(currentUser)
  }, [currentUser])

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isNotEmpty = Object.values(values).every((val) => val)

    if (!isNotEmpty) return

    dispatch(updateUser(values))
  }

  const handleLogout = () => {
    navigate(ROUTES.HOME)
    dispatch(logout())
  }

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
        <div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
              <input
                type="email"
                placeholder="Your email"
                name="email"
                value={values.email}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.group}>
              <input
                type="name"
                placeholder="Your name"
                name="name"
                value={values.name}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.group}>
              <input
                type="password"
                placeholder="Your password"
                name="password"
                value={values.password}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.group}>
              <input
                type="avatar"
                placeholder="Your avatar"
                name="avatar"
                value={values.avatar}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className={styles.submit}>
              Update
            </button>
          </form>
          <button onClick={handleLogout} className={styles.logout}>
            Logout
          </button>
        </div>
      )}
    </section>
  )
}
