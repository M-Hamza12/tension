import { motion } from 'framer-motion';
import { useState,useEffect } from 'react';
import { useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';
interface Data {
  password: string;
  confirmPassword: string;
  changePassword: string;
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.token);

  const [loading , setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [changePassword, setChangePassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if(token.value === '')
      navigate('/login');
  },[])

  const handleSubmit = async () => {
    if (
      password.length === 0 ||
      changePassword.length === 0 ||
      confirmPassword.length === 0
    ) {
      setError('Please fill out all fields');
      setTimeout(() => setError(null), 2000);
      return;
    }
    if (changePassword !== confirmPassword) {
      setError('password are not same');
      setTimeout(() => setError(null), 3000);
      return;
    }
    try {
      setLoading(true);
      const inputData: Data = { password, confirmPassword, changePassword };
      const response = await fetch('/api/v1/user/changepassword', {
        method: 'POST',
        body: JSON.stringify(inputData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      });
      let data = await response.json();
      navigate('/user/account');
    } catch (error) {
    }
    setLoading(false);
  };

  return (
    <div className="h-full grid items-center justify-center" style={{ filter: loading ? 'opacity(30%)' : '' }}>
      <form className="space-y-4 ">
        <h1 className="text-2xl font-semibold text-center xs:text-xl">
          Change Password
        </h1>
        <motion.input
          type="password"
          initial={{ translateX: '-200px' }}
          animate={{ translateX: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          placeholder="current password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          className="w-3/4 bg-gray-100 text-lg text-center rounded-xl p-2 w-96 block xs:w-64 xs:mx-auto xs:text-sm"
        />
        <motion.input
          type="password"
          initial={{ translateX: '-200px' }}
          animate={{ translateX: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          placeholder="changed password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setChangePassword(e.target.value);
          }}
          className="w-3/4 bg-gray-100 text-lg text-center rounded-xl p-2 w-96 block xs:w-64 xs:mx-auto xs:text-sm"
        />
        <motion.input
          initial={{ translateX: '-200px' }}
          animate={{ translateX: 0 }}
          transition={{
            duration: 1,
            delay: 0.6,
          }}
          type="password"
          placeholder="confirm password"
          className="w-3/4 bg-gray-100 text-lg text-center rounded-xl p-2 w-96 block xs:w-64 xs:mx-auto xs:text-sm"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setConfirmPassword(e.target.value)
          }
        />
        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        <button
          type="button"
          className="block mx-auto bg-blue-600 p-2 rounded-full text-sm text-white hover:bg-blue-200 w-full"
          onClick={handleSubmit}
        >
          Change Password
        </button>
      </form>
    </div>
  );
};
export default ChangePassword;
