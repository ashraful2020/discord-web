import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Chat from './Components/Chat/chat';
import Login from './Components/Authentication/login';
import Sidebar from './Components/Sidebar/sidebar';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebaseConfig';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log(authUser)
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          email: authUser.email,
          photo: authUser.photoURL,
          displayName: authUser.displayName
        }))
      }
      else dispatch(logout())
    })
  }, [dispatch]);
  return (
    <div className="App">
      {
        user ? <>
          <Sidebar />
          <Chat />
        </> : <Login />

      }
    </div>
  );
}

export default App;
