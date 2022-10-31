
import 'font-awesome/css/font-awesome.min.css';
import {useState , useEffect} from 'react'
import {useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {SearchInstructor} from '../../Context/SearchInstructor';

function SearchBarCourses () {
    const[searchInput,setSearchInput]=useState()
    const {courses,setCourses} = useContext(SearchInstructor)
    const [loading,setLoading] = useState(false)
    function handleSearch (e) {
        setSearchInput(e.target.value)
      }
      useEffect(() =>{
        setLoading(true)
         let cancel
         axios({
             method:"GET",
             url : "/Instructor/getInstructorCourses",
             params : {value:searchInput , instructor: "635eca353b56902f4d87ebad"},
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
             setLoading(false)
             setCourses(res.data)
             console.log(res.data)
         }).catch(e=>{
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
         
     
     }, [searchInput])
    return(
        <>
        <form>
        <input type="text" placeholder="Search.." name="search" onChange={handleSearch} value={searchInput}/>
        <Link to ={{
               pathname : `/MyCourses/${searchInput}` , // add link instructor id 
               state:{stateParam :true}
             }}>
        <button type="submit"><i className="fa fa-search" ></i> </button>
        </Link>
    </form>
        </>
    )
}
export default SearchBarCourses