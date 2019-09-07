import firebase from 'firebase'
import Rebase from 're-base'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCsNb6MxjP39bh-td5cFhbK90wX1wOcx58",
    authDomain: "bancoacademia.firebaseapp.com",
    databaseURL: "https://bancoacademia.firebaseio.com",
    projectId: "bancoacademia",
    storageBucket: "bancoacademia.appspot.com",
    messagingSenderId: "607333573958"
}

const app = firebase.initializeApp(config)

const base = Rebase.createClass( app.database() )

const auth = firebase.auth()

export { auth, base }