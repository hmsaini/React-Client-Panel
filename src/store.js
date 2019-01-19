import {createStore,combineReducers,compose} from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import {reactReduxFirebase,firebaseReducer} from 'react-redux-firebase';
import {reduxFirestore,firestoreReducer} from 'redux-firestore';
// Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig={
    apiKey: "AIzaSyDiQfVu3aYtjVV7QON47Zs71_YOqy_hYr4",
    authDomain: "reactclientpanel-a5c95.firebaseapp.com",
    databaseURL: "https://reactclientpanel-a5c95.firebaseio.com",
    projectId: "reactclientpanel-a5c95",
    storageBucket: "reactclientpanel-a5c95.appspot.com",
    messagingSenderId: "310731931719"
}

// react-redux-firebase config
const rrfConfig={
    userProfile:'users',
    userFirestoreForProfile:true, // Firestore for profile instead of Realtime DB
    logErrors:false
}

// Init firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
const firestore=firebase.firestore();
const settings={timestampsInSnapshots:true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase=compose(
    reactReduxFirebase(firebase,rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase)  // <- needed if using firestore
)(createStore);

const rootReducer=combineReducers({
    firebase:firebaseReducer,
    firestore:firestoreReducer, // <- needed if using firestore
    notify:notifyReducer,
    settings: settingsReducer
});

// Check for settings in localStorage
if (localStorage.getItem('settings') == null) {
    // Default settings
    const defaultSettings = {
      disableBalanceOnAdd: true,
      disableBalanceOnEdit: false,
      allowRegistration: false
    };
  
    // Set to localStorage
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
  }
  
// Create initial state
const initialState={ settings: JSON.parse(localStorage.getItem('settings'))};

// Create store
const store=createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
reactReduxFirebase(firebase),
// window.__REDUX_DEVTOOLS_EXTENSION__ &&
// window.__REDUX_DEVTOOLS_EXTENSION__()

)
);


export default store;

