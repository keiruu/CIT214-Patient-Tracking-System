import { Menu } from '@headlessui/react'
import { useAuth } from '../src/authContext'
import { useRouter } from 'next/router'

function MyDropdown() {

    const { logout, setLoading } = useAuth()
    const router = useRouter()

    // const handleLogout = (e) => {
    //     try {
    //       setLoading(true)
    //       logout()
    //       setLoading(false)
    //       router.push('/login')
    //     } catch (error) {
    //       console.log(error)
    //     }
    // }

  return (
    <Menu>
      <Menu.Button>More</Menu.Button>
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              href="/account-settings"
            >
              Profile
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && 'bg-blue-500'}`}
              onClick={() => {
                  logout()
                  router.push('/login')
              }}
            >
              Logout
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}

export default MyDropdown;