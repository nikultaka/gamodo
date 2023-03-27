import OfflineModal from "@/components/OfflineModal/OfflineModal";
import NextProgress from "next-progress";
import Header from "../Headers/Header";
import Footer from "../Footers/Footer";
import NotificationPopup from "@/components/Popups/NotificationPopup";

// DYNAMIC IMPORT

const Wrapper = ({ children, headerProps, disableFooter, type }) => {
  return (
    <>
      <NextProgress
        height={8}
        color={"var(--nextProgressBarColor)"}
        options={{ showSpinner: false }}
      />
      {
        type != "coupons" &&
          type != "blogs" &&
          type != "ebooks" &&
          type != "audiobooks" &&
          type != "alltodaysdeals" &&
          type != "favourite" &&
          type != "search"
        // <NotificationPopup />
      }

      {type != "coupons" &&
        type != "blogs" &&
        type != "ebooks" &&
        type != "audiobooks" &&
        type != "alltodaysdeals" &&
        type != "favourite" &&
        type != "search" && <Header {...headerProps} hideProfile />}

      {children}
      {!disableFooter && type != "blogs" && type != "storelist" && <Footer />}
      <OfflineModal />
    </>
  );
};

export default Wrapper;
