import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, deleteDoc, getDocs, collection } from 'firebase/firestore'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'

// TODO: Is this safe?
const firebaseConfig = {
    apiKey: 'AIzaSyDOjwVp0tpl9CIyGnGoO3xl86kFKyIifMU',
    authDomain: 'pecto-5f56.firebaseapp.com',
    projectId: 'pecto-5f56',
    storageBucket: 'pecto-5f56.appspot.com',
    messagingSenderId: '82014698378',
    appId: '1:82014698378:web:7618826d8460ca2fa8e673',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth()
const provider = new GoogleAuthProvider()

// READ: https://blog.logrocket.com/user-authentication-firebase-react-apps/
const authenticateWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, provider)
        const user = res.user

        console.log(user)

        await setDoc(doc(db, 'users', user.uid), {
            name: user.displayName,
            authProvider: 'google',
            email: user.email,
            uid: user.uid
        })

        // The way this app is structured we actually don't need to return information
        // Rather, it is stored in the auth variable
        // -----
        // Now that the user has been added to the database, return information
        // return {
        //     uid: user.uid,
        //     name: user.displayName,
        //     authProvider: 'google',
        //     email: user.email,
        // }
    } catch (err) {
        // it look serious
        console.error(`FATAL AUTH ERROR: ${err}`)
        alert(err.message)
    }
}

const signOutOfGoogle = async () => {
    try {
        await signOut(auth)
    } catch (err) {
        // it look serious
        console.error(`FATAL AUTH ERROR: ${err}`)
        alert(err.message)
    }
}

const addNewPack = async (id, newPack) => {
    const user = getAuth().currentUser
    const docRef = doc(db, "packs", user.displayName, "packs", id)
    await setDoc(docRef, newPack)
}

const deletePack = async (id) => {
    const user = getAuth().currentUser
    const docRef = doc(db, "packs", user.displayName, "packs", id)
    await deleteDoc(docRef)
}

const getMyPacks = async () => {
    const user = getAuth().currentUser
    let packs = []
    console.log(user)
    const userPacks = await getDocs(collection(db, "packs", user.displayName, "packs"))
    userPacks.forEach(doc => {
        packs.push(doc.data())
    })
    
    return packs
}

// For whatever reason export default doesn't work with vite in this case
export { app, db, auth, authenticateWithGoogle, signOutOfGoogle, addNewPack, deletePack, getMyPacks }
