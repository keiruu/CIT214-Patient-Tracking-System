import { Menu, Transition} from '@headlessui/react'
import { useAuth } from '../src/authContext'
import { useRouter } from 'next/router'
import styles from '../styles/Menu.module.css'
import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

function MyDropdown() {

  const { logout } = useAuth()
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Menu className={styles.menu}>
        <div>
          <div>
            <Menu.Button className={styles.menuButton}>
              More
              <FontAwesomeIcon icon={faAngleDown} className={styles.profileIcon} />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter={styles.enter}
            enterFrom={styles.from}
            enterTo={styles.to}
            leave={styles.leave}
            leaveFrom={styles.leaveFrom}
            leaveTo={styles.leaveTo}
            >
            <Menu.Items className={styles.menuItems}>
              <div className={styles.menuItemsDiv}>
                <Menu.Item className={styles.menuItem}>
                  {({ active }) => (
                    <a
                      className={`${active ? styles.active : styles.inactive}`}
                      href="/account-settings"
                    >
                      Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item className={styles.menuItem}>
                  {({ active }) => (
                    <a
                    className={`${active ? styles.active : styles.inactive}`}
                    onClick={() => {
                      logout()
                      router.push('/login')
                    }}
                    >
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
    </div>
  )
}

export default MyDropdown;