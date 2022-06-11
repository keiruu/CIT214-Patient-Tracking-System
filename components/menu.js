import { Menu, Transition} from '@headlessui/react'
import { useAuth } from '../src/authContext'
import { useRouter } from 'next/router'
import styles from '../styles/Menu.module.css'
import React, { Fragment, useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

function MyDropdown() {

  const { logout, userName } = useAuth()
  const [doctor, setDoctor] = useState()
  const router = useRouter()


  useEffect(() => {
    const doc = userName.split(" ")
    setDoctor(doc[0])
  }, [userName])

  return (
    <div className={styles.container}>
      <Menu className={styles.menu}>
        <div>
          <div>
            <Menu.Button className={styles.menuButton}>
              Dr. {doctor}
              <FontAwesomeIcon icon={faAngleDown} className={styles.arrow} />
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