import React, { Component, useEffect, useState } from 'react' 
import styles from '../../styles/Diagnosis.module.css'
import { useRouter } from 'next/router'
import { useAuth } from '../../src/authContext'
import { db } from '../../src/firebase';
import { getFirestore, collection, query, getDoc, setDoc, doc, where, addDoc} from "firebase/firestore";


function Diagnosis() {
  const router = useRouter()
  const {getPatient} = useAuth()
  const [patientInfo, setPatientInfo] = useState()
  const [deets, setDeets] = useState(false)
  const route = router.asPath.split("/")
  const routeID = route[route.length-1]
  const [checked, setCheck] = useState(false)
  const [enable, setEnable] = useState(true)
  const [followup, setFollowup] = useState()

  useEffect(() => {
    console.log("routeID ", routeID)
    handleGet(routeID).then(() => setDeets(true))
  }, [])

  const [info, setInfo] = useState({
    name: "",
    weight: "",
    height: "",
    date: "",
    diagnosis: "",
    });
    
  const handleChange = (e) => {
      setInfo({
          ...info,
          [e.target.name]: e.target.value,
      });
  };

  const handleGet = async (routeID) => {
    setPatientInfo(await getPatient(routeID))
    console.log("INFO: ", patientInfo) 
  }
  
  const handleSubmit =(e) =>{
    e.preventDefault();
    const current = new Date();
    const fol = `${current.getFullYear()}-${current.getDate()+1}-${current.getMonth()}T${current.getHours()}:${current.getMinutes()}`
    
    const getData = async(id) => {
      const db = getFirestore()
      const q = query(collection(db, 'patientInfo'), where ('id', '==', id))
      const docRef = doc(db, 'patientInfo', id);
      const snapshot = await getDoc(docRef)

      console.log("Diagnosis data ", snapshot.data())
      if (enable) {
        console.log("here")
        const current = new Date();
        const fol = `${current.getFullYear()}-${current.getDate()+1}-${current.getMonth()}T${current.getHours()}:${current.getMinutes()}`
        console.log(fol)
        setFollowup(fol)
      }
      await addDoc(collection(db, `patientInfo/${id}/diagnosis`), {
          name: info.name,
          height: info.height,
          weight: info.weight,
          date: info.date ? info.date : fol,
          diagnosis: info.diagnosis,
          followup: checked,
          followupDate: info.date ? info.date : fol
      }).catch((error) => console.log(error))
      window.location.assign('http://localhost:3000/patients')
    }
    console.log(routeID);
    getData(routeID);
    };
  
    const handleCheck = event => {
      if (event.target.checked) {
        console.log("is checked")
        setCheck(true)
        setEnable(false)
      } else {
        console.log("nope")
        setCheck(false)
        setEnable(true)
      }
    };
  return (
    <div className={styles.diagnosisContainer}> 
    {deets && <form> 
        <div className={styles.headerD}> 
          <h1> Diagnosis Form </h1>
        </div>
        <div className= {styles.patientsInfoContainer}> 
          <div className= {styles.field}> 
            <input type= "text" name= "name" id="name" value={info.name}
                                    onChange={handleChange}
                                    placeholder= "Name"/>  
          </div>

          <div className= {styles.field}> 
            <input type= "number" name= "weight" id= "weight" value={info.weight}
                                    onChange={handleChange}
                                    placeholder= "Weight"/>  
          </div> 

          <div className= {styles.field}> 
            <input type= "number" name= "height" id= "height" value={info.height}
                                    onChange={handleChange}
                                    placeholder= "Height"/>  
          </div>
       
          <div className= {styles.checkBox}> 
            <input type= "checkbox" id="checkbox" name="checkbox" onChange={handleCheck}/> 
            <label> For follow up check up </label>
          </div>
          
        </div>

        
        <div className={styles.row2}>
          <div className= {styles.inputDiagnosis}>  
            <textarea type="text" name = "diagnosis" id = "diagnosis" value={info.diagnosis}
                                    onChange={handleChange}
                                    placeholder= "Diagnosis"/>
          </div> 
          
          
          <div className= {styles.datetime}>
            <input disabled={enable} type= "datetime-local" name="date" id = "date"
            value={info.date}
            onChange={handleChange}/> 
          </div>
        </div>
        

        <div className= {styles.button}>  
          <div className= {styles.cancelButton}> 
            <button type='button' onClick={() => router.back()}>CANCEL</button>
          </div> 

          <div className= {styles.saveButton}> 
            <input onClick={handleSubmit} type= "submit" value= "SAVE"/>
          </div> 
        </div>

      </form>
    }
    </div>
  )
}

export default Diagnosis;