import Pop from 'react-bootstrap/Toast'
import { useEffect, useState ,useContext} from 'react'
import {Toast} from '../../Context/Toast'


function ToastMess({message,open}) {
  const {openToast,setOpenToast} = useContext(Toast)


    return (
      <>
       <Pop
        onClose={() => {setOpenToast(false)}}
        autohide
        show={openToast}
        delay={5000}
        style={{position:"fixed" ,bottom:"10px",backgroundColor:"white",left:"0.3rem",zIndex:2}}
      >
        <Pop.Header style={{backgroundColor:"#c50d0d"}}>
          <strong className="mr-auto" style={{color:"white"}}>Success</strong>
          <small style={{paddingLeft:"57%",color:"white"}}>justNow</small>
        </Pop.Header>
        <Pop.Body>{message}</Pop.Body>
      </Pop>
      </>
    )

    
}
export default ToastMess