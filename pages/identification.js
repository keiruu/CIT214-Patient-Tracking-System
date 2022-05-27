import React from 'react'
import styles from '../styles/Identification.module.css'

function Identification() {
  return (
    <div>

      <div className={styles.header}>
            <h1> Patient Identification Form </h1>
      </div>

      <div className={styles.form}>
        <form action='patients.html' method='GET'>
           <div className={styles.gridcontainer}>
               <div className={styles.flexcontainer}>
                     <div className={styles.PN}>
                        <input type="text" name='PN' id='PN' placeholder='Patients No.' required></input>
                     </div>
                     <div className={styles.Fname}>
                        <input type="text" name='Fname' id='Fname' placeholder='First Name' required></input>
                     </div>
                     <div className={styles.Mname}>
                        <input type="text" name='Mname' id='Mname' placeholder='Middle Name'></input>
                     </div>
                     <div className={styles.Lname}>
                        <input type="text" name='Lname' id='Lname' placeholder='Last Name' required></input>
                     </div>
               </div>
               <div className={styles.flexcontainer}>
                     <div className={styles.sex}>
                        <input type="text" name='Sex' id='Sex' placeholder='Sex'></input>
                     </div>
                     <div className={styles.DOB}>
                        <input type="date" name='Dob' id='Dob' placeholder='Date of Birth' required></input>
                     </div>
                     <div className={styles.add}>
                        <input type="text" name='Add' id='Add' placeholder='Address' required></input>
                     </div>
               </div>
               <div className={styles.flexcontainer}>
                     <div className={styles.Cno}>
                        <input type="tel" name='Cno.' id='Cno.' placeholder='Contact No.' required></input>
                     </div>
                     <div className={styles.GN}>
                        <input type="text" name='GN' id='GN' placeholder='Name of Guardian' ></input>
                     </div>
                     <div className={styles.Gco}>
                        <input type="tel" name='Gco.' id='Gco.' placeholder="Guardian's Contact No."></input>
                     </div>
               </div>
               <div className={styles.flexcontainer}>
                     <div className={styles.textarea}>
                        <textarea type="text" name='allergies' id='allergies' placeholder='Allergies'></textarea>
                     </div>
                     <div className={styles.buttons}>
                        <button type="reset" className={styles.Button1}>Cancel</button>
                        <button type="submit" className={styles.Button2}>Next</button>
                     </div>
               </div>
           </div>
        </form>
      </div>
    </div>

  )
}

export default Identification