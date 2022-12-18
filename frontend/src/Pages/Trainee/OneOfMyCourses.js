import { Paper } from "@mui/material"

import CourseContent from "../../Components/Trainess/CourseContent";
import VideoShow from "../../Components/Trainess/VideoShow";
import { Stack } from "@mui/material";
import {TraineeCourse} from '../../Context/TraineeCourse'
import {useState,useEffect} from 'react'
import {Navigate, useParams,useNavigate} from "react-router-dom"
import axios from "axios"
import Loading from "../../Components/OneComponent/Loading";
import { useAuth } from "../../Components/auth";

function OneOfMyCourses (){
    const [myCourse,setMyCourse]=useState([])
    const [course,setCourse]=useState([]) 
    const params = new URLSearchParams(window.location.search);
    const [loading,setLoading] = useState(true);
    const [reload,setReload] = useState(true);
    const [index,setIndex] = useState(0);
    const [subIndex,setSubIndex] = useState(0);
    const{coursetitle} = useParams() 
    const [videosWatched,setVideo] = useState([])
    const [CourseInfo,setCourseInfo]=useState('') ;
    const [notes,setNotes] = useState([])
    const [video,setmyVideo] = useState('');
    const [exam,setexam] = useState([]);
    const [myprog,setProg] = useState([])
    const [openSolve,setOpenSolve]=useState(false)
    const [openGrade,setOpenGrade]=useState(false)
    const courseTitle = (coursetitle == undefined? "" : coursetitle)
    const [playVideo,setPlayVideo] = useState(true);
    const [firstOpen,setFirstOpen] =useState(false)
    const auth =useAuth()
    const navigate = useNavigate()


    useEffect(() =>{
        setLoading(true)
         let cancel
         axios({
             method:"GET",
             url : `/Individual/myCourse/${auth.user.id}`,
             params : {courseTitle:courseTitle},
             cancelToken: new axios.CancelToken (c => cancel = c)
         }).then (res => {
            if(res.data.error=="no course"){
                navigate(`/Courses/`)
            }
             setLoading(false)
             setMyCourse(res.data.myCourse)
             setCourse(res.data.course)
             setFirstOpen(res.data.firstOpen)
             if(res.data.myCourse==null){
                 navigate(`/Courses/`)
             }
         }).catch(e=>{
            
             if(axios.isCancel(e)) return 
         })
         return () => cancel ()
     }, [reload])
    return(
        <>
       {!loading && <TraineeCourse.Provider value = {{myCourse,course,index,setIndex
        ,subIndex,setSubIndex,setReload,myCourse,setMyCourse,videosWatched,notes,setNotes,setVideo
        ,video,setmyVideo,openSolve,setOpenSolve,exam,setexam,openGrade,setOpenGrade,CourseInfo,setCourseInfo,
        playVideo,setPlayVideo,firstOpen,setFirstOpen}}>
        <Stack direction="row" gap={4} position="relative">
        <CourseContent/>
        <VideoShow/>
        </Stack>
        </TraineeCourse.Provider>}
        {loading && <Loading/>}

        </>



    )
}
export default OneOfMyCourses