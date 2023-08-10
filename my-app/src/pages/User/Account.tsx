import { FaRegEnvelope, FaUserTie, FaLock } from 'react-icons/fa';
import { useAppSelector } from '../../store';
import { Link } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './NavBar';

const Account = () => {
  const token = useAppSelector(state => state.token);
  const navigate = useNavigate();

  useEffect(()=>{
    if(token.value === '')
      navigate('/login');
  }, [])

  const [changeClicked, setChangeClicked] = useState<boolean>(false);
  const user = useAppSelector((state) => state.user);

  return (
    <div className="h-full">
      <div className="nav text-xs bg-green-600 text-white font-semibold">
        <Navbar></Navbar>
      </div>
      <div className="content xs:mt-8 sm:h-full flex items-center justify-center">
        <article className="sm:w-1/2">
          <h1 className="text-center text-xl sm:-translate-y-12 sm:text-3xl sm:-translate-x-16">
            Profile
          </h1>
          <div className="info">
            {/*  */}
            <section className=" space-y-8 xs:text-xs">
              <div className="container space-y-2">
                <label
                  htmlFor="Email "
                  className="sm:block sm:w-full  sm:text-center font-semibold"
                >
                  Email
                </label>

                <div className="bg-gray-100  h-8 flex items-center p-2 space-x-4 rounded-lg">
                  <span className="text-xl text-green-700 sm:basis-1/4">
                    <FaRegEnvelope></FaRegEnvelope>
                  </span>
                  <p className="justify-self-center sm:basis-3/4 xs:w-48  rounded-lg text-center bg-blue-100 xs:p-1">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="container">
                <label
                  htmlFor="userName"
                  className="sm:block sm:w-full  sm:text-center font-semibold"
                >
                  user-name
                </label>

                <div className="bg-gray-100  h-8 flex items-center p-2 space-x-4 rounded-lg">
                  <span className="text-xl text-blue-700 sm:basis-1/4">
                    <FaUserTie></FaUserTie>
                  </span>
                  <p className="basis-3/4 bg-red-100 text-center rounded-lg xs:p-1">
                    {user.userName}
                  </p>
                </div>
              </div>

              <div className="container">
                <label
                  htmlFor="Email"
                  className="sm:block sm:w-full  sm:text-center font-semibold"
                >
                  password
                </label>

                <div className="bg-gray-100  h-8 flex items-center p-2 space-x-4 rounded-lg">
                  <span className="text-xl text-red-700 sm:basis-1/4">
                    <FaLock></FaLock>
                  </span>
                  <p className="basis-3/4 bg-orange-100 rounded-lg text-center align-text-bottom xs:p-1 ">
                    **********
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="button sm:w-3/4 mt-4 space-y-2">
            <Link
              to="/user/changepassword"
              className="bg-blue-500 rounded-xl text-white text-sm  p-2 text-center block mx-auto hover:bg-blue-300"
              onClick={() => setChangeClicked(true)}
            >
              Change Password
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};
export default Account;
