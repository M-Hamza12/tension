import {useEffect, useState} from "react";
import './StartWorkout.css'
import AnimatedNumber from "react-animated-numbers";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { fetchData } from "../../utils/fetchData";

import Navbar from "./NavBar";
const StartWorkout = () => {
    const navigate = useNavigate();
    const exercise = useAppSelector(state => state.startExercise);
    const exercises = exercise.exercises;

    const [currentIndex ,setCurrentIndex] = useState<number>(0);
 
    const [currentSets , setCurrentSets] = useState<number>(exercises[currentIndex >= exercises.length ? 0 : currentIndex].sets);
    const [gifUrl ,setGifUrl] = useState<string>('');
    //
    useEffect(()=> {
        (async () => {
            const data = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/name/${exercises[currentIndex >= exercises.length ? 0 : currentIndex].name}`)
            console.log(data);
            setGifUrl(data[0].gifUrl);
        })();
    },[currentIndex])

    const handleNext = () => {
        if(currentSets > 1)
            return setCurrentSets(prev => prev-1);
        else{
            if(currentIndex + 1 < exercises.length){
                setCurrentSets(exercises[currentIndex + 1].sets)
            }else {
                setTimeout(() => {
                    navigate('/user/myworkout');
                },5000)
            }
            setCurrentIndex(prev => prev + 1);
            
        }
    }
    if(currentIndex >= exercises.length) {
        return <div className="h-full bg-black text-white font-semibold text-center p-2 flex items-center justify-center lg:text-xl">
            <article>
                <p>CONGRATULATIONS YOUR WORKOUT HAS BEEN COMPLETED</p>
                <section className="flex space-x-2 justify-center">
                <p className="uppercase">Your PowrLevel is over </p>
                    <AnimatedNumber animateToNumber={8000} fontStyle={{color : 'orange' , fontSize : 19 ,display : 'block'}} configs={[
                    { mass: 1, tension: 220, friction: 150 },
                    { mass: 1, tension: 180, friction: 130 },
                    { mass: 1, tension: 280, friction: 90 },
                    { mass: 1, tension: 180, friction: 135 },
                    { mass: 1, tension: 260, friction: 100 },
                    { mass: 1, tension: 210, friction: 180 },
                    ]}/>
                </section>
            </article>
            
        </div>
    }
    console.log(exercise);
    return <div className="h-full bg-black ">
        <div className="text-xs bg-yellow-600 text-white"><Navbar></Navbar></div>
        <div className="self-center  mx-auto mt-20 p-1 h-1/2 w-5/6 rounded-2xl sm:w-1/2 "> 
            <div className="image pb-2 h-1/2 flex justify-center bg-white rounded-t-lg ">
                <img src={gifUrl} className="h-full"></img>
            </div>
            <div className="content border-t-4 border-green-600 xs:text-sm space-y-4">
                <h1 className="text-center uppercase text-orange-400 font-semibold">{exercises[currentIndex].name}</h1>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="bg-yellow-300 rounded-full w-1/2 text-center sm:w-1/4">Sets</div>
                <div className="bg-red-300 w-1/2 rounded-full text-center sm:w-1/4">{currentSets}</div>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="bg-yellow-300 rounded-full w-1/2 text-center sm:w-1/4">Reps</div>
                <div className="bg-red-300 w-1/2 rounded-full text-center sm:w-1/4">{exercises[currentIndex].reps}</div>
              </div>
              <button className="bg-blue-500 block w-1/2 p-1 rounded-full text-white mx-auto" onClick={handleNext}>{"Next Set =>"}</button>
            </div>
        </div>
    </div>
}
export default StartWorkout;