import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../src/firebase';
import styles from '../styles/Identification.module.css';
import { useRouter } from 'next/router'

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
   const router = useRouter()

   function handleSubmit(e){
      e.preventDefault()
      if (PN === '') {
         return
      }
      const patInf = collection(db,"patientInfo")
      addDoc(patInf, { PN, Fname, Mname, Lname, Sex, DoB, Add, Cont, Gn, GnCont, Allergy })
      .then(response => {
         console.log(response)
         router.push('/patients')
      }) 
      .catch(error => {
         console.log(error.message)
      })
      
   }
  return (
    <div>

      <div className={styles.header}>
            <h1> Patient Identification Form </h1>
      </div>

      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
           <div className={styles.gridcontainer}>
               <div className={styles.flexcontainer}>
                     <div className={styles.PN}>
                        <input type="text" name='PN' id='PN' value={PN}  placeholder='Patients No.' required onChange={e => setNum(e.target.value) }></input>
                     </div>
                       <div className={styles.Fname}>
                        <input type="text" name='Fname' id='Fname' value={Fname} placeholder='First Name' required onChange={e => setFname(e.target.value) }></input>
                     </div>
                    <div className={styles.Mname}>
                        <input type="text" name='Mname' id='Mname' value={Mname} placeholder='Middle Name' onChange={e => setMname(e.target.value) }></input>
                     </div>
                     <div className={styles.Lname}>
                        <input type="text" name='Lname' id='Lname' value={Lname} placeholder='Last Name' required onChange={e => setLname(e.target.value) }></input>
                     </div>
               </div>
               <div className={styles.flexcontainer}>
                     <div className={styles.sex}>
                        <input type="text" name='Sex' id='Sex' value={Sex} placeholder='Sex' onChange={e => setSex(e.target.value) }></input>
                     </div>
                     <div className={styles.DOB}>
                        <input type="date" name='Dob' id='Dob' value={DoB} placeholder='Date of Birth' required onChange={e => setDoB(e.target.value) }></input>
                     </div>
                     <div className={styles.add}>
                        <input type="text" name='Add' id='Add' value={Add} placeholder='Address' required onChange={e => setAdd(e.target.value) }></input>
                     </div>
               </div>
               <div className={styles.flexcontainer}>
                     <div className={styles.Cno}>
                        <input type="tel" name='Cno.' id='Cno.' value={Cont} placeholder='Contact No.' required onChange={e => setCont(e.target.value) }></input>
                     </div>
                     <div className={styles.GN}>
                        <input type="text" name='GN' id='GN' value={Gn} placeholder='Name of Guardian' onChange={e => setGn(e.target.value) }></input>
                     </div>
                     <div className={styles.Gco}>
                        <input type="tel" name='Gco.' id='Gco.' value={GnCont} placeholder="Guardian's Contact No. " onChange={e => setGnCont(e.target.value) }></input>
                     </div>
               </div>
               <div className={styles.flexcontainer}>
                     <div className={styles.textarea}>
                        <textarea type="text" name='allergies' id='allergies' value={Allergy} placeholder='Allergies' onChange={e => setAllergy(e.target.value) }></textarea>
                     </div> 
                     <div className={styles.buttons}>
                        <button type="reset" className={styles.Button1} onClick={() => router.back()}>Cancel</button>
                        <button type="submit" className={styles.Button2}>Save</button>
                     </div>
               </div>
           </div>
        </form>
      </div>
    </div>

  )
}



export default Identification