import { AppBar } from "@mui/material"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {useState} from 'react'
import { styled ,Paper,Stack} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Notes from "./Notes";
import SubtitleContent from '../Trainess/SubtitleContent'
import Star from "@mui/icons-material/Star";
const AntTabs = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    paddiingBottom:"1rem",
    '& .MuiTabs-indicator': {
      backgroundColor: 'grey',
    },
  });
  const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    fontWeight:"bolder",
  
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    '&.Mui-selected': {
      color: '#a5b89d',
      fontWeight:"bolder",
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }));



function CourseContent (){


    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <AppBar className="navbar navbar-expand-lg navbar-light bg-light" 
        sx={{width:"30%" , left:{sm:"-1.5rem",md:"-1.5rem",lg:"-3.5rem",xl:"-11.5rem"} , 
        top:{sm:"-3rem",md:"-3rem",lg:"-4rem",xl:"-5rem"},marginBottom:"-30rem",
         paddingBottom:"3rem",position:"relative",zIndex:"initial",boxShadow:"none",
         color:"#000",display:{xs:"none",sm:"block",md:"block",lg:"block",xl:"block"}}}>
     <Box sx={{ width: '100%', typography: 'body1' ,position:"sticky",top:"6rem",alignItems:"flex-start"}}>
       
       <Card sx={{ minWidth: 275 ,position:"relative",top:"-6px"}}>
      <CardContent sx={{pt:"5%"}}>
          <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        48% progress
        </Typography>
        <Button variant="outlined"sx={{backgroundColor:"darkgrey",color:"black",borderColor:"black"}} startIcon={<Star sx={{color:"#faaf00"}} />}>
        Rate
        </Button>
        </Stack>
        </CardContent>
        </Card>
       <TabContext value={value}>
      <Box sx={{borderColor: 'divider' }}>
      <AntTabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <AntTab value="1" label="Course Content" />
        <AntTab value="2" label="Notes" />
      </AntTabs>
      </Box>
        <TabPanel value="1" style={{padding:0}}>
            <SubtitleContent/>
        </TabPanel>
        <TabPanel value="2" style={{padding:0}}>
            <Notes />
        </TabPanel >
      </TabContext>
    </Box>
        </AppBar>
    )
}
export default CourseContent