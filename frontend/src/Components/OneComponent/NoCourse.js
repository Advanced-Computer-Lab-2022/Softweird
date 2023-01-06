import { Box,Card, CardContent, CardMedia, Typography ,Stack} from "@mui/material";
import course from '../../Images/course.png'
import refundsIndv from '../../Images/refundsIndv.jpg'

 function NoCourse({message}) {
    return (
        <>
        <Box sx={{width:"70%",position: "relative",
    left: "15%"}}>
            <div className="wire"></div>
            <Card className="card-course" sx={{p:"2rem"}}>
                <CardContent>
                    <Stack direction="row" gap={"3rem"} alignItems={"center"}>
                   <CardMedia component={"img"} 
                   image={message=="You have no Refund Requests"?refundsIndv:course} />
                   <Typography sx={{  fontSize:"1.2rem" , fontWeight: "bolder",
    color:"#c50d0d"}}>
                       {message} 😞
                   </Typography>
                   </Stack>
                </CardContent>

            </Card>
        </Box>
        </>

    )
    
}
export default NoCourse