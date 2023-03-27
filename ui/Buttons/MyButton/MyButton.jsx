import Button from "@mui/material/Button";
import React, { memo } from "react";
import PropTypes from "prop-types";
import styles from "@/styles/components/button.module.scss";
import { CircularProgress, Fade, styled } from "@mui/material";
const StyledButton = styled(Button)`
  &.Mui-disabled {
    color: white;
  }
  .loading-icon {
    margin-right: 10px;
    svg {
      margin: auto !important;
    }
  }
`;
const MyButtonMemo = ({
  children,
  variant = "contained",
  disabled = false,
  disableElevation = false,
  onClick,
  color = "inherit",
  size = "medium",
  fullWidth = false,
  endIcon,
  startIcon,
  type = "button",
  isLoading = false,
  style,
  className,
  loadingText = "Loading...",
}) => (
  <Fade in={true} unmountOnExit mountOnEnter>
    <StyledButton
      className={styles.button + ` ${className}`}
      variant={variant}
      disabled={disabled || isLoading}
      disableElevation={disableElevation}
      onClick={onClick}
      color={color}
      size={size}
      fullWidth={fullWidth}
      endIcon={endIcon}
      startIcon={startIcon}
      type={type}
      // style={style}
    >
      {isLoading ? (
        <>
          <CircularProgress
            color="inherit"
            size={"18px"}
            className="loading-icon"
          />{" "}
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </StyledButton>
  </Fade>
);
MyButtonMemo.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  disabled: PropTypes.string,
  disableElevation: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
  size: PropTypes.string,
  fullWidth: PropTypes.string,
  type: PropTypes.string,
  endIcon: PropTypes.node,
  startIcon: PropTypes.node,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
};

const MyButton = memo(MyButtonMemo);

export default MyButton;
