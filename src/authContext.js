import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, updateEmail, updatePassword } from 'firebase/auth'
import { auth } from '../src/firebase'
import styles from '../styles/Home.module.css'

import BounceLoader from "react-spinners/BounceLoader";

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [userUID, setUserUID] = useState()
  const [userName, setUserName] = useState()
  console.log("User ", currentUser)
  console.log("UID ", userUID)
  console.log("Display Name ", userName)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUserUID(user.uid)
        setCurrentUser(user)
        setUserName(user.displayName)
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
  
  return (
    <AuthContext.Provider value={{ updateDisplayName, updateUserEmail, updateUserPass, currentUser, login, signup, logout, userUID, resetPassword, userName }}>
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
