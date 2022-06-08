import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../src/firebase'
import styles from '../styles/Home.module.css'

import BounceLoader from "react-spinners/BounceLoader";

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userUID, setUserUID] = useState()
  console.log("User ", currentUser)
  console.log("ayambot ", userUID)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUserUID(user.uid)
        setCurrentUser(user)
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
      const user = auth.currentUser;
        user.updateProfile({
          displayName: name,
        })
        return user;
      }
    ).catch(error => {
      console.log(error.message)
    })
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setLoading(true)
    setCurrentUser(null)
    setUserUID(null)
    await signOut(auth)
    setLoading(false)
  }
  
  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout,userUID }}>
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
