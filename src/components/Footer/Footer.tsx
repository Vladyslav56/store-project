import { Link } from 'react-router-dom'

import styles from '../../styles/Footer.module.css'

import LOGO from '../../images/logo.svg'
import { ROUTES } from '../../utils/routes'

export default function Footer() {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      <div className={styles.rights}>Developed by Vladyslav Masliukov</div>

      <div className={styles.socials}>
        <a href="https://instgram.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`../../sprite.svg#instagram`} />
          </svg>
        </a>

        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`../../sprite.svg#facebook`} />
          </svg>
        </a>

        <a href="https://youtube.com" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`../../sprite.svg#youtube`} />
          </svg>
        </a>
      </div>
    </section>
  )
}
