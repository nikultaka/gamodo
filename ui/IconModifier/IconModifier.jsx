import { Box, styled } from "@mui/material";
import propTypes from "prop-types";
import React from "react";
const StyledBox = styled(Box, {
  shouldForwardProp: (propName) =>
    propName !== "variableName" && propName !== "propertiesToChange",
})`
  ${({ propertiesToChange, variableName }) => {
    let colorString = ``;
    Object.entries(propertiesToChange).map(([property, fields]) => {
      if (Array.isArray(fields)) {
        let fieldsFill = ``;
        fields.map((field) => {
          fieldsFill = fieldsFill + `${field}:var(--${variableName});`;
        });
        colorString =
          colorString +
          `${property} {
                ${fieldsFill}
            }`;
      }
    });
    return colorString;
  }}
`;

// let propertiesToChange = { path: ["fill", "stroke"] };

export default function IconModifier({
  children,
  boxProps,
  variableName,
  propertiesToChange = {},
}) {
  return (
    <StyledBox
      {...boxProps}
      variableName={variableName}
      propertiesToChange={propertiesToChange}
    >
      {children}
    </StyledBox>
  );
}

IconModifier.propTypes = {
  propertiesToChange: propTypes.object.isRequired,
  variableName: propTypes.string.isRequired,
  boxProps: propTypes.any,
  children: propTypes.node.isRequired,
};
