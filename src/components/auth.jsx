import { auth, googleProvider } from "../config/firebase_config"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { useState } from "react";

export const Auth = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    console.log(auth?.currentUser?.photoURL)

    const signIn = async() => {
        try {
            await createUserWithEmailAndPassword(auth,email,password)
        } catch(err){
            console.log(err)
        }
    };

    const signInWithGoogle = async() => {
        try {
            await signInWithPopup(auth,googleProvider)
        } catch(err){
            console.log(err)
        }
    };

    const logOut = async() => {
        try {
            await signOut(auth)
        } catch(err){
            console.log(err)
        }
    };

    return(
        <div>
            <input 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Email...'
            />
            <input 
            type={'password'}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password...'
            />
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}> Sign In With Google </button>

            <button onClick={logOut}>Logout</button>
        </div>
    )

}

export default Auth