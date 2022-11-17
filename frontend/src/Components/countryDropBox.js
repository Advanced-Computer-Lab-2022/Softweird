
import { useState , useMemo , useEffect } from 'react';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import axios from 'axios'
import {Currency} from '../Context/Currency'
import {useContext} from 'react'



const CountryDropBox = () => {  
  const {curr , setCurr,rate,setRate} = useContext(Currency)
   // console.log("out of session storge" + sessionStorage.getItem("rate"))
   const [change,setChange] = useState(false)
   const [country, setCountry] = useState('')
   const [loading , setLoading ] = useState(true)
   const options = useMemo(() => countryList().getData(), [])
   if(sessionStorage.getItem("country")== null){
    sessionStorage.setItem("country",options[83].label)
  console.log(sessionStorage.getItem("country"))}
   const [value, setValue] = useState(options.find(({label}) => label==sessionStorage.getItem("country")))
   
    useEffect(() =>{
        let cancel
         axios({
        method:"GET",
        url : "/CurrencyChange",
        params : {country : value.value},
         cancelToken: new axios.CancelToken (c => cancel = c)
     }).then (res => {
        setRate(res.data.rate)
        setCurr(res.data.curr)
        
    }).catch(e=>{
        if(axios.isCancel(e)) return 
    })
    return () => cancel ()
    setChange(false)
    }, [value.value])
    
    const changeHandler = value => {
        setValue(value)
        sessionStorage.setItem("country",value.label)
    }

    return (
      <>
     <Select options={options} value={value} onChange={changeHandler} />
     </>
       
    ) ;
}

export default CountryDropBox