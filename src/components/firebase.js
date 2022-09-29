// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage, deleteObject, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBW6m5RDKm7xucy_bzKxj1-gNoCEAQ46wc",
//   authDomain: "travelbuddy-91135.firebaseapp.com",
//   projectId: "travelbuddy-91135",
//   storageBucket: "travelbuddy-91135.appspot.com",
//   messagingSenderId: "186179077506",
//   appId: "1:186179077506:web:144d375d34f634076b7b9b",
//   measurementId: "G-ZVV645XR0E",
// };

//Back Up GEAR

const firebaseConfig = {
  apiKey: "AIzaSyCgGXuCf3brgrjgS222q5qz7nuDmp175RM",
  authDomain: "gear-41f0e.firebaseapp.com",
  projectId: "gear-41f0e",
  storageBucket: "gear-41f0e.appspot.com",
  messagingSenderId: "591782560876",
  appId: "1:591782560876:web:23404ef60f6f195b4c0449",
  measurementId: "G-KR481CGYJR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Connects Storage to db
export const storage = getStorage(app);

// deletes Storage images when "delete storage" is a message ***Does not work
// export const deleteStorage = () => {
//   const desertRef = ref(storage, 'images/');

//   // Delete the file
//   deleteObject(desertRef).then(() => {
//     console.log('File deleted successfully')
//   }).catch((error) => {
//     console.log("No go:", error)
//   });
// }
