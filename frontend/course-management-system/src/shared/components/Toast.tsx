import { Alert, Snackbar, type AlertColor, type SnackbarCloseReason } from '@mui/material';
import type React from 'react';
import type { SyntheticEvent } from 'react';

type ToastPops = {
    message : string,
    color : AlertColor,
    isOpen : boolean,
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
};

const Toast = ({message,color,isOpen,setIsOpen}:ToastPops) => {

    const  handleToastClose = (_: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason): void => 
    {
        if(reason==="clickaway" || reason==="escapeKeyDown") return;
        setIsOpen(false);
    }

  return (
    <Snackbar open={isOpen} autoHideDuration={4000} anchorOrigin={{vertical:"top",horizontal:"right"}} onClose={handleToastClose}>  
        <Alert severity={color} onClose={()=>setIsOpen(false)}>{message}</Alert>
    </Snackbar>
  )
};

export default Toast;
