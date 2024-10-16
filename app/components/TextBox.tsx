import styled from "styled-components";

const InputBox = styled.input<{ $backgroundColor?: string }>`
  border: 1px solid black;
  outline: none;
  padding: 0.25rem 0.5rem;
  background-color: ${(props) => props.$backgroundColor ?? "white"};
  border-radius: 0.5rem;
`;

type TTextBoxProps = {
  value?: string;
  placeholder?: string;
  backgroundColor?: string;
  readonly?: boolean;
};
export default function TextBox(props: TTextBoxProps) {
  return (
    <InputBox
      defaultValue={props.value}
      readOnly={props.readonly}
      $backgroundColor={props.backgroundColor}
    />
  );
}
