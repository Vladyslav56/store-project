import { useAppDispatch, useAppSelector } from '../../features/hooks'

import styles from '../../styles/Cart.module.css'
import { sumBy } from '../../utils/common'
import {
  addItemToCart,
  removeItemFromCart,
  type CartItem,
} from '../../features/user/userSlice'

export default function Cart() {
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => state.user.cart)

  const changeQuantity = (item: CartItem, quantity: number) => {
    dispatch(addItemToCart({ ...item, quantity }))
  }

  const removeItem = (id: number) => {
    dispatch(removeItemFromCart(id))
  }

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your cart</h2>
      {!cart.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => {
              const { title, category, images, price, id, quantity } = item
              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${images[0]})` }}
                  />
                  <div className={styles.info}>
                    <div className={styles.name}>{title}</div>
                    <div className={styles.category}>{category.name}</div>
                  </div>

                  <div className={styles.price}>{price}$</div>

                  <div className={styles.quantity}>
                    <div
                      className={styles.minus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity - 1))
                      }
                    >
                      <svg className="icon">
                        <use xlinkHref={`../../sprite.svg#minus`} />
                      </svg>
                    </div>

                    <span>{quantity}</span>

                    <div
                      className={styles.plus}
                      onClick={() =>
                        changeQuantity(item, Math.max(1, quantity + 1))
                      }
                    >
                      <svg className="icon">
                        <use xlinkHref={`../../sprite.svg#plus`} />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.total}>{price * quantity}$</div>

                  <div
                    className={styles.close}
                    onClick={() => removeItem(item.id)}
                  >
                    <svg className="icon">
                      <use xlinkHref={`../../sprite.svg#close`} />
                    </svg>
                  </div>
                </div>
              )
            })}
          </div>

          <div className={styles.actions}>
            <div className={styles.total}>
              TOTAL PRICE:{' '}
              <span>
                {sumBy(cart.map(({ quantity, price }) => quantity * price))}$
              </span>
            </div>

            <button className={styles.proceed}>Proceed to checkout</button>
          </div>
        </>
      )}
    </section>
  )
}
