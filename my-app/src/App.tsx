import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//Components
import Home from './pages/Home/Home';
import Logo from './Logo/Logo';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Overview from './pages/User/Overview';
import CreateWorkout from './pages/User/CreateWorkout';
import MyWorkout from './pages/User/MyWorkout';
import Account from './pages/User/Account';
import ChangePassword from './pages/User/ChangePassword';
import StartWorkout from './pages/User/StartWorkout';
function App() {
  let [login, setLogin] = useState<boolean>(false);
  console.log('login : ', login);
  return (
    <div className="App h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Logo></Logo>}></Route>
          <Route path="/home" element={<Home setLogin={setLogin} />}></Route>
          <Route path="/Login" element={<Login setLogin={setLogin} />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/user/overview" element={<Overview></Overview>}></Route>
          <Route
            path="/user/createworkout"
            element={<CreateWorkout></CreateWorkout>}
          >
          </Route>
          <Route
            path="/user/myworkout"
            element={<MyWorkout></MyWorkout>}
          ></Route>
          <Route path="/user/account" element={<Account></Account>}></Route>
          <Route
            path="/user/changepassword"
            element={<ChangePassword></ChangePassword>}
          ></Route>
          <Route path='/:title/startworkout' element={<StartWorkout></StartWorkout>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
