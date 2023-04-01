// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDAkNHTRRHdmKNhwCd72qOID_MRvLZhtDk",

	authDomain: "photoshare-3b86d.firebaseapp.com",

	projectId: "photoshare-3b86d",

	storageBucket: "photoshare-3b86d.appspot.com",

	messagingSenderId: "473189242913",

	appId: "1:473189242913:web:4f3826b38c0d3039f5ab60",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
