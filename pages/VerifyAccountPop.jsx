import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React from 'react';
import assest from "@/json/assest";
//* *  DYNAMIC IMPORTS   */
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import LinearProgress, {
    linearProgressClasses
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { memo } from "react";
import Image from "next/image";
// import { makeStyles } from "@material-ui/core/styles";
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import { useState,useEffect } from 'react';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    // borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
        // borderRadius: 5,
        backgroundColor: "black"
    }
}));


const VerifyAccountPop = ({memberData}) => {

    const [open, setOpen] = useState(false)

    const useStyles = makeStyles({
        topScrollPaper: {
            alignItems: "flex-start"
        },
        topPaperScrollBody: {
            verticalAlign: "top"
        }
    });
    
    const classes = useStyles();

    useEffect(() => {
        if(memberData && !memberData.password_exist && localStorage.getItem('accountVerification')){
            setOpen(true)
        }
   
    }, [memberData])
    


    const handleClose = () => {

    }

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                fullWidth={true}
                maxWidth={'sm'}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                classes={{
                    scrollPaper: classes.topScrollPaper,
                    paperScrollBody: classes.topPaperScrollBody
                }}
         
            >

                <DialogTitle id="alert-dialog-title">
                    <h4>{"Please check your email to verify your account."}</h4>
                </DialogTitle>
                <DialogContent style={{ textAlign: "center" }}>
                    <DialogContentText id="alert-dialog-description">
                    <h4>{memberData?.email}</h4>
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: "space-between" }}>
                    <Button onClick={handleClose}>Change</Button>
                    <Button onClick={handleClose} >
                        Resend
                    </Button>
                </DialogActions>
         
            </Dialog>
        </>
    );


}

export default memo(VerifyAccountPop);