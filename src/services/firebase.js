import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2dgNgKnCnEPYi-EEW-REMdvxfTasvlMQ",
  authDomain: "hackathon-project-5134f.firebaseapp.com",
  projectId: "hackathon-project-5134f",
  storageBucket: "hackathon-project-5134f.firebasestorage.app",
  messagingSenderId: "876931286188",
  appId: "1:876931286188:web:dbc992887418e08bcc8b09"
};

const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);