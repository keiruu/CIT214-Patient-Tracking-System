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
    <div>

      <div className={styles.header}>
            <h1> Patient Identification Form </h1>
      </div>

        { deets && 
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
           <div className={styles.gridcontainer}>
               <div className={styles.flexcontainer}>
                    <div className={styles.Fname}>
                        <input type="text" name='Fname' id='Fname' value={Fname || trig ? Fname : setter(patientInfo.Fname)} placeholder='First Name' required onChange={e => {
                            if(e.target.value === ""){
                                setTrig(true)
                            }
                            setFname(e.target.value)
                        } }></input>
                    </div>
                    <div className={styles.Mname}>
                        <input type="text" name='Mname' id='Mname' value={Mname || trig1 ? Mname : setter1(patientInfo.Mname)} placeholder='Middle Name' onChange={e => {
                             if(e.target.value === ""){
                                setTrig1(true)
                            }
                            setMname(e.target.value)
                        } }></input>
                     </div>
                     <div className={styles.Lname}>
                        <input type="text" name='Lname' id='Lname' value={Lname || trig2 ? Lname : setter2(patientInfo.Lname)} placeholder='Last Name' required onChange={e => {
                             if(e.target.value === ""){
                                setTrig2(true)
                            }
                            setLname(e.target.value)
                        } }></input>
                     </div>
               </div>
               <div className={styles.flexcontainer}>
                     <div className={styles.sex}>
                        <input type="text" name='Sex' id='Sex' value={Sex || trig3 ? Sex : setter3(patientInfo.Sex)} placeholder='Sex' onChange={e => {
                             if(e.target.value === ""){
                                setTrig3(true)
                            }
                            setSex(e.target.value)
                        } }></input>
                     </div>
                     <div className={styles.DOB}>
                        <input type="date" name='Dob' id='Dob' value={DoB || trig4 ? DoB : setter4(patientInfo.DoB)} placeholder='Date of Birth' required onChange={e => {
                             if(e.target.value === ""){
                                setTrig4(true)
                            }
                            setDoB(e.target.value)
                        } }></input>
                     </div>
                     <div className={styles.add}>
                        <input type="text" name='Add' id='Add' value={Add || trig5 ? Add : setter5(patientInfo.Add)} placeholder='Address' required onChange={e => {
                            if(e.target.value === ""){
                                setTrig5(true)
                            }
                            setAdd(e.target.value)
                        } }></input>
                     </div>
               </div>
               <div className={styles.flexcontainer}>
                     <div className={styles.Cno}>
                        <input type="tel" name='Cno.' id='Cno.' value={Cont || trig6 ? Cont : setter6(patientInfo.Cont)} placeholder='Contact No.' required onChange={e => {
                             if(e.target.value === ""){
                                setTrig6(true)
                            }
                            setCont(e.target.value)
                        } }></input>
                     </div>
                     <div className={styles.GN}>
                        <input type="text" name='GN' id='GN' value={Gn || trig7 ? Gn : setter7(patientInfo.Gn)} placeholder='Name of Guardian' onChange={e => {
                             if(e.target.value === ""){
                                setTrig7(true)
                            }
                            setGn(e.target.value)
                        } }></input>
                     </div>
                     <div className={styles.Gco}>
                        <input type="tel" name='Gco.' id='Gco.' value={GnCont || trig8 ? GnCont : setter8(patientInfo.GnCont)} placeholder="Guardian's Contact No. " onChange={e => {
                             if(e.target.value === ""){
                                setTrig8(true)
                            }
                            setGnCont(e.target.value)
                        } }></input>
                     </div>
               </div>
               <div className={styles.flexcontainer}>
                     <div className={styles.textarea}>
                        <textarea type="text" name='allergies' id='allergies' value={Allergy || trig9 ? Allergy : setter9(patientInfo.Allergy)} placeholder='Allergies' onChange={e => {
                            if(e.target.value === ""){
                                setTrig9(true)
                            }
                            setAllergy(e.target.value)
                        } }></textarea>
                     </div> 
                     <div className={styles.buttons}>
                        <button type="reset" className={styles.Button1} onClick={() => router.back()}>Cancel</button>
                        <button type="submit" className={styles.Button2}>Save</button>
                     </div>
               </div>
           </div>
        </form>
      </div>
      }
    </div>

  )
}



export default Identification