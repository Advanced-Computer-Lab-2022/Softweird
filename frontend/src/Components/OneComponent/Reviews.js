
import './Reviews.css'
import { Stack } from '@mui/material'
import { Avatar } from '@mui/material'
import { Typography } from '@mui/material'
import ReviewsIcon from '@mui/icons-material/Reviews';

function reviews({course,instructor,cn}){
    const x = [1,2,3,4,5,6]
    var rev = []
    if(cn){rev = course.reviews}
    else {rev = instructor.reviews}
    
    return(

        <div style={{position:'relative'}}>
     <Stack direction="row" gap={1} alignItems={"center"} mb={"2rem"}>
     < ReviewsIcon sx= {{color:"#bbd2b1"}}/>
     <Typography variant={"h5"}>Trainees' Reviews</Typography> 
      </Stack>
      <div class="rod"></div>
  {rev.length!=0 &&  <ul className="cards cards-m">
    {rev.map(r => {
           return <li className="card card-m">
            <div>
            <Stack paddingTop={5} direction="row" gap={2}  alignItems={"center"} >
                <Avatar src="/static/images/avatar/1.jpg" />
                <Typography>{r.traineeId.fName} {r.traineeId.lName}</Typography>
            </Stack>
            <Stack alignItems={"center"}>
                <div className="card-content card-content-m">
                <p>{r.review}</p>
                </div>
                </Stack>
            <div className="text-end">
                <Typography color="text.secondary" sx={{fontSize:"0.8rem"}}>{r.date.slice(0,10)}</Typography>
            </div>

            </div>
                
        </li>
})}

    

    

    </ul>}

    {rev.length==0 &&
    <li className="card card-m" style={  {  position: "relative",
        width: "30%",
        left: "35%"}}>
    <div>
    <Stack alignItems={"center"}>
        <div className="card-content card-content-m">
        <p>No Reviews Posted</p>
        </div>
        </Stack>

    </div>
        
</li> }
  
        </div>
    )
   
}

export default reviews