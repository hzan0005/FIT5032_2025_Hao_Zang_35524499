// src/Firebase/init.js

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBPDUthN2YNTnGKUTO5Hsd25a6Bh149bh4",
  authDomain: "fit5032-webapp.firebaseapp.com",
  projectId: "fit5032-webapp",
  storageBucket: "fit5032-webapp.appspot.com",
  messagingSenderId: "483810264972",
  appId: "1:483810264972:web:2be0cc9e6f26343746b8a9"
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
