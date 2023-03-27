import { useRouter } from "next/navigation";

const useRedirect = (path) => {
  const router = useRouter();

  const redirect = () => {
    router.push(path);
  };
  return { redirect };
};

export default useRedirect;
