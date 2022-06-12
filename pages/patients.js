import Table from '../components/tableAllPatients'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import styles from '../styles/Patients.module.css'


export default function Patients() {
  
  return (
    <div className={styles.patientsContainer}>
      <Sidebar/>
      <div className={styles.leftContainer}>
        <Header/>
        <div className={styles.table}>
          
          <Table/>
        </div>
      </div>
    </div>
  );
}