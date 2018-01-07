import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyBc9nXTtXvHpmY7mjV-QE9lCPstvv7DDuk",
  authDomain: "fourteenerschecklist.firebaseapp.com",
  databaseURL: "https://fourteenerschecklist.firebaseio.com",
  projectId: "fourteenerschecklist",
  storageBucket: "",
  messagingSenderId: "562447019997"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
//export const db = firebase.database();

export default firebase;
