import { useEffect, useState } from 'react';
import { fetchData } from '../../utils/fetchData';
import { useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';

import Navbar from './NavBar';
import BodyCard from './BodyCard';
import Exercises from './Exercises';
import Summary from './Summary';

//bodyparts icon
let bodyParts: string[] = ['shoulder', 'legs', 'back', 'chest', 'abs', 'arms'];
//interfaces
interface Exercise {
  bodyPart: string;
  gifUrl: string;
  equipment: string;
  id: string;
  name: string;
  target: string;
}
interface Trigger {
  flag : [boolean , boolean , boolean , boolean , boolean , boolean];
}
//component
const CreateWorkout = () => {
  const token = useAppSelector(state => state.token);
  const navigate = useNavigate();

  const [loading , setLoading ] = useState<boolean>(false);
  const [search, setSearch] = useState<null | string>(null);
  const [exercise, setExercise] = useState<Exercise[] | []>([]);
  const [showExercise , setShowExercise] = useState<Exercise[] | []>([]);
  const [userExercise,setUserExercise] = useState<Exercise[]> ([]);
  const [trigger , setTrigger] = useState<Trigger>({flag : [false , false, false ,false , false, false]})
  const [done , setDone ] = useState<boolean>(false);

  //fetch the data from the rapid api
  useEffect(() => {
    
    if(token.value === '')
      navigate('/login');

    setLoading(true);
    (async () => {
      let data = await fetchData('https://exercisedb.p.rapidapi.com/exercises/');
      setExercise(data);
      
      setLoading(false);
    })();
  }, []);
  const handleSearch = (s? : string) => {
    setLoading(true);
    console.log('handling');
     if (!search) {
      setLoading(false);
      return;
  };
    let query = s? s : search;
    query = query.trim();
    console.log('query',query);
    console.log(exercise , 'exercise');
    if (exercise) {
      setShowExercise(() => {
        let exercises = exercise.filter((exercise) => {
          return (
            exercise.target.toLowerCase().includes(query.toLowerCase()) || 
            exercise.name.toLowerCase().replaceAll(' ','').includes(query.toLowerCase()) || 
            exercise.equipment.toLowerCase().includes(query.toLowerCase()) ||
            exercise.bodyPart.toLowerCase().includes(query.toLowerCase())
          );
        });
        return exercises;
      });
    }
    setLoading(false);
  };
  return (
    <div style={{ filter: loading ? 'opacity(30%)' : '' }}>
      <div className='text-xs text-white bg-orange-600'><Navbar></Navbar></div>
      {!done && <section className="xs:text-xs">
        <h1 className="font-semibold text-lg text-center mt-4">
          Create Workout
        </h1>
        <input
          type=""
          className="border-2 border-green-700 block mx-auto rounded-lg p-1 w-5/6 text-center mt-4 sm:w-3/4"
          placeholder="search by name/equipment/bodypart"
          value={search ? search : ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        ></input>
        <button
          className="block mx-auto text-center rounded-full bg-blue-400 p-2 mt-4 w-1/4 text-white hover:bg-blue-600 xs:w-1/2"
          onClick={() => handleSearch()}
        >
          Search
        </button>
        {userExercise.length>0 && <button className="block mx-auto text-center rounded-full bg-red-400 p-2 mt-4 w-1/4 text-white hover:bg-red-600 xs:w-1/2" onClick={() => setDone(true)}>Done</button>}
        <h1 className="mt-8 font-semibold text-lg text-center">
          EXERCISE BY BODY PARTS
        </h1>
        {/* Body Part Icons */}
        <ul className="grid grid-cols-2  mt-4 p-2 sm:grid-cols-3">
          {bodyParts.map((el, index) => {
            return (
              <li key={index} value={index} className={"mt-2 mr-2 "+`${trigger.flag[index]?'bg-red-300' : 'bg-red-100'}`} onClick={(e:React.MouseEvent<HTMLLIElement>)=>{
                setSearch(bodyParts[e.currentTarget.value]);
                handleSearch(bodyParts[e.currentTarget.value]);
                setTrigger(prev => {
                  if(e.currentTarget && e.currentTarget.value)
                  prev.flag.forEach((el , i)=> el = i === e.currentTarget.value ? true : false )
                  return prev;
                })
              }}>
                <BodyCard bodyPart={el} />
              </li>
            );
          })}
        </ul>
        {/* Exercises Cards */}
        {(search && exercise.length!==0 && showExercise.length!==0) && <ul className='p-2 grid grid-cols-2 space-x-1 sm:grid-cols-3'>
          {showExercise.map(ex => {
            return <li
              key={ex.id}
              className='mt-4'
              onClick={(e: React.MouseEvent<HTMLLIElement>) => {
              } }>
              <Exercises {...{...ex , setUserExercise : setUserExercise , userExercise : userExercise}}></Exercises>
            </li>;
          })}
        </ul>}
      </section>}
      {done && <Summary {...userExercise}></Summary>}
    </div>
  );
};
export default CreateWorkout;
