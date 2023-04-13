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
import LoopIcon from '@mui/icons-material/Loop';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 21,


    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: 'unset'
        // theme.palette.grey[theme.palette.mode === "light" ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
        // borderRadius: 5,
        // backgroundColor: "black"
        background: 'linear-gradient(90deg, #C350CB 8.33%, #290BF7 83.37%)',
        // background: 'linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB)',
        animation: 'gradient 15s ease infinite',
        '-webkit-animation': 'Gradient 15s ease infinite',
        '-moz-animation': 'Gradient 15s ease infinite',
        // mixBlendMode: 'normal',
        borderRadius: '21px',
        // boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)'
    }
}));

const AuthenticatePopup = ({ memoList, updateStatus, ratio, rewardList, onClickRetry }) => {

    const handleClose = () => {

    }

    let verifyTime = localStorage.getItem("verificationCount") ? localStorage.getItem("verificationCount") : 0;
    let enrollMaxLimit = localStorage.getItem("verificationMaxLimit") ? localStorage.getItem("verificationMaxLimit") : 4;

    // console.log('enrollMaxLimit', enrollMaxLimit)


    return (
        <>
            <Dialog
                open={true}
                TransitionComponent={Transition}
                fullWidth={true}
                maxWidth={'sm'}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    backdropFilter: "blur(5px)",
                }}
            >

                {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent style={{ textAlign: "center" }}>
                    <Image
                        loading="lazy"
                        src={assest.DailyRewards}
                        alt="rewards"
                        height={77}
                        width={127}
                        style={{
                            objectFit: "contain"
                        }}
                    />
                    <h5 style={{ marginBottom: "5%", marginTop: "5%", fontWeight: "400", fontSize: "16px" }}>{"Creating your account"}</h5>
                    <div style={{ textAlign: "end", marginBottom: "2%" }}>
                        <span>{ratio}%</span>
                    </div>
                    <div
                        style={{
                            // border: '1px solid lightgray',
                            padding: '6px',
                            borderRadius: '21px',
                            boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)'
                        }}

                    >
                        <BorderLinearProgress variant="determinate" value={ratio} />
                    </div>
                    <div style={{ marginTop: "10%", paddingBottom: "0px" }}>
                        <ul class="verifying-list" style={{ textAlign: "start", padding: '0px 20px' }}>
                            {
                                memoList
                                // lsts.map((list, i) => {
                                //   return (
                                //     <>
                                //       <li class="verifying-list__item" >
                                //         <div class="icon-circle">
                                //           <CheckCircleIcon style={{
                                //             width: 20,
                                //             height: 20,
                                //             color: "green",
                                //             visibility: list.status === 'pending' ? "hidden" : "visible"
                                //           }} />
                                //         </div>
                                //         <p className={list.status + "-varification-text"}>{list.label}</p>
                                //       </li>
                                //     </>
                                //   )
                                // })

                            }

                        </ul>
                    </div>
                    {
                        rewardList.filter((e) => e.status === 'rejected').length > 0 ?
                            <>
                                {
                                    Number(verifyTime) < Number(enrollMaxLimit) ?
                                        <div className="primaryBtn " style={{ marginTop: "15px", }} >
                                            <MyButton

                                                onClick={() => onClickRetry()}
                                                style={{ width: "250px", boxShadow: "none" }}
                                            >
                                                <LoopIcon />&nbsp;
                                                <strong>RETRY ({enrollMaxLimit - verifyTime})</strong>
                                            </MyButton>
                                        </div>
                                        :
                                        <div>
                                            <p style={{ fontWeight: 700 }}>We cannot verify your account at this time. Please check your email for an activation link from:</p>
                                            <h3 style={{ marginTop: "10px" }}>support@dailyrewards.me</h3>

                                        </div>
                                }


                            </>
                            :
                            <>
                                {
                                    rewardList.filter((e) => e.status === 'rejected').length === 0 &&
                                    rewardList.filter((e) => e.status === 'pending').length === 0 &&
                                    <>
                                        {/* <h1>Verified</h1> */}
                                    </>
                                }

                            </>
                    }

                </DialogContent>
                {/* <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions> */}
            </Dialog >
        </>
    );


}

export default memo(AuthenticatePopup);