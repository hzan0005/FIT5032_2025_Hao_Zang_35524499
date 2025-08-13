// src/firebase.js

import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDUre2wj2xwbnpAHUGFNIoprudkRcIeM-A",
  authDomain: "fit5032-ass-38415.firebaseapp.com",
  projectId: "fit5032-ass-38415",
  storageBucket: "fit5032-ass-38415.appspot.com",  // ✅ 注意：你原来这里拼错了 `.app` ❌
  messagingSenderId: "193750156178",
  appId: "1:193750156178:web:c4b1c89a6e477369bc374b"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
