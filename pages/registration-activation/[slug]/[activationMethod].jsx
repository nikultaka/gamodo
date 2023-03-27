import Stepper from "@/components/GetStarted/Stepper";

export function getServerSideProps(ctx) {
  const token = ctx?.req?.cookies?.["token"];
  const isFirst = ctx?.req?.cookies?.["isFirst"];
  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  } else if (isFirst === "false") {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
}

export default function index() {
  return <Stepper />;
}
