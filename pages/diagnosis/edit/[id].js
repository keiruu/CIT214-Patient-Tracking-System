import { setDoc, getFirestore, addDoc, collection, updateDoc, where, getDoc, query, doc} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../../../src/firebase';
import styles from '../../../styles/Identification.module.css';
import { useRouter } from 'next/router'
import { useAuth } from '../../../src/authContext';

function Identification() {
   const [PN, setNum] = useState('');
   const [Fname, setFname] = useState('');
   const [Mname, setMname] = useState('');
   const [Lname, setLname] = useState('');
   const [Sex, setSex] = useState('');
   const [DoB, setDoB] = useState('');
   const [Add, setAdd] = useState('');
   const [Cont, setCont] = useState('');
   const [Gn, setGn] = useState('');
   const [GnCont, setGnCont] = useState('');
   const [Allergy, setAllergy] = useState('');
   const [patientInfo, setPatientInfo] = useState()
   const { getPatient } = useAuth()
   const router = useRouter()
   const [ deets, setDeets ] = useState(false)
   const route = router.asPath.split("/")
   const routeID = route[route.length-1]
   
   const [ trig, setTrig ] = useState(false)
   const [ trig1, setTrig1 ] = useState(false)
   const [ trig2, setTrig2 ] = useState(false)
   const [ trig3, setTrig3 ] = useState(false)
   const [ trig4, setTrig4 ] = useState(false)
   const [ trig5, setTrig5 ] = useState(false)
   const [ trig6, setTrig6 ] = useState(false)
   const [ trig7, setTrig7 ] = useState(false)
   const [ trig8, setTrig8 ] = useState(false)
   const [ trig9, setTrig9 ] = useState(false)

   useEffect(() => {
        const route = router.asPath.split("/")
        const routeID = route[route.length-1]
        console.log("routeID ", routeID)
        handleGet(routeID).then(() => {
            setDeets(true)
        })
        .catch((error) => console.log(error))
    }, [])

   const handleGet = async (routeID) => {
        setPatientInfo(await getPatient(routeID))
        console.log("INFO: ", patientInfo) 
    }

   function handleSubmit(e){
    e.preventDefault()
    const updateDoc = async (id) => {
        const db = getFirestore()
        console.log(id)
        const q = query(collection(db, 'patientInfo'), where ('id', '==', id))
        const docRef = doc(db, 'patientInfo', id);
        // const snapshot = await getDoc(docRef)
        // console.log("here ", snapshot.data)
        // const patInf = collection(db,"patientInfo"), where ('id', '==', id)
        await setDoc(docRef, { 
            Fname: Fname, 
            Mname: Mname, 
            Lname: Lname, 
            Sex: Sex, 
            DoB: DoB, 
            Add: Add, 
            Cont: Cont, 
            Gn: Gn, 
            GnCont: GnCont, 
            Allergy: Allergy
        })
        .then(response => {
            console.log(response)
            window.location.assign('http://localhost:3000/patients')
            // router.push('/patients')
        })
        // .catch(error => {
        //     console.log(error.message)
        // })
    }

    updateDoc(routeID)
  }

  const setter = (info) => {
    if(Fname != info){
        setFname(info)
        return info
    }
  }
  const setter1 = (info) => {
    if(Mname != info){
        setMname(info)
        return info
    }
  }
  const setter2 = (info) => {
    if(Lname != info){
        setLname(info)
        return info
    }
  }
  const setter3 = (info) => {
    if(Sex != info){
        setSex(info)
        return info
    }
  }
  const setter4 = (info) => {
    if(DoB != info){
        setDoB(info)
        return info
    }
  }
  const setter5 = (info) => {
    if(Add != info){
        setAdd(info)
        return info
    }
  }
  const setter6 = (info) => {
    if(Cont != info){
        setCont(info)
        return info
    }
  }
  const setter7 = (info) => {
    if(Gn != info){
        setGn(info)
        return info
    }
  }
  const setter8 = (info) => {
    if(GnCont != info){
        setGnCont(info)
        return info
    }
  }
  const setter9 = (info) => {
    if(Allergy != info){
        setAllergy(info)
        return info
    }
  }
   
  return (
    <div className={styles.diagnosisContainer}> 

      <form> 
        <div className={styles.headerD}> 
          <h1> Diagnosis Form </h1>
        </div>
        <div className= {styles.patientsInfoContainer}> 
          <div className= {styles.field}> 
            <input type= "tel" name= "phone" placeholder= "Patient No."/>  
          </div>

          <div className= {styles.field}> 
            <input type= "number" name= "weight" placeholder= "Weight"/>  
          </div> 

          <div className= {styles.field}> 
            <input type= "number" name= "height" placeholder= "Height"/>  
          </div>
       
          <div className= {styles.checkBox}> 
            <input type= "checkbox"/> 
            <label> For follow up check up </label>
          </div>
          
        </div>

        
        <div className={styles.row2}>
          <div className= {styles.inputDiagnosis}>  
            <textarea type="text" placeholder= "Diagnosis"/>
          </div> 
          
          
          <div className= {styles.datetime}>
            <input type= "datetime-local"/> 
          </div>
        </div>
        

        <div className= {styles.button}>  
          <div className= {styles.cancelButton}> 
            <button onClick={() => router.back()}>CANCEL</button>
          </div> 

          <div className= {styles.saveButton}> 
            <input type= "submit" value= "SAVE"/>
          </div> 
        </div>

      </form>
    </div>
  )
}



export default Identification