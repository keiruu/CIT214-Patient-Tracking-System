import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../src/firebase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  console.log("User ", currentUser)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
      setCurrentUser(null)
      await signOut(auth)
  }
  
  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
