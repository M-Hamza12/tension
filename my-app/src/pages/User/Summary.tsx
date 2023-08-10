import './Summary.css'
import { useAppSelector } from '../../store';
import {useState , useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import DayForm from './DayForm';
interface Exercise {
    bodyPart: string;
    gifUrl: string;
    equipment: string;
    id?: string;
    name: string;
    target: string;
    sets?: number;
    reps?: number;
  }

const Summary = (props : Exercise[]) => {
    const navigate = useNavigate();
    const token = useAppSelector(state => state.token);
    const [title,setTitle] = useState<string>('');
    const [currentIndex , setCurrentIndex] = useState<number>(0);
    const [saving , setSaving ] = useState<string | null>(null);
    const [day , setDay] = useState<string>('');
    // logic for object --> array
    const length : number = Object.keys(props).length;
    let [ex , setEx] = useState<Exercise[]>([]);
    useEffect(()=> {
        let array : Exercise[] = [];
        for(let count = 0 ; count < length ; count++){
            props[count].sets = 0;
            props[count].reps = 0;
            array.push(props[count])
        }
        setEx(array);
    },[])
    const changeSets = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(!Number.isNaN(+e.target.value)){
            ex[currentIndex].sets = +e.target.value;
        }
        else{
            console.error('invalid sets');
        }

    }
    const changeReps = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(!Number.isNaN(+e.target.value)){
            ex[currentIndex].reps = +e.target.value;
        }
        else{
            console.error('invalid reps');
        }
    }
    const onSubmit = async(e:React.MouseEvent<HTMLButtonElement>) => {
        let isValid : boolean = true;
        ex.forEach(el => {
            delete el.id;
            if(el.sets === 0 || el.reps === 0) {
                isValid = false;
            }
        })
        if(!isValid)    
            return setSaving('Please specify sets and reps');
        if(title.length === 0 ){
            setSaving('Please specify your title');
            setTimeout(() => setSaving(null) , 2000);
            return;
        }
        if(day.length === 0)
        {
            setSaving('Please specify the day');
            setTimeout(() => setSaving(null) , 2000);
            return;
        }
        try{
            setSaving('Saving ....')
            let response = await fetch('/api/v1/exercise/addworkout', {
                method: 'POST',
                body : JSON.stringify({exercises : ex , title , day}),
                headers: {
                    'Content-Type': 'application/json',
                  Authorization: `Bearer ${token.value}`,
                },
              });
            let data = await response.json();
            if(data.staus === 'fail')
              throw new Error('There is somehting wrong!');
            navigate('/user/overview');
        }catch(error){
            console.log(error);
        }
        setSaving(null);
    }

    return <article className="xs:text-sm p-2">
        <div className="sm:w-3/4  mx-auto">
            <h1 className='text-center mb-4 mt-4 font-semibold'>Summary</h1>
                <DayForm setDay={setDay}></DayForm>
            <section className="title-day  block ml-8 sm:w-1/4">
                <input autoFocus placeholder='Title' className='block text-lg' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
                {/* <input placeholder='Day' type="" className='block' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/> */}
                
            </section>
            <div className="content mt-8">
                <ul className='lg:grid lg:grid-cols-2 lg:justify-center xs:space-y-8'>
                    {ex.map((el,index) => {
                        return <li key={el.id} value={index} className='h-44 w-full basis-1 p-2 border-t-2 rounded-xl border-lime-700 sm:mt-8 ' onClick={(e:React.MouseEvent<HTMLLIElement>)=>{
                            setCurrentIndex(e.currentTarget.value);
                        }}>
                            <div className=' h-40 grid grid-cols-2'>
                                <div className="imgs h-full w-full">
                                    <img src={el.gifUrl} className='h-3/4 w-full xs:h-full'></img>
                                </div>
                                <div className="content p-1 space-y-2">
                                    <h1 className='text-center font-semibold'>{el.name.toUpperCase()}</h1>
                                    <div className='flex justify-center space-x-2'>
                                        <label htmlFor="target" className='text-center bg-yellow-300 rounded-full p-1 w-1/2'>Target:</label>
                                        <span className='bg-red-200 rounded-full p-1 w-1/2 text-center'>{el.target}</span>
                                    </div>
                                    <div className='flex justify-center space-x-2 '>
                                        <label htmlFor="bodyPart" className='text-center bg-yellow-300 rounded-full p-1 w-1/2'>Body-Part:</label>
                                        <span className='bg-red-200 rounded-full p-1 w-1/2 text-center'>{el.bodyPart}</span>
                                    </div>
                                    <div className="input grid grid-cols-2 space-x-2">
                                        <input type='number' className='placeholder-stone-50 text-center bg-yellow-300  w-full h-8 rounded-full' placeholder='sets' min={1} onChange={changeSets}></input>
                                        <input type='number' className='placeholder-stone-50 text-center bg-red-200 rounded-full  h-8' placeholder='reps' min={1} onChange={changeReps}></input>
                                    </div>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
            {saving && <p className='mt-12 text-center mx-auto'>{saving}</p>}
            <button onClick={onSubmit} type='button' className='block mt-24 mx-auto w-1/2 bg-blue-500 rounded-full text-white p-1 sm:w-1/4 sm:mt-12 hover:bg-blue-300'>Finish</button>
        </div>
    </article>
}
export default Summary;
