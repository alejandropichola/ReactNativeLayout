import Firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyCqpAYDZdmdmkSSQfX4K8G9H4-6WZ0T11g',
  authDomain: 'myapp-b0167.firebaseapp.com',
  databaseURL: 'https://myapp-b0167.firebaseio.com',
  projectId: 'myapp-b0167',
  storageBucket: 'myapp-b0167.appspot.com',
  messagingSenderId: '164289057221',
  appId: '1:164289057221:web:7622d22fc7fe0bb5'
}

let app = Firebase.initializeApp(config)

export const db = app.database()
