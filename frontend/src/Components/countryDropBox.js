
import { useState , useMemo , useEffect } from 'react';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import axios from 'axios'
import {Currency} from '../Context/Currency'
import {useContext} from 'react'
import { Autocomplete ,Box,TextField} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';
import { ClickAwayListener } from '@mui/material';
const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: 300,
      margin: 100,
    },
    //style for font size
    resize:{
      fontSize:50
    },
  }
const CountryDropBox = () => {  
  const {curr , setCurr,rate,setRate} = useContext(Currency)
  const[field,setField]=useState(false)
   // console.log("out of session storge" + sessionStorage.getItem("rate"))
   const [change,setChange] = useState(false)
   const [country, setCountry] = useState('')
   const [loading , setLoading ] = useState(true)
   const options = useMemo(() => countryList().getData(), [])
   if(sessionStorage.getItem("country")== null || sessionStorage.getItem("country")== undefined){
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
    
    const changeHandler =(event, value) => {
        if(value!=null){
        setValue(value)
        sessionStorage.setItem("country",value.label)
        }
    }

    return (
       <ClickAwayListener onClickAway={()=>{setField(false)}}>
        <Box>
     <IconButton color="#bbd2b1" aria-label="upload picture" component="label" sx={{
         '&:hover':{
             boxShadow:"none"
         }
     }} onClick={()=>{field?setField(false):setField(true)}} >
        <LanguageIcon fontSize="medium"sx={{color:"#fff" ,
            '&:hover':{
                color:"#bbd2b1"
            }
        }}/>

    </IconButton>

     {field && 
         <Autocomplete
        value={value}
        onChange={changeHandler}
        options={options}
        
        sx={{width:"8rem" , height:"10%"}}
        ListboxProps={
            {
              style:{
                  maxHeight: '250px',
                  
              }
            }
        }
        renderInput={(params) => 
            <TextField {...params}  
        // inputProps={{style: {height:"8rem"}}}
        variant="standard" /> }
     /> }
     </Box>
     </ClickAwayListener>
       
    ) ;
}

export default CountryDropBox