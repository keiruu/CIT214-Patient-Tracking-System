import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/sidebar'
import Link from 'next/link'

export default function Home() {
  const data = "im passing something"

  return (
    <div className={styles.container}>
      <Sidebar data={data}/>
      <h1>Sample Text</h1>
      <Link href="/login">login</Link>
    </div>
  )
}
