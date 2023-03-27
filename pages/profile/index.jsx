import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/profile.module.scss";
import useGamodoTheme from "@/hooks/useGamodoTheme";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import assest from "@/json/assest";
import {
  Avatar,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Fade,
} from "@mui/material";
import Box from "@mui/material/Box";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import HomeIcon from "@mui/icons-material/Home";
import LanguageIcon from "@mui/icons-material/Language";
import FiberPinIcon from "@mui/icons-material/FiberPin";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import UserIcon from "@/ui/icons/UserIcon";
import MailIcon from "@/ui/icons/MailIcon";
import PhoneIcon from "@/ui/icons/PhoneIcon";
import LockIcon from "@/ui/icons/LockIcon";
import RightArrowIcon from "@/ui/icons/RightArrowIcon";
import IconModifier from "@/ui/IconModifier/IconModifier";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { profile_data, profile_update } from "@/reduxtoolkit/profile.slice";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import { useRef } from "react";
import { useRouter } from "next/router";
import useNotiStack from "@/hooks/useNotistack";
import moment from "moment";
import { getHostName } from "@/lib/functions/_common.lib";
export async function getServerSideProps(ctx) {
  // let hostname = getHostName(ctx.req.headers.host);
  // ctx.res.setHeader("set-cookie", [`hostname=${hostname}`]);
  return {
    props: {},
  };
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const validationSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First name is required")
    .matches(/^[A-Za-z ]*$/, "Please enter valid first name")
    .max(20, "You cannot enter more than 20 characters"),
  last_name: yup
    .string()
    .required("Last name is required")
    .matches(/^[A-Za-z ]*$/, "Please enter valid last name")
    .max(20, "You cannot enter more than 20 characters"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City name is required"),
  region: yup.string().required("Region is required"),
  phone_no: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]*$/, "Please enter a valid phone number")
    .transform((value) => value),
  zip: yup
    .string()
    .required("Zip code is required")
    .matches(/^[0-9]*$/, "Please enter a valid zip code")
    .max(6, "Please enter valid zip code")
    .transform((value) => value),
  email_address: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
});

function index() {
  const router = useRouter();
  const { toastSuccess, toastError } = useNotiStack();
  const dispatch = useDispatch();
  const { profileData, countryData, profile_update_status, status } =
    useSelector((state) => state?.profile);

  const change_passwod_timing =
    profileData?.last_change_password_ts?.split(" ");
  const change_password_timing_final =
    change_passwod_timing?.length > 0 && change_passwod_timing[0];

  var startDate = moment(change_password_timing_final, "YYYY-MM-DD");
  var endDate = moment(new Date(), "YYYY-MM-DD");
  var result = endDate.diff(startDate, "days");

  const [error, seterror] = useState("");
  const [profile_image, setProfile_image] = useState("");
  const [phone, setPhone] = useState("");
  const [countries, setcountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [afterResSelectedCountry, setafterResSelectedCountry] = useState("");
  const country_ID = countries?.find(
    (item) => item?.country_name == selectedCountry
  )?.country_id;

  const afterResCountry_name = countries?.find(
    (item) => item?.country_id == afterResSelectedCountry
  )?.country_name;

  useEffect(() => {
    if (profileData) {
      setafterResSelectedCountry(profileData?.country_id);
    }
  }, [profileData]);

  useEffect(() => {
    if (afterResCountry_name) {
      setSelectedCountry(afterResCountry_name);
    }
  }, [afterResCountry_name]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    if (country_ID == undefined) {
      seterror("Please select any country");
    } else if (country_ID !== undefined) {
      seterror("");
    }
    let formData = new FormData();
    if (data && country_ID != undefined) {
      formData.append("profile_image", profile_image);
      formData.append("source", "external");
      formData.append("first_name", data?.first_name);
      formData.append("last_name", data?.last_name);
      formData.append("phone", data?.phone_no);
      formData.append("address", data?.address);
      formData.append("region", data?.region);
      formData.append("zip", data?.zip);
      formData.append("city", data?.city);
      formData.append("country_id", country_ID);
      dispatch(profile_update(formData)).then((res) => {
        if (res?.payload?.status?.error_code == 0) {
          toastSuccess(res?.payload?.status?.message);
        } else {
          toastError(res?.payload?.status?.message);
        }
      });
    }
  };

  const { availableThemes, currentTheme } = useGamodoTheme();

  useEffect(() => {
    dispatch(profile_data({ source: "external" }));
  }, []);

  useEffect(() => {
    if (profile_update_status == "idle") {
      dispatch(profile_data({ source: "external" }));
    }
  }, [profile_update_status]);

  useEffect(() => {
    if (profileData) {
      reset({
        first_name: profileData?.first_name,
        last_name: profileData?.last_name,
        email_address: profileData?.email,
        phone_no: profileData?.phone,
        address: profileData?.address,
        region: profileData?.region,
        zip: profileData?.zip,
        city: profileData?.city,
        // profile_image: profileData?.profile_image,
      });
      if (countryData?.length > 0) {
        setcountries(countryData);
      }
    }
  }, [profileData, countryData]);

  const profileImageInputRef = useRef(null);

  return (
    <Fade in={true}>
      <div className={styles.page_proile_details}>
        <div
          className={`${
            currentTheme === availableThemes.lightTheme ? "bgLight" : "bgDark"
          }`}
        ></div>
        <BackButton onClick={() => router.push("/home")} />
        <div className="commonTopTitle">
          <h3>Profile</h3>
        </div>
        <div className="scrollSec">
          <div className={styles.mainProfile}>
            <div className={styles.avatar}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <CameraAltIcon
                    style={{ backgroundColor: "white", borderRadius: "50%" }}
                    onClick={() => {
                      profileImageInputRef?.current?.click?.();
                    }}
                  />
                }
              >
                <Avatar
                  alt="Remy Sharp"
                  className={styles.avatarImg}
                  src={
                    profile_image
                      ? URL.createObjectURL(profile_image)
                      : profileData?.profile_image
                      ? profileData?.profile_image
                      : "/assets/images/defaultProfile.png"
                  }
                  sx={{ width: 100, height: 100 }}
                />
              </Badge>
            </div>
            <input
              accept="image/*"
              ref={profileImageInputRef}
              hidden
              type={"file"}
              onChange={(e) => setProfile_image(e.target.files[0])}
            />

            <div className={styles.profileForm}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={6}>
                    <div className={styles.formGroup}>
                      <InputLabel htmlFor="input-with-icon-adornment">
                        First Name
                      </InputLabel>
                      <Input
                        name="first_name"
                        // value={userData.first_name}
                        // onChange={postUserData}
                        placeholder="Enter first name"
                        startAdornment={
                          <InputAdornment position="start">
                            <IconModifier
                              variableName={"inputStartAdornmentColor"}
                              propertiesToChange={{
                                path: ["stroke"],
                                rect: ["stroke"],
                              }}
                            >
                              <UserIcon />
                            </IconModifier>
                          </InputAdornment>
                        }
                        {...register("first_name")}
                      />
                      <div
                        style={{
                          color: "red",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        {errors?.first_name?.message}
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <div className={styles.formGroup}>
                      <InputLabel htmlFor="input-with-icon-adornment">
                        Last Name
                      </InputLabel>
                      <Input
                        name="last_name"
                        // value={userData.last_name}
                        // onChange={postUserData}
                        placeholder="Enter last name"
                        startAdornment={
                          <InputAdornment position="start">
                            <IconModifier
                              variableName={"inputStartAdornmentColor"}
                              propertiesToChange={{
                                path: ["stroke"],
                                rect: ["stroke"],
                              }}
                            >
                              <UserIcon />
                            </IconModifier>
                          </InputAdornment>
                        }
                        {...register("last_name")}
                      />
                      <div
                        style={{
                          color: "red",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        {errors?.last_name?.message}
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <div className={styles.formGroup}>
                      <InputLabel htmlFor="input-with-icon-adornment">
                        Address
                      </InputLabel>
                      <Input
                        name="address"
                        // value={userData.first_name}
                        // onChange={postUserData}
                        placeholder="Enter address"
                        startAdornment={
                          <InputAdornment position="start">
                            <IconModifier
                              variableName={"inputStartAdornmentColor"}
                              propertiesToChange={{
                                path: ["stroke"],
                                rect: ["stroke"],
                              }}
                            >
                              <HomeIcon
                                style={{
                                  color: "transparent",
                                  marginRight: "-6px",
                                  height: "21px",
                                  width: "21px",
                                }}
                              />
                            </IconModifier>
                          </InputAdornment>
                        }
                        {...register("address")}
                      />
                      <div
                        style={{
                          color: "red",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        {errors?.address?.message}
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <div className={styles.formGroup}>
                      <InputLabel htmlFor="input-with-icon-adornment">
                        Region
                      </InputLabel>
                      <Input
                        name="region"
                        // value={userData.first_name}
                        // onChange={postUserData}
                        placeholder="Enter region"
                        startAdornment={
                          <InputAdornment position="start">
                            <IconModifier
                              variableName={"inputStartAdornmentColor"}
                              propertiesToChange={{
                                path: ["stroke"],
                                rect: ["stroke"],
                              }}
                            >
                              <LanguageIcon
                                style={{
                                  color: "transparent",
                                  marginRight: "-6px",
                                  height: "21px",
                                  width: "21px",
                                }}
                              />
                            </IconModifier>
                          </InputAdornment>
                        }
                        {...register("region")}
                      />
                      <div
                        style={{
                          color: "red",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        {errors?.region?.message}
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <div className={styles.formGroup}>
                      <InputLabel htmlFor="input-with-icon-adornment">
                        Zip
                      </InputLabel>
                      <Input
                        name="zip"
                        // type="number"
                        // value={userData.first_name}
                        // onChange={postUserData}
                        placeholder="Enter zip code"
                        startAdornment={
                          <InputAdornment position="start">
                            <IconModifier
                              variableName={"inputStartAdornmentColor"}
                              propertiesToChange={{
                                path: ["stroke"],
                                rect: ["stroke"],
                              }}
                            >
                              <FiberPinIcon
                                style={{
                                  color: "transparent",
                                  marginRight: "-5px",
                                  height: "21px",
                                  width: "21px",
                                }}
                              />
                            </IconModifier>
                          </InputAdornment>
                        }
                        {...register("zip")}
                      />
                      <div
                        style={{
                          color: "red",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        {errors?.zip?.message}
                      </div>
                    </div>
                  </Grid>

                  <Grid item sm={6} xs={6}>
                    <div className={styles.formGroup}>
                      <InputLabel htmlFor="input-with-icon-adornment">
                        Phone
                      </InputLabel>
                      <Input
                        name="phone_no"
                        // type="number"
                        // value={userData.phone}
                        // onChange={postUserData}
                        placeholder="Enter phone number"
                        startAdornment={
                          <InputAdornment position="start">
                            <IconModifier
                              variableName={"inputStartAdornmentColor"}
                              propertiesToChange={{
                                path: ["stroke"],
                                rect: ["stroke"],
                              }}
                            >
                              <PhoneIcon
                                style={{
                                  color: "transparent",
                                  marginRight: "-7px",
                                  height: "21px",
                                  width: "21px",
                                }}
                              />
                            </IconModifier>
                          </InputAdornment>
                        }
                        {...register("phone_no", {
                          onChange: (e) => {
                            setPhone(e.target.value);
                          },
                        })}
                      />
                      <div
                        style={{
                          color: "red",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        {errors?.phone_no?.message}
                      </div>
                    </div>
                  </Grid>

                  <Grid item sm={6} xs={6}>
                    <div className={styles.formGroup}>
                      <InputLabel htmlFor="input-with-icon-adornment">
                        Email
                      </InputLabel>
                      <Input
                        disabled={true}
                        name="email_address"
                        // value={userData.email}
                        // onChange={postUserData}
                        placeholder="Enter email address"
                        startAdornment={
                          <InputAdornment position="start">
                            <IconModifier
                              variableName={"inputStartAdornmentColor"}
                              propertiesToChange={{
                                path: ["stroke"],
                                rect: ["stroke"],
                              }}
                            >
                              <MailIcon />
                            </IconModifier>
                          </InputAdornment>
                        }
                        {...register("email_address")}
                      />
                      <div
                        style={{
                          color: "red",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        {errors?.email_address?.message}
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={6} xs={6}>
                    <div className={styles.formGroup}>
                      <InputLabel htmlFor="input-with-icon-adornment">
                        City
                      </InputLabel>
                      <Input
                        name="city"
                        // value={userData.email}
                        // onChange={postUserData}
                        placeholder="Enter city name"
                        startAdornment={
                          <InputAdornment position="start">
                            <IconModifier
                              variableName={"inputStartAdornmentColor"}
                              propertiesToChange={{
                                path: ["stroke"],
                                rect: ["stroke"],
                              }}
                            >
                              <LocationOnIcon
                                style={{
                                  color: "transparent",
                                  marginRight: "-5px",
                                  height: "21px",
                                  width: "21px",
                                }}
                              />
                            </IconModifier>
                          </InputAdornment>
                        }
                        {...register("city")}
                      />
                      <div
                        style={{
                          color: "red",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        {errors?.city?.message}
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <div className={`${styles.formGroup} ${styles.newGroup}`}>
                      <InputLabel htmlFor="input-with-icon-adornment">
                        Country
                      </InputLabel>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        onChange={(event, newValue) => {
                          setSelectedCountry(newValue);
                        }}
                        value={
                          selectedCountry ? selectedCountry : "Select country"
                        }
                        options={countries?.map(
                          (option) => option?.country_name
                        )}
                        sx={{ width: 328 }}
                        renderInput={(params) => (
                          <TextField {...params} label="" />
                        )}
                      />
                      <div
                        style={{
                          color: "red",
                          marginTop: "5px",
                          marginBottom: "5px",
                        }}
                      >
                        {error}
                      </div>
                    </div>
                  </Grid>

                  <Grid item sm={12} xs={12}>
                    <div className="test">
                      <div className="primaryBtn profilebutton">
                        <MyButton
                          onClick={handleSubmit(onSubmit)}
                          disabled={status == "loading" && true}
                        >
                          {status == "idle" ? "Update profile" : "Loading..."}
                        </MyButton>
                      </div>
                    </div>
                  </Grid>

                  <Grid item sm={12} xs={12}>
                    <div className={styles.settings}>
                      <label>Settings</label>
                      <div
                        style={{ cursor: "pointer" }}
                        className={styles.changePasswordWrap}
                        onClick={() => router.push("/change-password")}
                      >
                        <div className={styles.flexSec}>
                          <IconModifier
                            variableName={"inputStartAdornmentColor"}
                            propertiesToChange={{
                              path: ["stroke"],
                              rect: ["stroke"],
                            }}
                          >
                            <LockIcon />
                          </IconModifier>
                          <div className={styles.passwordTextLeft}>
                            <p>Change Password</p>
                            {result != NaN && (result == 0 || result > 30) ? (
                              <span>
                                Last changed{" "}
                                {result == 0
                                  ? "Today"
                                  : result > 30
                                  ? "1 month ago"
                                  : result + " days ago"}
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className={styles.iconRight}>
                          <IconModifier
                            variableName={"inputStartAdornmentColor"}
                            propertiesToChange={{
                              path: ["fill"],
                              rect: ["fill"],
                            }}
                          >
                            <RightArrowIcon />
                          </IconModifier>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default index;
