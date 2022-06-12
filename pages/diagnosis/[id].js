import React, { Component, useEffect, useState } from 'react' 
import styles from '../../styles/Diagnosis.module.css'
import { useRouter } from 'next/router'
import { useAuth } from '../../src/authContext'
import { db } from '../../src/firebase';
import { collection, query, getDocs, setDoc, doc, where} from "firebase/firestore";


function Diagnosis() {
  const router = useRouter()
  const {getPatient} = useAuth()
  const [patientInfo, setPatientInfo] = useState()
  const [deets, setDeets] = useState(false)
  const route = router.asPath.split("/")
  const routeID = route[route.length-1]
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
      const getData = async(id) => {
      const q = query(collection(db, "patientInfo"), where ("id", "==", id));
      const querySnapshot = await getDocs(q);
      const queryData = querySnapshot.docs.map((infos) => ({
        ...infos.data(),
        id: infos.id,
    } 
    ));
    console.log(queryData);
    queryData.map(async (v) => {
        await setDoc(doc (db, `patientInfo/${v.id}/diagnosis`, info.name), {
            name: info.name,
            height: info.height,
            weight: info.weight,
            date: info.date,
            diagnosis: info.diagnosis,
        });
    })
    }
    console.log(routeID);
    getData(routeID);
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
            <input type= "checkbox"/> 
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
            <input type= "datetime-local" name="date" id = "date"
            value={info.date}
            onChange={handleChange}/> 
          </div>
        </div>
        

        <div className= {styles.button}>  
          <div className= {styles.cancelButton}> 
            <button onClick={() => router.back()}>CANCEL</button>
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