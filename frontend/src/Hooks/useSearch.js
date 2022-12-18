import { useEffect,useState } from "react";
import axios from "axios"


 function useSearch (searchResult , clicking) {
      const [courses , setCourses] = useState ([])
      const [loading , setLoading] = useState(true)
      useEffect(() =>{
         setLoading(true)
          let cancel
          axios({
              method:"GET",
              url : "/search",
              params : {input:searchResult},
              cancelToken: new axios.CancelToken (c => cancel = c)
          }).then (res => {
             setLoading(false)
              setCourses(res.data)
              console.log(res.data)
          }).catch(e=>{
              if(axios.isCancel(e)) return 
          })
          return () => cancel ()
          

      }, [searchResult])

      return {loading , courses}
  }
  export default useSearch;