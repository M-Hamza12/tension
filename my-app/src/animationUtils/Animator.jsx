import { useRef } from "react";
import { useInView } from "framer-motion";

function Animator({ children} ) {
  const ref = useRef(null);
  const isInView = useInView(ref);
console.log(isInView);
  return (
    <section ref={ref}>
      <span
        style={{
          transition: "all 1s "
        }}
        className={!isInView? 'translate-x-80 ': ''}
      >
        {children}
      </span>
    </section>
  );
}
export default Animator;