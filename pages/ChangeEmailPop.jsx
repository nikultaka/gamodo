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
import { alpha, styled } from "@mui/material/styles";
import { memo } from "react";
import Image from "next/image";
// import { makeStyles } from "@material-ui/core/styles";
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputBase from '@mui/material/InputBase';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        // backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '100%',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}




const ChangeEmailPop = ({ open, setOpen, email, handleChange, validateEmail, onClickChangeEmail }) => {


    const handleClose = () => {
        setOpen(false)

    }

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Change your email
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Alert severity="warning">
                        This will affect 7 stores and your Partner account. if you'd like to change your email address for a single store, lern
                        how to <a style={{ color: "unset", textDecoration: "underline" }} href='#'>transfer ownership</a>.
                    </Alert>

                </DialogContent>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        We'll send you an email to the new address to verify that you own it
                    </Typography>
                    <InputLabel htmlFor="bootstrap-input"
                    // style={{fontSize:"18px",fontWeight:"700"}}
                    >
                        New email
                    </InputLabel>
                    <FormControl variant="standard" style={{ width: "100%", marginTop: "10px" }}>
                        <BootstrapInput value={email} id="email" onChange={handleChange} />
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button style={{
                        borderColor: 'lightgray',
                        color: 'black',
                    }} variant="outlined" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="success"
                        disabled={!validateEmail(email)}
                        onClick={onClickChangeEmail}>
                        Change email
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </>
    );


}

export default memo(ChangeEmailPop);