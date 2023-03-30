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

const AuthenticatePop = ({ memoList, updateStatus, ratio }) => {

    const handleClose = () => {

    }

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
                        height={100}
                        width={100}
                        style={{
                            objectFit: "contain"
                        }}
                    />
                    <h5 style={{ marginBottom: "5%" }}>{"Creating your account"}</h5>
                    <div style={{ textAlign: "end", marginBottom: "2%" }}>
                        <span>{ratio}%</span>
                    </div>
                    <BorderLinearProgress variant="determinate" value={ratio} />
                    <div style={{ marginTop: "10%", paddingBottom: "0px" }}>
                        <ul class="verifying-list" style={{ textAlign: "start" }}>
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
                    <div>
                        <p style={{ fontWeight: 700 }}>We cannot verify your account at this time. Please check your email for an activation link from:</p>
                        <h3 style={{ marginTop: "10px" }}>support@dailyrewards.me</h3>

                    </div>
                    <div className="primaryBtn home_primarybtn" style={{ marginTop: "15px" }} >
                        <MyButton

                            onClick={() => updateStatus()}
                        >
                            <strong>RETRY</strong>
                        </MyButton>
                    </div>
                </DialogContent>
                {/* <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose}>Agree</Button>
          </DialogActions> */}
            </Dialog>
        </>
    );


}

export default memo(AuthenticatePop);