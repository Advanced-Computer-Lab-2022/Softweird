import { Paper } from "@mui/material"

import CourseContent from "../../Components/Trainess/CourseContent";
import VideoShow from "../../Components/Trainess/VideoShow";
import { Stack } from "@mui/material";
import {TraineeCourse} from '../../Context/TraineeCourse'


function OneOfMyCourses (){
    return(
        <TraineeCourse.Provider >
        <Stack direction="row" gap={4} position="relative">
        <CourseContent/>
        <VideoShow/>
        </Stack>
        </TraineeCourse.Provider>

    )
}
export default OneOfMyCourses