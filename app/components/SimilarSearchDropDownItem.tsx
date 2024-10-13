import styled from "styled-components";
import _ from "lodash";
const RootContainer = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;
const Name = styled.h4`
  margin-bottom: 0.25rem;
`;

const Address = styled.span`
  color: #666;
  font-size: 0.8rem;
`;

type TSimilarSearchDropDownItemProps = {
  id: number | string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  onClick?: (param: TOnClickParams) => void;
};

export type TOnClickParams = Omit<TSimilarSearchDropDownItemProps, "onClick">;

export default function SimilarSearchDropDownItem(
  props: TSimilarSearchDropDownItemProps
) {
  return (
    <RootContainer onClick={() => props.onClick?.(_.omit(props, "onClick"))}>
      <Name>{props.name}</Name>
      <Address>{props.address}</Address>
    </RootContainer>
  );
}
