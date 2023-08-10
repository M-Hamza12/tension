import { useEffect,useState } from "react";
import { useAppSelector,useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";

import Navbar from "./NavBar";
import LoadingSpinner from "../../loadingspinner/LoadingSpinner";
import image1 from './workoutimages/image7.jpg'
import image2 from './workoutimages/image6.jpg'
import image3 from './workoutimages/image3.jpg'
import { setStartExercise } from "../../slice/exerciseSlice";

interface Exercise {
  bodyPart: string;
  gifUrl: string;
  equipment: string;
  id: string;
  name: string;
  target: string;
  sets : number;
  reps : number;
}

interface UserData {
  day : string;
  title : string;
  __v : number;
  _id : string;
  exercises : Exercise [],
}

let images = [image1,image2,image3];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday","Saturday"] 

const MyWorkout = () => {
  const token = useAppSelector(state => state.token);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [loading , setLoading ] = useState<boolean>(false);
  const [userData , setUserData] = useState<UserData[]>([]);
  const [day ,setDay] = useState<string>('');
  const [selected , setSelected ] = useState<string>('');

  console.log(userData);
  console.log(selected);
//  console.log(day === userData[0].day, '?');

  const fetchData = async () => {
    try{
      setLoading(true);
      let response = await fetch('/api/v1/exercise/getallworkout', {
        method : 'GET',
        headers: {
        Authorization: `Bearer ${token.value}`,
      },
      })
      let data = await response.json();
      if(data.status === 'fail')
        throw new Error('Something went wrong');
      setUserData(data.data);
      console.log(data);
    } catch(error){
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if(token.value === '')
      navigate('/login');
    setDay(days[new Date().getDay()]);
    fetchData();
  },[])

  const deleteWorkout = async() => {
    try{
      let response = await fetch('/api/v1/exercise/deleteworkout',{
        method : 'DELETE',
        body : JSON.stringify({id : selected}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token.value}`,
        },
      })
      console.log(response , 'response');
      fetchData();
    }catch(error){
      console.log('error ', error);
    }
  }
  const startWorkout = () => {
    const startExercise = userData.find(el => el._id === selected);
    if(!startExercise){
      return console.log('error***');
    }
    dispatch(setStartExercise({ex : startExercise}))
    navigate(`/${startExercise.title}/startworkout`)
  }
  //If there are no wokrous
  if(!loading && userData.length === 0 ){
    return <div className="h-full bg-black">
      <div className="text-xs bg-black text-white"><Navbar></Navbar></div>
      <div className="grid items-center" style={{height : '70vh'}}>
        <p className="text-red-500 text-center uppercase">Currently there are no workouts</p>
      </div>
    </div>
  }

  return <div className={loading ? 'h-full flex items-center justify-center' : 'bg-black h-screen'}>
    {loading && <LoadingSpinner></LoadingSpinner>}
    {!loading && <div className="text-xs bg-black text-white"><Navbar></Navbar></div>}
    {!loading && <div>
      <h1 className="font-bold text-2xl text-white text-center">HI, {user.userName.toUpperCase()}</h1>  
      <p className="font-bold text-lg text-white text-center">Total Workout: <span className="text-orange-500">{userData.length}</span></p>
      <div className=" rounded-lg p-1 mt-8 lg:w-1/2 mx-auto">
          <h1 className="text-lg font-bold text-center text-white">Today Wokrout</h1>
          {/* Today Wokrout */}
          <ul className="text-center font-semibold">{day === 'Sunday' ? 'Today is rest day' : userData.filter(el => el.day === 'Monday').length === 0 ? <li className="text-sm">THERE IS NO WORKOUT TODAY</li> : userData.map((el,index) => {
            if(el.day === day){
              return <li key={index} className={`rounded-full my-4  ${index % 2 ? 'bg-lime-300' : 'bg-yellow-300'}`}>
                {el.title}
              </li>
            }
          })}</ul>
      </div>
      {/* buttons */}
      {selected.length > 0 && <div className="buttons flex justify-center space-x-4">
        <button className="bg-red-500 p-1 rounded-full w-1/2 text-white hover:bg-red-200 sm:w-1/4" onClick={startWorkout}>Start</button>
        <button className="bg-blue-500 p-1 rounded-full w-1/2 text-white hover:bg-blue-200 sm:w-1/4" onClick={deleteWorkout}>Remove</button>
        </div>}
      {/* Workout List */}
      <ul className="mt-4 sm:grid sm:grid-cols-2 sm:font-semibold bg-black">
        {userData.map((el,index) => {
          return <li key={index} className={`mt-4 sm:mr-8 grid grid-cols-2 border-2 border-black hover:scale-105 hover:cursor-pointer p-1 ${selected === el._id ? 'border-t-2 border-white' : ''}`} onClick={(e:React.MouseEvent<HTMLLIElement>) => {
            setSelected(el._id);
          }}>
            <div className="image">
              <img src={images[index % 3]} alt="GIF OF SHOWING THE EXERCISE" loading="lazy" />
            </div>
            <div className="content p-1 xs:text-sm self-center">
              <section className=" space-y-2">
              <h1 className={`text-center font-semibold ${day === el.day ? 'text-green-600' : 'text-white'}`}>{el.title.toUpperCase()}</h1>
              <div className="flex justify-center space-x-4 ">
                <div className="bg-yellow-300 rounded-full w-1/2 text-center ">Exercises</div>
                <div className="bg-red-300 w-1/2 rounded-full text-center">{el.exercises.length}</div>
              </div>
              <div className="flex justify-center space-x-4">
                <div className="bg-yellow-300 rounded-full w-1/2 text-center">Sets</div>
                <div className="bg-red-300 w-1/2 rounded-full text-center">{el.exercises.reduce((total , el) => {
                  return total + el.sets;
                },0)}</div>
              </div>
              <div className="flex justify-center space-x-4">
                <div className="bg-yellow-300 rounded-full w-1/2 text-center">Reps</div>
                <div className="bg-red-300 w-1/2 rounded-full text-center">{el.exercises.reduce((total , el) => {
                  return total + el.reps;
                },0)}</div>
              </div>
              </section>
            </div>
          </li>
        })}
      </ul>
      </div>}
  </div>;
};
export default MyWorkout;
