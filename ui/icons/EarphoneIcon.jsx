import React from "react";

function EarphoneIcon({ className }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19 17.1725V10.1725C19 5.20193 14.9706 1.17249 10 1.17249C5.02944 1.17249 1 5.20193 1 10.1725V17.1725"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={className}
      />
      <path
        d="M14 13.1725C14 12.0679 14.8954 11.1725 16 11.1725H17C18.1046 11.1725 19 12.0679 19 13.1725V17.1725C19 18.2771 18.1046 19.1725 17 19.1725H16C14.8954 19.1725 14 18.2771 14 17.1725V13.1725Z"
        stroke="white"
        strokeWidth="1.5"
        className={className}
      />
      <path
        d="M6 13.1725C6 12.0679 5.10457 11.1725 4 11.1725H3C1.89543 11.1725 1 12.0679 1 13.1725V17.1725C1 18.2771 1.89543 19.1725 3 19.1725H4C5.10457 19.1725 6 18.2771 6 17.1725V13.1725Z"
        stroke="white"
        strokeWidth="1.5"
        className={className}
      />
    </svg>
  );
}

export default EarphoneIcon;
