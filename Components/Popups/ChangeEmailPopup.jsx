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
import styles from "@/styles/pages/profile.module.scss";

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
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import {
    // Avatar,
    // FormControl,
    Input,
    InputAdornment,
    // InputLabel,
    // Fade,
} from "@mui/material";
import IconModifier from "@/ui/IconModifier/IconModifier";
import MailIcon from "@/ui/icons/MailIcon";
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box";

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




const ChangeEmailPopup = ({ open, setOpen, email, handleChange, validateEmail, onClickChangeEmail }) => {


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
                <BootstrapDialogTitle id="customized-dialog-title changeEmailPoupup" onClose={handleClose}>
                    {/* Change your email */}
                </BootstrapDialogTitle>
                <DialogContent style={{ paddingTop: "16px", paddingBottom: 'unset' }} >
                    <div style={{
                        border: '1px solid #D9D9D9',
                        filter: 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.25))',
                        borderRadius: '10px',
                        padding: '10px',

                    }}>

                        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                            <WarningAmberOutlinedIcon style={{ color: "#BA8900" }} />
                            <div>
                                <h4>Note:</h4>
                                <p style={{ marginTop: "5px" }}>This will affect your all accounts. <strong>Learn more</strong></p>
                            </div>
                        </div>


                    </div>

                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <Image
                            loading="lazy"
                            src={assest.confirmMail}
                            alt={"rewards_"}

                            height={50}
                            width={50}
                            style={{
                                width: "50%",
                                height: "50%"
                                // color: "green",
                                // objectFit: "contain",
                                // display: list.status === 'pending' ? "none" : "block"
                                // visibility: list.status === 'pending' ? "hidden" : "visible"
                            }}
                        />
                        <p style={{ marginTop: "22.9px" }}>We will send you an email to the new address to verify the account.</p>


                        <div className={styles.page_proile_details}>
                            <div className={styles.mainProfile}>
                                <div className={styles.profileForm} style={{ padding: "18px 20px",paddingBottom:"13px" }}>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={2} style={{ width: 'calc(100% + 32px)' }}>

                                            <Grid item sm={12} xs={12} style={{ paddingTop: "unset", marginTop: "13px", paddingLeft: "unset" }}>
                                                <div className={styles.formGroup}>
                                                    {/* <div style={{ border: "1px solid rgba(24, 119, 242, 0.2)", borderRadius: "10px", padding: "10px" }} > */}

                                                    {/* <InputLabel htmlFor="input-with-icon-adornment">
                                                Phone
                                            </InputLabel> */}
                                                    <Input
                                                        // disabled={true}
                                                        name="email"
                                                        // type="number"

                                                        value={email}
                                                        onChange={handleChange}
                                                        placeholder="Email Address"
                                                        startAdornment={
                                                            <InputAdornment position="start">
                                                                <IconModifier
                                                                    variableName={"inputStartAdornmentColorgray"}
                                                                    propertiesToChange={{
                                                                        path: ["stroke"],
                                                                        rect: ["stroke"],
                                                                    }}
                                                                    style={{
                                                                        color: "#5F5F5F",
                                                                        marginRight: "-7px",
                                                                        height: "21px",
                                                                        width: "21px",
                                                                    }}
                                                                >
                                                                    <MailIcon
                                                                        style={{
                                                                            color: "#5F5F5F",
                                                                            marginRight: "-7px",
                                                                            height: "21px",
                                                                            width: "21px",
                                                                        }}
                                                                    />
                                                                </IconModifier>
                                                            </InputAdornment>
                                                        }
                                                        style={{ border: '1px solid #D9D9D9' }}
                                                    // {...register("phone_no", {
                                                    //   onChange: (e) => {
                                                    //     setPhone(e.target.value);
                                                    //   },
                                                    // })}
                                                    />


                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                </div>
                            </div>

                        </div>

                        {/* </div> */}


                    </div>
                    {/* <Alert severity="warning">
                        This will affect 7 stores and your Partner account. if you'd like to change your email address for a single store, lern
                        how to <a style={{ color: "unset", textDecoration: "underline" }} href='#'>transfer ownership</a>.
                    </Alert> */}

                </DialogContent>


                {/* <Typography gutterBottom>
                        We'll send you an email to the new address to verify that you own it
                    </Typography>
                    <InputLabel htmlFor="bootstrap-input"
                    // style={{fontSize:"18px",fontWeight:"700"}}
                    >
                        New email
                    </InputLabel>
                    <FormControl variant="standard" style={{ width: "100%", marginTop: "10px" }}>
                        <BootstrapInput value={email} id="email" onChange={handleChange} />
                    </FormControl> */}


                <DialogActions style={{ justifyContent: "center" }}>
                    {/* <Button style={{
                        borderColor: 'lightgray',
                        color: 'black',
                    }} variant="outlined" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button> */}
                    <Button variant="contained" color="info"
                        style={{
                            width: "152px", height: "41px", background: '#1877F2',
                            borderRadius: '10px', boxShadow: "none", marginBottom: "24px"
                        }}
                        disabled={!validateEmail(email)}
                        onClick={onClickChangeEmail}>
                        Send
                    </Button>
                </DialogActions>
            </BootstrapDialog >
        </>
    );


}

export default memo(ChangeEmailPopup);