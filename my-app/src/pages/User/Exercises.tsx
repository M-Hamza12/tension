import { Dispatch,SetStateAction } from "react";
interface Exercise {
    bodyPart: string;
    gifUrl: string;
    equipment: string;
    id: string;
    name: string;
    target: string;
    setUserExercise: (exercise : {
        bodyPart: string;
        gifUrl: string;
        equipment: string;
        id: string;
        name: string;
        target: string;
      }[]) => void;
    userExercise :  {
        bodyPart: string;
        gifUrl: string;
        equipment: string;
        id: string;
        name: string;
        target: string;
      }[];
  }

const Exercises = ( props : Exercise) => {
    return<div
    data-name={props.name}
            onClick={(e:React.MouseEvent<HTMLDivElement>) => {
                let object = {id : props.id , name : props.name , bodyPart : props.bodyPart , equipment : props.equipment , gifUrl : props.gifUrl , target : props.target}
                if(props.userExercise.find(e => e.id === object.id)){
                        let exer = props.userExercise.filter(e => e.id !== object.id);
                        props.setUserExercise(exer);
                }
                else
                 props.setUserExercise([...props.userExercise , object])
            }}
    >
        <div className="border-4 border-t-red-500 p-1 rounded-lg " 
        onClick={(e:React.MouseEvent<HTMLDivElement>) => {
            e.currentTarget.classList.contains('border-red-500') ? e.currentTarget.classList.remove('border-red-500') : e.currentTarget.classList.add('border-red-500');
        }}>
            <div className="image block">
                <img src={props.gifUrl} className="block h-full" loading="lazy"></img>
            </div>
            <div className="space-y-2">
            <p className="bg-red-300 rounded-xl p-1 w-full text-center font-semibold">{props.name}</p>
            <p className="bg-yellow-300 p-1 rounded-xl w-full text-center font-semibold">{props.bodyPart}</p>
            </div>
        </div>
    </div>
}
export default Exercises;