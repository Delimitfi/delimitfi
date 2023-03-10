import React from "react";
import styled from "styled-components";
import { LogoIcon } from "../Svg";
import Text from "../Text/Text";
import Skeleton from "../Skeleton/Skeleton";
import { Colors } from "../../theme";

export interface Props {
  color?: keyof Colors;
  cakePriceUsd?: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const CakePrice: React.FC<Props> = ({ cakePriceUsd, color = "textSubtle" }) => {
  return cakePriceUsd ? (
    <PriceLink
      href="https://app.delimit.finance/swap?outputCurrency=0x0e2963D80A5Ef8D67853e26A4F3C85DE38B4c0eC"
      target="_blank"
    >
      <LogoIcon width="24px" mr="8px" />
      <Text color={color} bold>{`$${cakePriceUsd.toFixed(6)}`}</Text>
    </PriceLink>
  ) : (
    <Skeleton width={80} height={24} />
  );
};

export default React.memo(CakePrice);
