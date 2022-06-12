import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, updateEmail, updatePassword } from 'firebase/auth'
import { auth } from '../src/firebase'
import styles from '../styles/Home.module.css'
import { getDocs, collection, getFirestore, query, where, doc, getDoc, deleteDoc  } from 'firebase/firestore';
import BounceLoader from "react-spinners/BounceLoader";
import { useRouter } from 'next/router';

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
  const [patientDiagnosisHistory, setPatientDiagnosisHistory] = useState()
  const router = useRouter()
  let eventArray = [{}]
  // console.log("User ", currentUser)
  // console.log("UID ", userUID)
  // console.log("Display Name ", userName)
  // console.log("patientData ", patientData)
  // console.log("Patients ", patients)
  // console.log("Patient ", patient)
  console.log("Patient HISTORY ", patientDiagnosisHistory)
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUserUID(user.uid)
        setCurrentUser(user)
        setUserName(user.displayName)
        getData()
        getFollowup()
        getAllPatients()
        if(router.asPath.split("/").length > 2){
          const route = router.asPath.split("/")
          const routeID = route[route.length-1]
          getPatientDiagnosisHistory(routeID)
          getParentDoc()
        }
      
      } else {
        setCurrentUser(null)
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // useEffect(() => {
  //   if(router.asPath.split("/").length > 2){
  //     const route = router.asPath.split("/")
  //     const routeID = route[route.length-1]
  //     getPatientDiagnosisHistory(routeID)
  //   }
  // }, [patientDiagnosisHistory])

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
      if(diagnosisInfo.length > 0) {
        setPatientData(diagnosisInfo)

        return patientData
      } 
    })
    // const db = getFirestore()
    // const q = query(collection(db, 'patientInfo'))
    // const snapshot = await getDocs(q)
    // const data = snapshot.docs.map((doc)=>({
    //     ...doc.data(), id:doc.id
    // }))
    // data.map(async (element)=>{
    //   const diagnosisQ = query(collection(db, `patientInfo/${element.id}/diagnosis`))
    //   const diagnosisDetails = await getDocs(diagnosisQ)
    //   const diagnosisInfo = diagnosisDetails.docs.map((doc)=>({
    //       ...doc.data(),
    //         id:doc.id
    //   }))
    //   if(diagnosisInfo.length > 0) {
    //     diagnosisInfo.map((element) => {
    //       eventArray.push(element)
    //     })
    //     eventArray.map((element) => {
    //       console.log("go ", element.date)
    //     })
    //     setPatientData(eventArray)
    //   } 
    // })
    // console.log("ARRAY ", eventArray)
    // return patientData
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
      const diagnosisDetails = await getDocs(diagnosisQ)
      const diagnosisInfo = diagnosisDetails.docs.map((doc)=>({
          ...doc.data(),
            id:doc.id
      }))

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

    if(data.length > 0) {
      setPatients(data)

      return patients
    }
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

  const getParentDoc = async (id) => {
    const db = getFirestore()
    const q = query(collection(db, 'patientInfo'))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc)=>({
        ...doc.data(), id:doc.id
    }))
    data.map(async (element)=>{
      const diagnosisQ = query(collection(db, `patientInfo/${element.id}/diagnosis`))
      const diagnosisDetails = await getDocs(diagnosisQ)
      const diagnosisInfo = diagnosisDetails.docs.map((doc)=>{
        console.log("ref path" , doc.ref.path);
        console.log("ref parent" , doc.ref.parent.parent.id);
      })
    })
  }

  const getPatientDiagnosisHistory = async (routeID) => {
    const db = getFirestore()
    const q = query(collection(db, 'patientInfo'))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc)=>({
        ...doc.data(), id:doc.id
    }))
    data.map(async (element) => {
      const diagnosisQ = query(collection(db, `patientInfo/${routeID}/diagnosis`))
      const diagnosisDetails = await getDocs(diagnosisQ)
      const diagnosisInfo = diagnosisDetails.docs.map((doc)=>({
          ...doc.data(),
            id:doc.id
      }))
      // if(diagnosisInfo.length > 0) {
      //   setPatientDiagnosisHistory(diagnosisInfo)
      //   return patientDiagnosisHistory
      // }
      setPatientDiagnosisHistory(diagnosisInfo)
      return diagnosisInfo
    })
  }   
  
  const deletePatient = async (id) => {
    const db = getFirestore()
      const q = query(collection(db, 'patientInfo'), where ('id', '==', id))
      const docRef = doc(db, 'patientInfo', id);
      const snapshot = await getDoc(docRef)

      console.log("Delete data ", snapshot.data())
      await deleteDoc(doc(db, `patientInfo/`, id));
      console.log("deleted")
  }
  

  return (
    <AuthContext.Provider value={{ deletePatient, getParentDoc, getPatientDiagnosisHistory, patientDiagnosisHistory, getPatient, patient, patients, followupData, getData, patientData, setPatientData, updateDisplayName, updateUserEmail, updateUserPass, currentUser, login, signup, logout, userUID, resetPassword, userName }}>
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
