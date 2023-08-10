import { useAppSelector, useAppDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../loadingspinner/LoadingSpinner';
import { setUser } from '../../slice/userSlice';
import { motion } from 'framer-motion';
import Navbar from './NavBar';
import './overview.css';
interface User {
  email: string;
  id: string;
  userName: string;
}
const Overview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const token = useAppSelector((state) => state.token);
  const curentUser = useAppSelector((state) => state.user);
  console.log('Token', token);
  const dispatch = useAppDispatch();
  console.log(token);
  useEffect(() => {
    const Auth = async () => {
      setLoading(true);
      try {
        let response = await fetch('/api/v1/user/overview', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        let data = await response.json();
        console.log(data);

        if (data.status === 'fail') {
          setTimeout(()=> navigate('/login'),2000);
          throw new Error('Login Timed out')
        };

        const { email, _id, userName } = data.data.user;
        let user: User = { email: email, id: _id, userName: userName };
        dispatch(setUser({ user }));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) setError(error.message);
        else setError('Something went wrong');
      }
    };
    try {
      Auth();
    } catch (err) {
      console.log(err);
      // setTimeout(()=> navigate('/signin'),2000);
    }
  }, []);

  return (
    <div
      className={
        loading || error
          ? 'h-full flex items-center justify-center'
          : 'h-full overviewBackground'
      }
    >
      {loading && <LoadingSpinner></LoadingSpinner>}
      {error && <div>{error}</div>}

      {!(loading || error) && (
        <article className="h-full text-xs text-stone-50">
          {/* <nav>
            <ul className="flex justify-center space-x-4 p-4">
              <Link to={'/user/overview'}>Overview</Link>
              <Link to={'/user/myworkout'}>MyWorkout</Link>
              <Link to={'/user/createworkout'}>CreateWorkout</Link>
              <Link to={'/user/account'}>Account</Link>
            </ul>
          </nav> */}
          <Navbar></Navbar>
          <h1 className="text-xl uppercase text-center text-orange-300">
            welcome to Tension App<br></br>
            <motion.span
              className="text-stone-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 2,
                delay: 0.5,
              }}
            >
              {curentUser.userName}
            </motion.span>
          </h1>
          <div className="content flex items-center text-center justify-center h-5/6">
            <section className="mx-auto w-full mt-8 sm:mt-16">
              <h3 className="text-xl text-green-700 font-semibold mx-auto">
                Are You Ready
              </h3>
              <h1 className="text-2xl uppercase text-stone-50 p-2 mx-auto">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2 }}
                >
                  To
                </motion.span>{' '}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.3 }}
                >
                  get
                </motion.span>{' '}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.6 }}
                >
                  fIt
                </motion.span>{' '}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 3.1 }}
                >
                  and
                </motion.span>{' '}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 3.4 }}
                >
                  motivated!
                </motion.span>{' '}
              </h1>
            </section>
          </div>
        </article>
      )}
    </div>
  );
};

export default Overview;
