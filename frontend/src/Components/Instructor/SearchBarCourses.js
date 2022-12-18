
import 'font-awesome/css/font-awesome.min.css';
import {useState , useEffect} from 'react'
import {useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {SearchInstructor} from '../../Context/SearchInstructor';
import Loading from '../OneComponent/Loading';
import './Search.css'
import {useAuth} from '../auth'

function SearchBarCourses () {
    const auth= useAuth()
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search');
    console.log(search)
    const a = search ==null ? "":search
    const[searchInput,setSearchInput]=useState(a)
    const {courses,setCourses,loading,setLoading} = useContext(SearchInstructor)
    function handleSearch (e) {
        setSearchInput(e.target.value)
      }
      useEffect(() =>{
        setLoading(true)
         let cancel
         axios({
             method:"GET",
             url : "/Instructor/myCourses",
             params : {value:searchInput , instructor: auth.user.id},
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
        {/* <form>
        <input type="text" placeholder="Search.." name="search" value={searchInput}  onChange={handleSearch}/>
        <Link to ={{
               pathname : `/MyCourses/${searchInput}` , // add link instructor id 
               state:{stateParam :true}
             }}>
        <button type="submit"  ><i className="fa fa-search" onChange={handleSearch} ></i> </button>
        </Link>
    </form> */}

<div class="search-box">
<Link to = {`/MyCourses/?search=${searchInput}`}>
    <button class="btn-search"><i class="fa fa-search" onChange={handleSearch}></i></button>
    <input type="text" class="input-search" placeholder="Search for your courses" value={searchInput}  onChange={handleSearch} />
</Link>
  </div>


        </>
    )
}
export default SearchBarCourses