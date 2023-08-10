import { Link } from 'react-router-dom';
import { useState } from 'react';

import AccountCreated from './AccountCreated';
import LoadingSpinner from '../../loadingspinner/LoadingSpinner';
interface User {
  email: string;
  password: string;
  confirmPassword: string;
  userName: string;
}

interface UserError {
  status: string;
  message: string;
  problemField?: string;
}

const SignUp = () => {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
  });
  //validators
  const [userName, setUserName] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [accountCreated, setAccountCreated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  //helper functions

  const validator = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoading(true);
    let isValid: boolean = true;
    if (user.email.length === 0) {
      setEmail(true);
      isValid = false;
    }
    if (user.password.length === 0) {
      setPassword(true);
      isValid = false;
    }
    if (
      user.confirmPassword.length === 0 ||
      user.confirmPassword !== user.password
    ) {
      setConfirmPassword(true);
      isValid = false;
    }
    if (user.userName.length === 0) {
      setUserName(true);
      isValid = false;
    }

    try {
      let response = await fetch('/api/v1/user/signup', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      let data = await response.json();
      if (data.status === 'fail') throw new Error(data.message);

      setUser({ email: '', password: '', confirmPassword: '', userName: '' });
      setAccountCreated(true);
      setTimeout(() => setAccountCreated(false), 3000);
    } catch (err) {
      let message: string = '';
      if (err instanceof Error) message = err.message;

      if (message.split(' ')[0] === 'email') setEmail(true);
      if (message.split(' ')[0] === 'userName') setUserName(true);
      if (message.split(' ')[0] === 'password') setPassword(true);
      if (message.split(' ')[0] === 'confirmPassword') setConfirmPassword(true);

      setError(message);
      setTimeout(() => setError(null), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="wrapper fadeInDown bg-emerald-400">
      <div id="formContent">
        {/* <!-- Tabs Titles --> */}
        <Link to="/Login" className="heading2 inactive underlineHover">
          {' '}
          Sign In{' '}
        </Link>
        <h2 className="heading2 active">Sign Up </h2>

        {/* <!-- Icon --> */}
        {/* <div className="fadeIn first">
        <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
      </div> */}

        {/* <!-- Login Form --> */}
        <form style={{ filter: loading ? 'opacity(30%)' : '' }}>
          <input
            type="text"
            onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
              event.target.setAttribute('autocomplete', 'off');
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser((prev) => {
                return { ...prev, userName: e.target.value };
              })
            }
            onClick={() => setUserName(false)}
            style={{ borderBottom: `${userName ? '2px solid red' : ''}` }}
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="user-name"
            value={user.userName}
          />

          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
            onClick={() => setEmail(false)}
            style={{ borderBottom: `${email ? '2px solid red' : ''}` }}
            id="login"
            className="fadeIn third"
            name="login"
            placeholder="email@example.com"
            value={user.email}
          />

          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
            onClick={() => setPassword(false)}
            style={{ borderBottom: `${password ? '2px solid red' : ''}` }}
            id="password"
            className="fadeIn fourth"
            name="login"
            placeholder="password"
            value={user.password}
          />

          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser((prev) => {
                return { ...prev, confirmPassword: e.target.value };
              })
            }
            onClick={() => setConfirmPassword(false)}
            style={{
              borderBottom: `${confirmPassword ? '2px solid red' : ''}`,
            }}
            id="confirmPassword"
            className="fadeIn fifth"
            name="login"
            placeholder="confirm password"
            value={user.confirmPassword}
          />
          <input
            type="submit"
            onClick={validator}
            className="fadeIn sixth"
            value="Sign Up"
          />
        </form>
        {error && <p className="text-red-500 mb-2">{error}</p>}
      </div>
      {accountCreated && <AccountCreated></AccountCreated>}
      {loading && <LoadingSpinner></LoadingSpinner>}
    </div>
  );
};
export default SignUp;
