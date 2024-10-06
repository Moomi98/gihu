import styled from "styled-components";
import SimilarSearchDropDownItem from "@/app/components/SimilarSearchDropDownItem";

const RootContaier = styled.div<{ $height?: number | string }>`
  width: 100%;
  max-height: ${(props) => props.$height ?? "500px"};
  border-radius: 1rem;
  background-color: white;
  border: 1px solid #ccc;
  overflow: scroll;
`;

const ItemContaier = styled.div`
  width: 100%;
  height: 100%;
`;

const Br = styled.div`
  width: 100%;
  height: 1px;
  background-color: #aaa;
`;

export type TDropdownItem = {
  id: number | string;
  name: string;
  address: string;
};

type TSimilarSearchDropDownProps = {
  visible: boolean;
  items: TDropdownItem[];
  height?: number | string;
};

export default function SimilarSearchDropDown(
  props: TSimilarSearchDropDownProps
) {
  return (
    props.visible && (
      <RootContaier $height={props.height}>
        {props.items.map((item, idx) => (
          <ItemContaier key={item.id}>
            <SimilarSearchDropDownItem
              id={item.id}
              name={item.name}
              address={item.address}
            />
            {idx != props.items.length - 1 && <Br></Br>}
          </ItemContaier>
        ))}
      </RootContaier>
    )
  );
}
