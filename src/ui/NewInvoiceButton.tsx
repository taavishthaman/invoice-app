import styled from "styled-components";
import PlusIcon from "../assets/plus_icon.svg";

const Button = styled.div`
  width: 150px;
  height: 48px;
  display: flex;
  border-radius: 24px;
  background: var(--01, #7c5dfa);
  align-items: center;
  gap: 1.6rem;
  padding: 8px;
  cursor: pointer;
`;

const Icon = styled.img``;

const Text = styled.div`
  color: #fff;
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
`;

interface NewInvoiceButtonProps {
  setShowInvoice: (s: boolean) => void;
}

const NewInvoiceButton: React.FC<NewInvoiceButtonProps> = ({
  setShowInvoice,
}) => {
  return (
    <Button onClick={() => setShowInvoice(true)}>
      <Icon src={PlusIcon} />
      <Text>New Invoice</Text>
    </Button>
  );
};

export default NewInvoiceButton;
