import { Link,NavLink } from 'react-router-dom';
import './NavBar.css'
const Navbar = () => {
  return (
    <nav>
      <ul className="flex justify-center space-x-4 p-4 font-bold">
        <NavLink to={'/user/overview'} className={(object : {isActive : boolean , isPending : boolean})=> object.isActive ? 'active' : ''}>Overview</NavLink>
        <NavLink to={'/user/myworkout'}>MyWorkout</NavLink>
        <NavLink to={'/user/createworkout'}>CreateWorkout</NavLink>
        <NavLink to={'/user/account'}>Account</NavLink>
      </ul>
    </nav>
  );
};
export default Navbar;
