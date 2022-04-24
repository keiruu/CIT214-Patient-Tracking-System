import React, { Component } from 'react'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import styles from '../styles/Dashboard.module.css'
export default class Dashboard extends Component {
  render() {
    return (
      <div className={styles.dashboardContainer}>
        <Sidebar/>
        <div className={styles.leftContainer}>
          <Header/>
          <div>

          </div>
        </div>
      </div>
    )
  }
}
