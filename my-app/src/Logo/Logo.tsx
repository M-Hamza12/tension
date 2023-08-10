import Typed from "typed.js";
import { useRef,useEffect } from "react";
import { motion } from "framer-motion";
import T from "./T";
import { useNavigate } from "react-router-dom";
const Logo = () => {
    const el = useRef(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const typed = new Typed(el.current, {
            strings: ['ENSION.'],
            typeSpeed: 100,
            startDelay : 2000,
            showCursor : false,
          })   
          setTimeout(()=>{
            navigate('/home');
          },3200);
          return () => typed.destroy();
    },[])
    return <div className="h-full grid items-center text-3xl font-semibold ">
            <div className="mx-auto flex">
            {/* <span className="text-yellow-600">T</span> */}
            <motion.div initial={{scale: 2 ,rotateZ : 180}}
            animate={{scale : 1 , rotateZ : 0}}
            transition={{
                duration : 1.5,
                delay : 0.5
            }}>
            <T></T>
            </motion.div>
            <span className="-translate-x-4" ref={el}></span>
            </div>
    </div>
}
export default Logo;