import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyDAkNHTRRHdmKNhwCd72qOID_MRvLZhtDk",

	authDomain: "photoshare-3b86d.firebaseapp.com",

	projectId: "photoshare-3b86d",

	storageBucket: "photoshare-3b86d.appspot.com",

	messagingSenderId: "473189242913",

	appId: "1:473189242913:web:4f3826b38c0d3039f5ab60",
};
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
