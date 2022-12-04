import {Toast} from 'react-bootstrap'
function Toast({message}) {
    return (
        <Toast
        onClose={() => showToast(false)}
        autohide
        show={toast}
        delay={2200}
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
          <small>justNow</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    )

    
}
export default Toast