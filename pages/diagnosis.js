import React, { Component } from 'react' 
import styles from '../styles/Diagnosis.module.css'
import { useRouter } from 'next/router'

function Diagnosis() {
  const router = useRouter()

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
            <button onClick={() => router.back}>CANCEL</button>
          </div> 

          <div className= {styles.saveButton}> 
            <input type= "submit" value= "SAVE"/>
          </div> 
        </div>

      </form>
    </div>
  )
}

export default Diagnosis;