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
import { setIsAuthenticate, setAuthenticateData } from "@/reduxtoolkit/profile.slice";
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
  const { isAuthenticate, authenticateData, memberData, member_verify_status } = useSelector((state) => state?.profile);
  const { email, ip, token } = router?.query

  const INTERVAL_MAX_COUNT = 6
  const INTERVAL_RELOAD_TIME = 10000
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

  const updateStatus = (status, ind = null) => {
    if (!ind) {
      ind = rewardList?.findIndex((e) => e.status == 'pending')
    }
    if (ind >= 0) {
      let lst = [...rewardList]
      lst[ind].status = status
      setRewardList(lst)
    }

  }

  const lst = useMemo(() => rewardList, [rewardList]);


  const verifyEmailAndIp = async() => {

    let count = localStorage.getItem("verificationCount") ? localStorage.getItem("verificationCount") : 0;
    let enrollMaxLimit = localStorage.getItem("verificationMaxLimit") ? localStorage.getItem("verificationMaxLimit") : 4;
    let response = {};

    response.token = null;
    response.status = intervalCount < INTERVAL_MAX_COUNT ? 'email-ip-pending' : 'rejected';

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

            res.token = res?.payload?.result?.data?.token;
            res.status = 'verified';


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
            response.status = intervalCount < INTERVAL_MAX_COUNT ? 'email-ip-pending' : 'rejected';

            // console.log('res',response)


          }
        });
      } else {

        // updateStatus('rejected', 5)
        // updateStatus('rejected', 6)

        response.token = null;
        response.status = intervalCount < INTERVAL_MAX_COUNT ? 'email-ip-pending' : 'rejected';

      }
    } else {
      let c = localStorage.getItem("verificationCount") ? localStorage.getItem("verificationCount") : 0;
      let enrollMaxLimit = localStorage.getItem("verificationMaxLimit") ? localStorage.getItem("verificationMaxLimit") : 4;
      if (Number(c) === Number(enrollMaxLimit)) {
        // updateStatus('rejected', 5)
        // updateStatus('rejected', 6)

        res.token = null;
        res.status = intervalCount < INTERVAL_MAX_COUNT ? 'email-ip-pending' : 'rejected';
      }

    }
    // console.log('return')

    intervalCount++
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

      // var refreshId = setInterval(async function () {
      //   console.log('bef',intervalCount)
      //   if (intervalCount < INTERVAL_MAX_COUNT) {
      //     var properID = await verifyEmailAndIp();
      //     // if (properID.status == 'verified') {

      //     // } else {
      //     //   console.log(properID.status)
      //       updateStatus(properID.status, 5)
      //       updateStatus(properID.status, 6)
      //     // }
      //     console.log(intervalCount)
      //     console.log(properID)

      //   }else{
      //     console.log('else')
      //   }

      //   // if (properID > 0) {
      //   //   clearInterval(refreshId);
      //   // }
      // }, INTERVAL_RELOAD_TIME);

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


  const memoList = useMemo(() => rewardList.map(list => {
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
              list.status === 'email-ip-pending' ?

                <CircularProgress
                  style={{
                    width: 20,
                    height: 20,
                    // color: "red",
                    // visibility: list.status === 'pending' ? "hidden" : "visible"
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
  }), [rewardList])


  const onClickRetry = () => {

    updateStatus('pending', 5)
    updateStatus('pending', 6)
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
