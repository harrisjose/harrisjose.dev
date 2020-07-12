import styles from './header.module.css'
const Header = ({ children }) => (
  <div className={`container max-w-screen-md  ${styles.header}`}>
    {children}
  </div>
)

export default Header
