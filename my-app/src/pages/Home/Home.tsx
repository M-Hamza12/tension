import LoadingSpinner from "../../loadingspinner/LoadingSpinner";
import { useState , useRef } from "react";
import image1 from "./../../images/image1.jpg";
import diet from "./../../images/diet.jpg";
import rest2 from "./../../images/rest2.jpg";
import { Link } from "react-router-dom";

type Props = {
  setLogin: (email: boolean) => void;
}

const Home = ({setLogin} : Props) => {
  // let el : JSX.Element = <div className="h-32 transition ease-in-out delay-150"><img src={image1} className="h-full"></img></div>

  let [loading , setLoading] = useState<boolean>(false);
    return(
        <div className={`black `}>
          {loading && <LoadingSpinner></LoadingSpinner>}
          <section className="workout grid grid-rows-2 lg:h-10/11 lg:flex lg:h-[20rem]">
            <div className="content p-2 flex items-center justify-center">
              <article>
                <h1 className="text-emerald-400 text-center font-bold text-2xl">Working Out!</h1>
                <p className="text-slate-50 text-center mt-2">STOP MAKING EXCUSES! AND GO FOR IT TO ACHIEVE YOUR DREAM BODY YOU WISHED FOR. IF YOU DONT HAVE ACCESS TO GYM DONT WORRY WE GOT YOU SOME HOME EXERCISES TO GET YOU STARTED</p>
              </article>
            </div>
           <div className="h-[20rem] w-full">
              <img src={image1} className="h-full w-full"></img>
            </div>
          </section>

          <section className="workout grid grid-rows-2 bg-black lg:h-10/11 lg:flex lg:flex-row-reverse lg:h-[20rem]">
            <div className="content p-2  flex items-center justify-center">
              <article>
                <h1 className="text-emerald-500 text-center font-bold text-2xl">DIET</h1>
                <p className="text-slate-50 text-center mt-2">YOUR DIET IS AS IMPORTANT AS YOU ARE WOKING HARD DURING THE EXERCISE. IT'S TOUGH IN THE START BUT HEALTHY DIET IS THE KEY TO YOUR DREAM BODY</p>
              </article>
            </div>
            <div className={`transition ease-in-out duration-1000 h-[20rem] w-full`}>
              <img src={diet} className="h-full w-full"></img>
            </div>
          </section>

          <section className="workout grid grid-rows-2 bg-black lg:h-10/11 lg:grid-cols-2 lg:h-[20rem]">
            <div className="content p-2  flex items-center justify-center">
              <article className="lg:mr-8">
                <h1 className="text-emerald-500 text-center font-bold text-2xl">REST</h1>
                <p className="text-slate-50 text-center mt-2">YOU DONT NEED TO BE TOO HARD ON SELF AND HAVE TO REST AND IS ESSENTIAL PART FOR YOUR BODY TO PROGRESS. AS DURING REST THE MUSCLES ARE BUILD STRONGER. SO MAKE SURE TO HAVE GOOD SLEEP ALTEAST 6-7 HOURS A DAY.</p>
              </article>
            </div>
            <div className={`transition ease-in-out duration-1000 h-[20rem] w-full lg:w-4/5 lg:justify-self-center`}>
              <img src={rest2} className="h-full w-full"></img>
            </div>
          </section>

          <div className=" bg-gray-900 text-slate-200 p-2 flex justify-center space-x-4 align-middle">
          <Link to={'/login'} onClick={()=> setLogin(true)} className="border-2 border-rose-600 bg-rose-600  rounded-full w-20 text-center hover:bg-rose-400 scalingAnimation">Login</Link>
          <Link to={'/signup'} className="border-2 border-rose-600 bg-rose-600  rounded-full w-20 text-center hover:bg-rose-400 scalingAnimation">Signup</Link>
          </div>
        </div>
    )
}
export default Home;