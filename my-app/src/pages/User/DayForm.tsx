import './DayForm.css'
interface Props {
    setDay : (day : string) => void
}
const DayForm = (props : Props) => {
    return(<article>
<form id="app-cover" className='lg:translate-y-8'>
  <div id="select-box">
    <input type="checkbox" id="options-view-button"/>
    <div id="select-button" className="brd">
      <div id="selected-value">
        <span>Select Day</span>
      </div>
      <div id="chevrons">
        <i className="fas fa-chevron-up"></i>
        <i className="fas fa-chevron-down"></i>
      </div>
    </div>
    <div id="options" >
      <div className="option">
        <input className="s-c top text-center" type="radio" name="platform" value="Monday" onClick={(e:React.MouseEvent<HTMLInputElement>)=> props.setDay(e.currentTarget.value)}/>
        <input className="s-c bottom text-center" type="radio" name="platform" value="Monday" onClick={(e:React.MouseEvent<HTMLInputElement>)=> props.setDay(e.currentTarget.value)}/>
        <span className="label">Monday</span>
        <span className="opt-val">Monday</span>
      </div>
      <div className="option">
        <input className="s-c top" type="radio" name="platform" value="Tuesday" onClick={(e:React.MouseEvent<HTMLInputElement>)=> props.setDay(e.currentTarget.value)}/>
        <input className="s-c bottom" type="radio" name="platform" value="Tuesday" onClick={(e:React.MouseEvent<HTMLInputElement>)=> props.setDay(e.currentTarget.value)}/>
        <span className="label">Tuesday</span>
        <span className="opt-val">Tuesday</span>
      </div>
      <div className="option">
        <input className="s-c top" type="radio" name="platform" value="Wednesday" onClick={(e:React.MouseEvent<HTMLInputElement>)=> props.setDay(e.currentTarget.value)}/>
        <input className="s-c bottom" type="radio" name="platform" value="Wednesday" onClick={(e:React.MouseEvent<HTMLInputElement>)=> props.setDay(e.currentTarget.value)}/>
        <span className="label">Wednesday</span>
        <span className="opt-val">Wednesday</span>
      </div>
      <div className="option">
        <input className="s-c top" type="radio" name="platform" value="Thursday" onClick={(e:React.MouseEvent<HTMLInputElement>)=> props.setDay(e.currentTarget.value)}/>
        <input className="s-c bottom" type="radio" name="platform" value="Thursday" onClick={(e:React.MouseEvent<HTMLInputElement>)=> props.setDay(e.currentTarget.value)}/>
        <span className="label">Thursday</span>
        <span className="opt-val">Thursday</span>
      </div>
      <div className="option">
        <input className="s-c top" type="radio" name="platform" value="Friday" onClick={(e:React.MouseEvent<HTMLInputElement>)=> props.setDay(e.currentTarget.value)}/>
        <input className="s-c bottom" type="radio" name="platform" value="Friday" onClick={(e:React.MouseEvent<HTMLInputElement>)=> props.setDay(e.currentTarget.value)}/>
        <span className="label">Friday</span>
        <span className="opt-val">Friday</span>
      </div>
      <div className="option">
        <input className="s-c top" type="radio" name="platform" value="Saturday" onClick={(e:React.MouseEvent<HTMLInputElement>)=> props.setDay(e.currentTarget.value)}/>
        <input className="s-c bottom" type="radio" name="platform" value="Saturday" onClick={(e:React.MouseEvent<HTMLInputElement>)=> props.setDay(e.currentTarget.value)}/>
        <span className="label">Saturday</span>
        <span className="opt-val">Saturday</span>
      </div>
      <div id="option-bg"></div>
    </div>
  </div>
</form>
    </article>)
}
export default DayForm;