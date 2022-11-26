import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDSa1uLFSz6RoHMnFOyNHIEorfRb0fMydw",
    authDomain: "discord-23.firebaseapp.com",
    projectId: "discord-23",
    storageBucket: "discord-23.appspot.com",
    messagingSenderId: "775545576091",
    appId: "1:775545576091:web:f879a49977414203a6043e"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider }
export default db;