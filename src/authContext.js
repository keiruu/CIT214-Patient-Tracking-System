import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, updateEmail, updatePassword } from 'firebase/auth'
import { auth } from '../src/firebase'
import styles from '../styles/Home.module.css'
import { getDocs, collection, getFirestore, query, where, doc, getDoc  } from 'firebase/firestore';
import BounceLoader from "react-spinners/BounceLoader";

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userUID, setUserUID] = useState()
  const [userName, setUserName] = useState()
  const [patientData, setPatientData] = useState([{}])
  const [followupData, setFollowupData] = useState([{}])
  const [patients, setPatients] = useState([{}])
  const [patient, setPatient] = useState()

  console.log("User ", currentUser)
  console.log("UID ", userUID)
  console.log("Display Name ", userName)
  console.log("patientData ", patientData)
  console.log("Patients ", patients)
  console.log("Patient ", patient)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUserUID(user.uid)
        setCurrentUser(user)
        setUserName(user.displayName)
        getData()
        getFollowup()
        getAllPatients()
      } else {
        setCurrentUser(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const user = auth.currentUser
      console.log("cur", user)
      updateProfile(user, {
        displayName: name,
      })
      return currentUser
      }
    ).catch(error => {
      return error
    })
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
    .catch(error => {
      return "error"
    })
  }

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
    .catch(error => {
      return error
    })
  }

  const logout = async () => {
    setLoading(true)
    setCurrentUser(null)
    setUserUID(null)
    setUserName(null)
    await signOut(auth)
    setLoading(false)
  }

  const updateDisplayName = (name) => {
    return updateProfile(currentUser, {
      displayName: name,
    })
  }

  const updateUserEmail = (email) => {
    return updateEmail(currentUser, email)
  }

  const updateUserPass = (password) => {
    return updatePassword(currentUser, password)
  }
  
  const getData = async () => {
    const db = getFirestore()
    const q = query(collection(db, 'patientInfo'))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc)=>({
        ...doc.data(), id:doc.id
    }))
    data.map(async (element)=>{
      const diagnosisQ = query(collection(db, `patientInfo/${element.id}/diagnosis`))
      const diagnosisDetails = await getDocs(diagnosisQ)
      const diagnosisInfo = diagnosisDetails.docs.map((doc)=>({
          ...doc.data(),
            id:doc.id
      }))
      // console.log(diagnosisInfo);
      console.log("length", diagnosisInfo.length)

      if(diagnosisInfo.length > 0) {
        setPatientData(diagnosisInfo)

        return patientData
      } 
    })
  }

  const getFollowup = async () => {
    const db = getFirestore()
    const q = query(collection(db, 'patientInfo'))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc)=>({
        ...doc.data(), id:doc.id
    }))
    data.map(async (element)=>{
      const diagnosisQ = query(collection(db, `patientInfo/${element.id}/diagnosis`), where('followup', '==', true));
      // const diagnosisQ = query(collection(db, `patientInfo/${element.id}/diagnosis`))
      const diagnosisDetails = await getDocs(diagnosisQ)
      const diagnosisInfo = diagnosisDetails.docs.map((doc)=>({
          ...doc.data(),
            id:doc.id
      }))
      // console.log(diagnosisInfo);
      console.log("length", diagnosisInfo.length)

      if(diagnosisInfo.length > 0) {
        setFollowupData(diagnosisInfo)

        return followupData
      } 
    })
  }

  const getAllPatients = async () => {
    const db = getFirestore()
    const q = query(collection(db, 'patientInfo'))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc)=>({
        ...doc.data(), id:doc.id
    }))
    // data.map(async (element)=>{
    //   const diagnosisQ = query(collection(db, `patientInfo/${element.id}/`));
    //   // const diagnosisQ = query(collection(db, `patientInfo/${element.id}/diagnosis`))
    //   const diagnosisDetails = await getDocs(diagnosisQ)
    //   const diagnosisInfo = diagnosisDetails.docs.map((doc)=>({
    //       ...doc.data(),
    //         id:doc.id
    //   }))
      // console.log(diagnosisInfo);
      console.log("length", data.length)

      if(data.length > 0) {
        setPatients(data)

        return patients
      } 
    // })
  }

  const getPatient = async (id) => {
    const db = getFirestore()
    const q = query(collection(db, 'patientInfo'), where ('id', '==', id))
    const docRef = doc(db, 'patientInfo', id);
    const snapshot = await getDoc(docRef)

    console.log("doc data ", snapshot.data())
    setPatient(snapshot.data())
    return snapshot.data()
  }
  
  

  return (
    <AuthContext.Provider value={{ getPatient, patient, patients, followupData, getData, patientData, setPatientData, updateDisplayName, updateUserEmail, updateUserPass, currentUser, login, signup, logout, userUID, resetPassword, userName }}>
        {loading ? 
            <div className={styles.loader}>
                <BounceLoader color="#6C71F8" loading={loading} size={105} css={ 
                {
                    margin: '0 auto',
                    color: '#6C71F8',
                }
                } 
                />
            </div>
        : children}
    </AuthContext.Provider>
  )
}
