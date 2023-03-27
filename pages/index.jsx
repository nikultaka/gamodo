import Stepper from "@/components/GetStarted/Stepper";

export function getServerSideProps(ctx) {
  // const token = ctx?.req?.cookies?.["token"];
  // const isFirst = ctx?.req?.cookies?.["isFirst"];
  if (ctx?.req?.url === "/") {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  // else if (isFirst === "false") {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/login",
  //     },
  //   };
  // }

  return {
    props: {},
  };
}

export default function index() {
  return <Stepper />;
}
