import Table from '../components/table'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import styles from '../styles/Patients.module.css'

export default function PatientsHistory() {
  /*const [PN, setNum] = useState('');*/
  /*const [Mname, setMname] = useState('');
  const [Lname, setLname] = useState('');
  const [Sex, setSex] = useState('');
  const [DoB, setDoB] = useState('');
  const [Add, setAdd] = useState('');
  const [Cont, setCont] = useState('');
  const [Gn, setGn] = useState('');
  const [GnCont, setGnCont] = useState('');
  const [Allergy, setAllergy] = useState('');*/


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