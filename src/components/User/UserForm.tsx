import { useAppDispatch, useAppSelector } from '../../features/hooks'
import UserSignupForm from './UserSignupForm'
import styles from '../../styles/User.module.css'
import { toggleForm, toggleFormType } from '../../features/user/userSlice'
import UserLoginForm from './UserLoginForm'

export default function UserForm() {
  const dispatch = useAppDispatch()
  const { showForm, formType } = useAppSelector((state) => state.user)

  const closeForm = () => dispatch(toggleForm(false))
  const toggleCurrentFormType = (type: 'signup' | 'login') =>
    dispatch(toggleFormType(type))

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm} />
      {formType === 'signup' ? (
        <UserSignupForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      ) : (
        <UserLoginForm
          toggleCurrentFormType={toggleCurrentFormType}
          closeForm={closeForm}
        />
      )}
    </>
  ) : (
    <></>
  )
}
