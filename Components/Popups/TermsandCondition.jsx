import React from 'react';
import styles from "@/styles/pages/choosepassword.module.scss";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import { Dialog, DialogContent } from '@mui/material';
import CancelIcon from "@mui/icons-material/Cancel";

function TermsandCondition({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} className={styles.termsModal}>
            <DialogContent>
                <div className={styles.modalHeader}>
                    <h3>Terms and Conditions</h3>
                    <div className="closeAction">
                    <MyButton onClick={onClose} >
                        <CancelIcon />
                    </MyButton>
                </div>
                </div>
                <div className={styles.termsContent}>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default TermsandCondition