import React from "react";
import styles from "@/styles/components/iconCheckbox.module.scss";

import {
  Box,
  CardMedia,
  Checkbox,
  Collapse,
  Fade,
  Grow,
  Stack,
  styled,
} from "@mui/material";
import assest from "@/json/assest";
import IconChecked from "@/ui/icons/IconChecked";

const StyledCardMedia = styled(CardMedia)``;
const StyledIconCheckboxContainer = styled(Box, {
  shouldForwardProp: (propName) => propName !== "selected",
})`
  position: relative;
  transition: border 0.25s ease-in-out;
  border-radius: 11px;
  border: 2px solid
    ${({ selected }) => {
      return selected ? `var(--activeColor)` : "transparent;";
    }};

  svg {
    width: 25px;
    height: 25px;
    font-size: 14px;
    position: absolute;
    right: -6px;
    bottom: -4px;
    path {
      fill: var(--activeIconColor);
      stroke-width: 3px;
    }
  }
`;
const StyledStack = styled(Stack)`
  span {
    font-size: 14px;
    font-weight: 400;
    color: var(--commonTextColor);
    font-family: "SFProText";
  }
`;
export default function IconCheckbox({ onSelect, selected, id, item }) {
  return (
    <StyledStack flexDirection={"column"} gap={0.6}>
      <StyledIconCheckboxContainer
        component={"div"}
        selected={selected}
        onClick={() => {
          if (onSelect && typeof onSelect === "function") {
            onSelect(id);
          }
        }}
      >
        <StyledCardMedia
          className={styles.imgStores}
          component={"img"}
          src={item?.image}
        />
        {selected && <IconChecked />}
      </StyledIconCheckboxContainer>
      <span>{item?.name}</span>
    </StyledStack>
  );
}
