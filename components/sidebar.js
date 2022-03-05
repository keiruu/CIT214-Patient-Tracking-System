import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Sidebar.module.css'

export default function Sidebar(props) {
   
  return (
    <div>
      <h1>Hello Sidebar {props.data}</h1>
    </div>
  )
}
