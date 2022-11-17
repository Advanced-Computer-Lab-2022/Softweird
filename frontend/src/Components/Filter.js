import React, {useContext,useEffect,useState} from "react"
import axios from 'axios'
import './Filter.css'
import {FilterSearch} from '../Context/FilterSearch'


function Filter (props) {
    const [subjects , setSubjects]=useState([])
    const [prices , setprices]=useState([])
    const[loading,setLoading]=useState(true)
    const {subject , setSubject ,price , setPrice ,rate , setRate} = useContext(FilterSearch)
    useEffect(() =>{
        setRate([0,1,2,3,4,5])
         let cancel
         axios({
             method:"GET",
             url : "/Search/filter",
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             setLoading(false)
             setSubjects(res.data[0])
         }).catch(e=>{
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()

     }, [])
     function handleSubject (e){
         const subjectEvent = e.target.id
         if(e.target.checked===true){
            
             setSubject (prevFilter => [... new Set ([...prevFilter , e.target.id])])
             
         }
         else {
             setSubject (subject.filter(item => item !== e.target.id))
        }
    }
        function handleRatings (e) {
            if(e.target.checked===true){
                if(rate.length ==6) setRate([])

                setRate (prevFilter => [... new Set ([...prevFilter , Number(e.target.id)])])
                
                
            }
            else {
                var arr = rate.filter(item => item !== Number(e.target.id))
                if( arr.length ===0 )
                   arr = [0,1,2,3,4,5]
                setRate(arr)
           }
           console.log(rate)
       }

        
     

    return(
        <>
        <div className="checkboxes">
        <label>Subjects</label>
        <ul>
        {subjects.map (subject=>{
            return <li key = {subject}><input id={subject} type="checkbox" onChange={handleSubject}/> {subject}</li>
        })}
        </ul>
        </div>
        <div className="checkboxes">
        
        {props.show && <>
        <label>Ratings</label>
        <ul>
            <li><input id="0" type="checkbox" onChange={handleRatings}/>0 - 1</li>
            <li><input id="1" type="checkbox" onChange={handleRatings}/>1 - 2</li>
            <li><input id="2" type="checkbox" onChange={handleRatings}/>2 - 3</li>
            <li ><input id="3" type="checkbox" onChange={handleRatings}/> 3 - 4</li>
            <li><input id="4" type="checkbox" onChange={handleRatings}/>4 - 5</li>
            <li><input id="5" type="checkbox" onChange={handleRatings}/>5</li>
        </ul></>}
       </div>

        </>
    )
}

export default Filter