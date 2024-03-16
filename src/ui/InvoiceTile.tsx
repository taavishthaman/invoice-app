import styled from "styled-components";
import PaidCircle from "../assets/paid-circle.svg";
import PendiingCircle from "../assets/pending-circle.svg";
import DraftCircle from "../assets/draft-circle.svg";
import TileIconArrow from "../assets/tile_icon.svg";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

interface StatusProps {
  status: String;
}

const Tile = styled.div`
  display: flex;
  padding: 1.6rem;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  height: 7.2rem;
  cursor: pointer;
`;

const InvoiceId = styled.div`
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px;
  letter-spacing: -0.25px;
  width: 10rem;
`;

const DateStyled = styled.div`
  color: var(--07, #7e88c3);
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.1px;
  width: 15rem;
`;

const Name = styled.div`
  color: #858bb2;
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 115.385% */
  letter-spacing: -0.1px;
  width: 15rem;
`;

const Price = styled.div`
  color: var(--08, #0c0e16);
  text-align: right;
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 160% */
  letter-spacing: -0.25px;
  direction: rtl;
  width: 14rem;
  padding-right: 4rem;
`;

const Status = styled.div<StatusProps>`
  width: 10.4rem;
  height: 4rem;
  align-items: center;
  border-radius: 6px;
  background-color: ${(props) => {
    return props.status === "paid"
      ? "rgba(51, 214, 159, 0.0571)"
      : props.status === "pending"
      ? "rgba(255, 143, 0, 0.0571)"
      : "rgba(55, 59, 83, 0.0571)";
  }};
  gap: 8px;
  justify-content: center;
  display: flex;
  align-items: center;
`;

const StatusText = styled.div<StatusProps>`
  color: ${(props) => {
    return props.status === "paid"
      ? "rgba(51, 214, 159)"
      : props.status === "pending"
      ? "rgba(255, 143, 0)"
      : "rgba(55, 59, 83)";
  }};
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
`;

interface InvoiceInterface {
  invoice: {
    invoiceId: string;
    invoiceDate: string;
    clientName: string;
    totalPrice: number;
    status: String;
  };
}

const StatusCircle = styled.img``;

const TileIcon = styled.img`
  margin-left: 2rem;
`;

const InvoiceTile: React.FC<InvoiceInterface> = ({ invoice }) => {
  return (
    <Link
      to={`/invoice/${invoice.invoiceId}`}
      state={{ data: invoice }}
      style={{ textDecoration: "none" }}
    >
      <Tile>
        <InvoiceId>#{invoice.invoiceId}</InvoiceId>
        <DateStyled>Due {formatDate(invoice.invoiceDate)}</DateStyled>
        <Name>{invoice.clientName}</Name>
        <Price>${invoice.totalPrice}</Price>
        <Status status={invoice.status}>
          <StatusCircle
            src={
              invoice.status === "pending"
                ? PendiingCircle
                : invoice.status === "paid"
                ? PaidCircle
                : DraftCircle
            }
          />
          <StatusText status={invoice.status}>{invoice.status}</StatusText>
        </Status>
        <TileIcon src={TileIconArrow} />
      </Tile>
    </Link>
  );
};

export default InvoiceTile;
