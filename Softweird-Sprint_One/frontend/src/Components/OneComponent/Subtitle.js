import React from 'react';



function Subtitle (props) {
    props.subtitles.map( subtitle =>{


        return (
            <div key = {subtitle.id}>
                    <h3>{props.subtitles.title} </h3>
                    <h3>{props.subtitles.totalHours}</h3>
                    <h3>{props.subtitles.video.length}</h3>
        </div>
        )
    }
       
        
    

    )
   
}
export default Subtitle