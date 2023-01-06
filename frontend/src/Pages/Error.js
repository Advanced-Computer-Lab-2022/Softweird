import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box'
import './Error.css'
import error from '../Images/error.png'
import { Button, Stack, Typography } from '@mui/material';
function Error(){
    return(
<>
<Box sx={{position:"relative",width:"80%",left:"10%",paddingBottom:"6rem"}}>
    <div className='wiree'></div>
        <Card variant="outlined" className="error" sx={{position:"relative", display: 'flex',paddingBottom:"1px",backgroundColor:"#d5d5d5" }} >
    <Stack direction={"column"} width="100%" alignItems={"center"}>
<CardMedia
  component="img"
  sx={{ width: "49%",borderRadius:"25px",padding:"3%",position:"relative" }}
  image={error}
  
/>
<Stack direction={"row"} alignItems={"center"} pb="1rem">
<Typography variant="p" sx={{fontSize:"2rem"}}>📚</Typography>
<Button sx={{color:"#cd0505" ,fontWeight:"bold",fontSize:"1.1rem",  "&:hover":{
                    textDecoration:"underline",
                    textDecorationColor:"#bbd2b1"
                    }}} onClick={() => window.location.href='/'}
                    >go to home page</Button>
                    <Typography variant="p" sx={{fontSize:"2rem"}}>📚</Typography>
                    
                    </Stack>
</Stack>
 
  </Card>
  </Box>
  </>
 
    )
}
export default Error;