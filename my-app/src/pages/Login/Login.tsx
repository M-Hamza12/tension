import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import LoadingSpinner from '../../loadingspinner/LoadingSpinner';
import { setToken } from '../../tokenSlice';

type Props = {
  setLogin: (login: boolean) => void;
};
interface User {
  email: string;
  password: string;
}

const Login = ({ setLogin }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const token = useAppSelector((state) => state.token);

  const [user, setUser] = useState<User>({ email: '', password: '' });

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // dispatch(setToken({ token: '' }));
  }, []);

  const validator = async (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoading(true);
    console.log(user);
    let isValid: boolean = true;
    if (user.email.length === 0) {
      setEmail(true);
      isValid = false;
    }
    if (user.password.length === 0) {
      setPassword(true);
      isValid = false;
    }

    if (!isValid) {
      setLoading(false);
      setErrorMessage('All fields are required');
      setIsError(true);
      setTimeout(() => {
        setErrorMessage(null);
        setIsError(false);
      }, 2000);
      return;
    }

    try {
      let response = await fetch('/api/v1/user/signin', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      let data = await response.json();
      if (data.status === 'fail') throw new Error(data.message);
      console.log(data);
      dispatch(setToken({ token: data.token }));
      setUser({ email: '', password: '' });
      console.log('setting loggin');
      setLogin(true);
      navigate('/user/overview');
    } catch (error) {
      let message: string = '';
      if (error instanceof Error) message = error.message;
      setErrorMessage(message);
      setIsError(true);
      setTimeout(() => {
        setErrorMessage(null);
        setIsError(false);
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <div className="wrapper fadeInDown bg-rose-400">
      <div id="formContent">
        {/* <!-- Tabs Titles --> */}
        <h2 className="active heading2"> Sign In </h2>
        <Link to="/signup" className="inactive underlineHover heading2">
          Sign Up{' '}
        </Link>

        {/* <!-- Icon --> */}
        {/* <div className="fadeIn first">
        <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
      </div> */}

        {/* <!-- Login Form --> */}
        <form style={{ filter: loading ? 'opacity(30%)' : '' }}>
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
            onClick={() => setEmail(false)}
            id="login"
            style={{ borderBottom: `${email ? '2px solid red' : ''}` }}
            className={`fadeIn second `}
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
            id="password"
            style={{ borderBottom: `${password ? '2px solid red' : ''}` }}
            className="fadeIn third"
            name="login"
            placeholder="password"
            value={user.password}
          />
          <input
            onClick={validator}
            type="submit"
            className="fadeIn fourth"
            value="Log In"
          />
          {isError && <p className="text-red-500">{errorMessage}</p>}
        </form>

        {/* <!-- Remind Passowrd --> */}
        {/* <div id="formFooter">
          <Link to={'/forgotpassword'} className="underlineHover anchor">
            Forgot Password?
          </Link>
        </div> */}
      </div>
      {loading && <LoadingSpinner></LoadingSpinner>}
    </div>
  );
};
export default Login;
