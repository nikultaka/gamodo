/* eslint-disable react/destructuring-assignment */
import propTypes from "prop-types";
import React, { createContext, useEffect, useMemo } from "react";
import useGamodoThemeProvider from "@/hooks/useGamodoThemeProvider";
import WithSiteConfigsSeo from "@/components/SEO/WithSiteConfigsSeo";

export const GamodoThemeContext = createContext({});

function GamodoThemeProvider(props) {
  const values = useGamodoThemeProvider();
  return (
    <GamodoThemeContext.Provider value={useMemo(() => values, [values])}>
      <WithSiteConfigsSeo isUserAgentMobile={props?.isUserAgentMobile} />
      {props?.children}
    </GamodoThemeContext.Provider>
  );
}
GamodoThemeProvider.propTypes = {
  children: propTypes.node,
};
export default GamodoThemeProvider;

/* Exporting the FiltersConsumer as a named export. */
export const GamodoThemeConsumer = GamodoThemeContext.Consumer;
