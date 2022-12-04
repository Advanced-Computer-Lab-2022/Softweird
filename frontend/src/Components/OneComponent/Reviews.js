
import './Reviews.css'
import { Stack } from '@mui/material'
import { Avatar } from '@mui/material'
import { Typography } from '@mui/material'
import ReviewsIcon from '@mui/icons-material/Reviews';

function reviews(){
    const x = [1,2,3,4,5,6]
    
    return(
        <div style={{position:'relative'}}>
     <Stack direction="row" gap={1} alignItems={"center"} mb={"2rem"}>
     < ReviewsIcon sx= {{color:"#bbd2b1"}}/>
     <Typography variant={"h5"}>Trainees' Reviews</Typography> 
      </Stack>
      <div class="rod"></div>
   <ul className="cards cards-m">
    {x.map(e => {
           return <li className="card card-m">
            <div>
            <Stack paddingTop={5} direction="row" gap={2}  alignItems={"center"} >
                <Avatar src="/static/images/avatar/1.jpg" />
                <Typography>Ahmed Mohamed</Typography>
            </Stack>
            <Stack alignItems={"center"}>
                <div className="card-content card-content-m">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                </Stack>

            </div>
                
        </li>
})}

    

    

    </ul>
  
        </div>
    )
   
}

export default reviews