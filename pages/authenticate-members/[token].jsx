import ProductCard from "@/components/ProductCard/ProductCard";
import assest from "@/json/assest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from "next/link";
import React, { useMemo, useEffect } from "react";
import SingleHeader from "@/layout/Headers/SingleHeader";
import { getHostName } from "@/lib/functions/_common.lib";
// import Wrapper from "@/layout/Wrappers/Wrapper";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import CachedIcon from '@mui/icons-material/Cached';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticate, setAuthenticateData, setIntervalCount } from "@/reduxtoolkit/profile.slice";
import { verify_member } from "@/reduxtoolkit/profile.slice";
import CancelIcon from '@mui/icons-material/Cancel';
import dynamic from "next/dynamic";
// import AuthenticatePop from "../../Components/Popups/AuthenticatePop";
import AuthenticatePopup from "@/components/Popups/AuthenticatePopup";
import { Cookies } from "react-cookie";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';

const Wrapper = dynamic(() => import("@/layout/Wrappers/Wrapper"), {
  ssr: false,
});

export default function index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cookie = new Cookies();
  const { isAuthenticate,
    authenticateData,
    memberData,
    member_verify_status,
    // intervalCount
  } = useSelector((state) => state?.profile);
  const { email, ip, token } = router?.query;

  const INTERVAL_MAX_COUNT = 6
  const INTERVAL_RELOAD_TIME = 5000
  // const [intervalCount, setIntervalCount] = React.useState(0);
  let intervalCount = 0


  const [ratio, setRatio] = React.useState(0);


  const [rewardList, setRewardList] = React.useState([
    {
      label: "50 casino games",
      status: "pending"
    },
    {
      label: "25 puzzel challanges",
      status: "pending"
    },
    {
      label: "Daily trivia contests",
      status: "pending"
    },
    {
      label: "Walmart, Target, Amazon deals",
      status: "pending"
    },
    {
      label: "Upcoming movie trailers",
      status: "pending"
    },
    {
      label: "Ip address check",
      status: "pending"
    },
    {
      label: "Email address verified",
      status: "pending"
    },

  ]);

  const [rewardList2, setRewardList2] = React.useState([
    {
      label: "50 casino games",
      status: "pending"
    },
    {
      label: "25 puzzel challanges",
      status: "pending"
    },
    {
      label: "Daily trivia contests",
      status: "pending"
    },
    {
      label: "Walmart, Target, Amazon deals",
      status: "pending"
    },
    {
      label: "Upcoming movie trailers",
      status: "pending"
    },
    {
      label: "Ip address check",
      status: "pending"
    },
    {
      label: "Email address verified",
      status: "pending"
    },

  ]);


  const updateStatus = (status, ind = null) => {
    if (!ind) {
      ind = rewardList?.findIndex((e) => e.status == 'pending')
    }
    if (ind >= 0) {
      let lst = [...rewardList]
      lst[ind].status = status
      setRewardList(lst)
      setRewardList2(lst)

    }

  }

  const lst = useMemo(() => rewardList, [rewardList]);


  const verifyEmailAndIp = async () => {

    let count = localStorage.getItem("verificationCount") ? localStorage.getItem("verificationCount") : 0;
    let enrollMaxLimit = localStorage.getItem("verificationMaxLimit") ? localStorage.getItem("verificationMaxLimit") : 4;
    let response = {};

    response.token = null;
    response.status = 'pending';

    if (rewardList.filter((e) => e.status === 'pending').length > 0 && Number(count) !== Number(enrollMaxLimit)) {


      let payload = {
        source: "external",
        email: email,
        ip_address: ip,
        token: token,
      }

      if (email && ip && token) {
        await dispatch(verify_member(payload)).then((res) => {
          if (res?.payload?.status?.error_code == 0) {

            response.token = res?.payload?.result?.data?.token;
            response.status = 'verified';


            cookie.set("external-token", res?.payload?.result?.data?.token, {
              path: "/",
              maxAge: 86400, // Expires after 1 day
              sameSite: true,
            });

            cookie.set("token", res?.payload?.result?.data?.token, {
              path: "/",
              maxAge: 86400, // Expires after 1 day
              sameSite: true,
            });

            // updateStatus('verified', 5)
            // updateStatus('verified', 6)
            // localStorage.setItem("verificationCount", 0)
            // localStorage.setItem("accountVerification", true)
            // router.push("/home")
          } else {
            // let c = localStorage.getItem("verificationCount") ? localStorage.getItem("verificationCount") : 0;
            // localStorage.setItem("verificationCount", Number(c) + 1);
            if (res?.payload.result?.data?.autoenroll_max_retry_limit) {
              localStorage.setItem("verificationMaxLimit", Number(res?.payload.result?.data?.autoenroll_max_retry_limit) + 1)
            } else {
              localStorage.setItem("verificationMaxLimit", 4)
            }
            // console.log('err')


            // updateStatus('rejected', 5)
            // updateStatus('rejected', 6)

            response.token = null;
            response.status = 'rejected';

            // console.log('res',response)


          }
        });
      } else {

        // updateStatus('rejected', 5)
        // updateStatus('rejected', 6)

        response.token = null;
        response.status = 'rejected';

      }
    } else {
      let c = localStorage.getItem("verificationCount") ? localStorage.getItem("verificationCount") : 0;
      let enrollMaxLimit = localStorage.getItem("verificationMaxLimit") ? localStorage.getItem("verificationMaxLimit") : 4;
      if (Number(c) === Number(enrollMaxLimit)) {
        // updateStatus('rejected', 5)
        // updateStatus('rejected', 6)

        response.token = null;
        response.status = 'rejected';
      }

    }
    // let ic = Number(intervalCount) + 1
    // console.log('return', ic)
    // dispatch(setIntervalCount(ic))
    intervalCount = intervalCount + 1

    console.log('return', intervalCount)
    return response;


  }



  useEffect(() => {

    localStorage.setItem("isExternalUser", true)

    if (!localStorage.getItem("verificationCount")) {
      localStorage.setItem("verificationCount", 0);
    }


    let interval;
    if (rewardList.filter((e) => e.status === 'verified').length < 5) {
      interval = setInterval(() => updateStatus('verified'), 1000);

    } else {

      clearInterval(interval);

      console.log('in else for 6 and 7')

      let c = localStorage.getItem("verificationCount") ? localStorage.getItem("verificationCount") : 0;
      let enrollMaxLimit = localStorage.getItem("verificationMaxLimit") ? localStorage.getItem("verificationMaxLimit") : 4;
      if (Number(c) === Number(enrollMaxLimit)) {
        let lst = [...rewardList]
        lst[5].status = 'rejected'
        lst[6].status = 'rejected'
        setRewardList2(lst)


      } else {

        var refreshId = setInterval(async function () {

          console.log('bef', intervalCount)
          console.log('pending count', rewardList.filter((e) => e.status === 'pending').length)
          // console.log('v count', rewardList.filter((e) => e.status === 'verified').length)



          if (intervalCount < INTERVAL_MAX_COUNT && rewardList.filter((e) => e.status === 'pending').length) {
            console.log('in if cond')

            const verifyData = await verifyEmailAndIp();
            if (verifyData.status == 'verified') {

              console.log(verifyData.status)


              let lst = [...rewardList]
              lst[5].status = 'verified'
              lst[6].status = 'verified'
              setRewardList2(lst)
              // setRewardList(lst)


              localStorage.setItem("verificationCount", 0)
              localStorage.setItem("accountVerification", true)
              router.push("/home")

            } else {
              // console.log(verifyData.status)
            }
            console.log(intervalCount)
            console.log(verifyData)
            console.log('-----------------------------------')


          } else {
            if (!rewardList2.filter((e) => e.status === 'rejected').length) {
              // updateStatus('rejected', 5)
              // updateStatus('rejected', 6)
              if (rewardList.filter((e) => e.status === 'verified').length === rewardList.length) {
                let lst = [...rewardList]
                lst[5].status = 'verified'
                lst[6].status = 'verified'
                setRewardList2(lst)
              } else {



                let lst = [...rewardList]
                lst[5].status = 'rejected'
                lst[6].status = 'rejected'
                setRewardList2(lst)

                console.log('else')
                intervalCount = 0

                let c = localStorage.getItem("verificationCount") ? localStorage.getItem("verificationCount") : 0;
                localStorage.setItem("verificationCount", Number(c) + 1);
              }

              // clearInterval(refreshId);
            } else if (rewardList.filter((e) => e.status === 'rejected').length) {
              console.log('rejected')
              console.log('rejected count', rewardList.filter((e) => e.status === 'rejected').length)

            }
            // intervalCount = 0

            clearInterval(refreshId);

          }


        }, INTERVAL_RELOAD_TIME);
      }
      // let count = localStorage.getItem("verificationCount") ? localStorage.getItem("verificationCount") : 0;
      // let enrollMaxLimit = localStorage.getItem("verificationMaxLimit") ? localStorage.getItem("verificationMaxLimit") : 4;


      // if (rewardList.filter((e) => e.status === 'pending').length > 0 && Number(count) !== Number(enrollMaxLimit)) {

      //   clearInterval(interval);

      //   let payload = {
      //     source: "external",
      //     email: email,
      //     ip_address: ip,
      //     token: token,
      //   }

      //   if (email && ip && token) {
      //     dispatch(verify_member(payload)).then((res) => {
      //       if (res?.payload?.status?.error_code == 0) {

      //         cookie.set("external-token", res?.payload?.result?.data?.token, {
      //           path: "/",
      //           maxAge: 86400, // Expires after 1 day
      //           sameSite: true,
      //         });

      //         cookie.set("token", res?.payload?.result?.data?.token, {
      //           path: "/",
      //           maxAge: 86400, // Expires after 1 day
      //           sameSite: true,
      //         });

      //         updateStatus('verified', 5)
      //         updateStatus('verified', 6)
      //         localStorage.setItem("verificationCount", 0)
      //         localStorage.setItem("accountVerification", true)
      //         router.push("/home")
      //       } else {
      //         let c = localStorage.getItem("verificationCount") ? localStorage.getItem("verificationCount") : 0;
      //         localStorage.setItem("verificationCount", Number(c) + 1);
      //         if (res?.payload.result?.data?.autoenroll_max_retry_limit) {
      //           localStorage.setItem("verificationMaxLimit", Number(res?.payload.result?.data?.autoenroll_max_retry_limit) + 1)
      //         } else {
      //           localStorage.setItem("verificationMaxLimit", 4)
      //         }
      //         updateStatus('rejected', 5)
      //         updateStatus('rejected', 6)

      //       }
      //     });
      //   } else {

      //     updateStatus('rejected', 5)
      //     updateStatus('rejected', 6)

      //   }
      // } else {
      //   let c = localStorage.getItem("verificationCount") ? localStorage.getItem("verificationCount") : 0;
      //   let enrollMaxLimit = localStorage.getItem("verificationMaxLimit") ? localStorage.getItem("verificationMaxLimit") : 4;
      //   if (Number(c) === Number(enrollMaxLimit)) {
      //     updateStatus('rejected', 5)
      //     updateStatus('rejected', 6)
      //   }

      // }


    }
    return () => {
      clearInterval(interval);
    };
  }, [rewardList]);


  useEffect(() => {
    var completedCount = 0;
    var total = 0;

    rewardList.forEach((task) => {
      if (task.status == "verified") {
        completedCount++;
      }
      total++;
    });
    var percentage = (completedCount / total) * 100;
    setRatio(Math.round(percentage))

  }, [rewardList]);


  const memoList = useMemo(() => rewardList2.map(list => {
    return (
      <li class="verifying-list__item" >
        <div class="icon-circle">
          {
            list.status === 'rejected' ?
              <>
                <CancelIcon
                  style={{
                    width: 20,
                    height: 20,
                    color: "red",
                    visibility: list.status === 'pending' ? "hidden" : "visible"
                  }}
                />
              </>
              :
              // list.status === 'email-ip-pending' ?

              //   <CircularProgress
              //     style={{
              //       width: 20,
              //       height: 20,
              //       // color: "red",
              //       // visibility: list.status === 'pending' ? "hidden" : "visible"
              //     }}

              //   />
              //   :
             ( list.label == 'Ip address check' || list.label == 'Email address verified') &&
                rewardList.filter((e) => e.status === 'verified').length == 5 ?


                  <CircularProgress
                    style={{
                      width: 20,
                      height: 20,
                      // color: "red",
                      visibility: rewardList.filter((e) => e.status === 'verified').length > 4 ? "visible" : "hidden"
                    }}

                  />

                  :

                  <CheckCircleIcon
                    style={{
                      width: 20,
                      height: 20,
                      color: "green",
                      visibility: list.status === 'pending' ? "hidden" : "visible"
                    }}
                  />


          }
        </div>
        <p className={list.status + "-varification-text"}>{list.label}</p>
      </li>
    )
  }), [rewardList, rewardList2])


  const onClickRetry = () => {
    // intervalCount = 0
    let lst = [...rewardList]
    lst[5].status = 'pending'
    lst[6].status = 'pending'
    setRewardList(lst)
    // updateStatus('pending', 5)
    // updateStatus('pending', 6)
  }



  // const onClickBtn = () => {
  //   let data = router?.query && router?.query !== null && router?.query !== undefined ? router?.query : null
  //   dispatch(setIsAuthenticate(false))
  //   dispatch(setAuthenticateData(data))
  //   router.push("/home_")
  // }
  // console.log(router.query)


  return (
    // <div style={{
    //   height: "100vh"
    //   // , display: "flex"
    //   // , justifyContent: "center", alignItems: "center"
    // }}>
    //   <Wrapper type={"coupons"} disableFooter>
    //     <div id='container_'>
    //       <div id='top_'></div>
    //       <div id='middle_'>
    //         <h1>Client’s website</h1>

    //         <div className="primaryBtn profilebutton" style={{ width: "335px" }}>
    //           <MyButton

    //             onClick={() => onClickBtn()}
    //           >
    //             <CachedIcon />&nbsp;  Go to Daily Rewards
    //           </MyButton>
    //         </div>
    //       </div>
    //       <div id='bottom_'>
    //         <span>One or more points goes unchecked</span>
    //       </div>
    //     </div>
    //   </Wrapper>
    // </div>
    <Wrapper>
      <AuthenticatePopup memoList={memoList} updateStatus={updateStatus} ratio={ratio} rewardList={rewardList} onClickRetry={onClickRetry} />
    </Wrapper>
  );
}
