import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.init';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import * as XLSX from 'xlsx'

export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserInfo = userInfo => {
        setLoading(true)
        return updateProfile(auth.currentUser, userInfo)
    }

    const userLogout = () => {
        setLoading(true)
        localStorage.removeItem('timeWatchAccessToken')
        return signOut(auth)
    }

    const userLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const handleExcelExport = (data, sheetName, filename) => {
        let wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, filename)
    }

    const authInfo = {
        user, 
        loading,
        auth,
        setLoading,
        createUser,
        updateUserInfo,
        userLogout,
        userLogin,
        handleExcelExport
    }
    return (
        <AuthContext.Provider value={ authInfo }>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;