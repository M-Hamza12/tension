import abs from './../../images/abs.png';
import chest from './../../images/chest.png';
import shoulder from './../../images/shoulder.png';
import legs from './../../images/legs.png';
import back from './../../images/body-part.png';
import arms from './../../images/arms.png';
import {  useRef } from 'react';
interface Props {
  bodyPart: string;
}
const BodyCard = ({ bodyPart }: Props) => {
  const ref1 = useRef(null);
  let image;
  if (bodyPart === 'chest') image = chest;
  if (bodyPart === 'abs') image = abs;
  if (bodyPart === 'legs') image = legs;
  if (bodyPart === 'shoulder') image = shoulder;
  if (bodyPart === 'back') image = back;
  if (bodyPart === 'arms') image = arms;
  return (
    <div className="h-24 flex items-center flex-col w-full justify-center hover:bg-red-300 hover:scale-105" >
      <div className="image h-12 ">
        <img src={image} alt={`${bodyPart} image`} className="h-5/6 relative" />
      </div>
      <p className="">{bodyPart}</p>
    </div>
  );
};
export default BodyCard;
