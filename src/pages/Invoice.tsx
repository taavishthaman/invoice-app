import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import BackArrow from "../assets/back_arrow.svg";
import PaidCircle from "../assets/paid-circle.svg";
import PendiingCircle from "../assets/pending-circle.svg";
import DraftCircle from "../assets/draft-circle.svg";
import InvoiceForm from "../ui/InvoiceForm";
import { formatDate } from "../utils/formatDate";
import { useDeleteInvoice } from "./useDeleteInvoice";
import { useUpdateInvoice } from "./useUpdateInvoice";

interface StatusProps {
  status: String;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const BackBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 2.3rem;
  cursor: pointer;
`;

const BackText = styled.div`
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
`;

const BackIcon = styled.img``;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 3.2rem;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  margin-top: 3.1rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StatusLabel = styled.div`
  color: #858bb2;
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 115.385% */
  letter-spacing: -0.1px;
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

const StatusCircle = styled.img``;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EditButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.8rem 2.4rem;
  border-radius: 24px;
  background: #f9fafe;
  color: var(--07, #7e88c3);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
  cursor: pointer;
`;

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.8rem 2.4rem;
  border-radius: 24px;
  background: var(--08, #ec5757);
  color: #fff;
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
  cursor: pointer;
`;

const MarkAsPaidButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.8rem 2.4rem;
  border-radius: 24px;
  background: var(--01, #7c5dfa);
  color: #fff;
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
  cursor: pointer;
`;

const InvoiceDetailsContainer = styled.div`
  padding: 5rem 4.8rem;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.1);
  margin-top: 2.4rem;
  overflow-y: scroll;
  height: 70%;
`;

const InvoiceTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TopRowLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const InvoiceId = styled.div`
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.25px;
`;

const InvoiceName = styled.div`
  color: var(--07, #7e88c3);
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 115.385% */
  letter-spacing: -0.1px;
`;

const TopRowRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const AddressPart = styled.div`
  color: var(--07, #7e88c3);
  text-align: right;
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 138.462% */
  letter-spacing: -0.1px;
`;

const InvoiceMiddleRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.1rem;
`;

const MiddleRowLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.1rem;
`;

const MiddleValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const MiddleLabel = styled.div`
  color: var(--07, #7e88c3);
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 115.385% */
  letter-spacing: -0.1px;
`;

const MiddleText = styled.div`
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 133.333% */
  letter-spacing: -0.25px;
`;

const MiddleRowBetween = styled.div``;

const MiddleAddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const ToName = styled.div`
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 133.333% */
  letter-spacing: -0.25px;
`;

const AdressBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddressPartMid = styled.div`
  color: var(--07, #7e88c3);
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 138.462% */
  letter-spacing: -0.1px;
`;

const MiddleRowRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.1rem;
  margin-right: 3rem;
`;

const LeftValueContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const TableContainer = styled.div`
  width: 100%;
  margin-top: 4.4rem;
`;

const TableMain = styled.div`
  display: flex;
  width: 100%;
  padding: 3.3rem 3.2rem;
  border-radius: 8px 8px 0px 0px;
  background: #f9fafe;
  justify-content: space-between;
`;

const TableColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const TableItemName = styled.div`
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
`;

const TableItemQty = styled.div`
  color: var(--07, #7e88c3);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
  display: flex;
  justify-content: center;
`;

const TableLabelLeft = styled.div`
  color: var(--07, #7e88c3);
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 138.462% */
  letter-spacing: -0.1px;
  text-align: right;
`;

const TableItemPrice = styled.div`
  color: var(--07, #7e88c3);
  text-align: right;
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
`;

const TableItemTotal = styled.div`
  color: var(--08, #0c0e16);
  text-align: right;
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
`;

const TableFooter = styled.div`
  border-radius: 0px 0px 8px 8px;
  background: #373b53;
  padding: 2.7rem 3.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FooterLabel = styled.div`
  color: #fff;
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 138.462% */
  letter-spacing: -0.1px;
`;

const FooterTotal = styled.div`
  color: #fff;
  text-align: right;
  font-family: "League Spartan";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 133.333% */
  letter-spacing: -0.5px;
`;

const Invoice = () => {
  const location = useLocation();
  const { state } = location;
  const invoice = state ? state.data : null;
  const navigate = useNavigate();
  const [showInvoice, setShowInvoice] = useState(false);
  const { _id: invoiceId } = invoice;

  const { deleteInvoice, isLoading } = useDeleteInvoice();
  const { updateInvoice, isLoading: loadingUpdate } = useUpdateInvoice();
  return (
    <>
      {showInvoice && (
        <InvoiceForm invoiceToEdit={invoice} setShowInvoice={setShowInvoice} />
      )}
      <StyledContainer>
        <BackBtn
          onClick={() => {
            navigate("/invoices");
          }}
        >
          <BackIcon src={BackArrow} />
          <BackText>Go back</BackText>
        </BackBtn>
        <StyledHeader>
          <HeaderLeft>
            <StatusLabel>Status</StatusLabel>
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
          </HeaderLeft>
          <HeaderRight>
            <EditButton
              onClick={() => {
                setShowInvoice(true);
              }}
            >
              Edit
            </EditButton>
            <DeleteButton
              onClick={() => {
                deleteInvoice({ invoiceId });
              }}
            >
              Delete
            </DeleteButton>
            <MarkAsPaidButton
              onClick={() => {
                if (invoice.status === "paid") return;
                updateInvoice({ invoiceId, data: { status: "paid" } });
              }}
            >
              Mark as Paid
            </MarkAsPaidButton>
          </HeaderRight>
        </StyledHeader>
        <InvoiceDetailsContainer>
          <InvoiceTopRow>
            <TopRowLeft>
              <InvoiceId>#{invoice.invoiceId}</InvoiceId>
              <InvoiceName>{invoice.projectDescription}</InvoiceName>
            </TopRowLeft>
            <TopRowRight>
              <AddressPart>{invoice.fromStreetAddress}</AddressPart>
              <AddressPart>{invoice.fromCity}</AddressPart>
              <AddressPart>{invoice.fromPostalCode}</AddressPart>
              <AddressPart>{invoice.fromCountry}</AddressPart>
            </TopRowRight>
          </InvoiceTopRow>
          <InvoiceMiddleRow>
            <MiddleRowLeft>
              <MiddleValueContainer>
                <MiddleLabel>Invoice Date</MiddleLabel>
                <MiddleText>{formatDate(invoice.invoiceDate)}</MiddleText>
              </MiddleValueContainer>
              <MiddleValueContainer>
                <MiddleLabel>Payment Due</MiddleLabel>
                <MiddleText>
                  {formatDate(invoice.invoiceDate, invoice.paymentTerms)}
                </MiddleText>
              </MiddleValueContainer>
            </MiddleRowLeft>
            <MiddleRowBetween>
              <MiddleValueContainer>
                <MiddleLabel>Bill To</MiddleLabel>
                <MiddleAddressContainer>
                  <ToName>{invoice.clientName}</ToName>
                  <AdressBox>
                    <AddressPartMid>
                      {invoice.clientStreetAddress}
                    </AddressPartMid>
                    <AddressPartMid>{invoice.clientCity}</AddressPartMid>
                    <AddressPartMid>{invoice.clientPostalCode}</AddressPartMid>
                    <AddressPartMid>{invoice.clientCountry}</AddressPartMid>
                  </AdressBox>
                </MiddleAddressContainer>
              </MiddleValueContainer>
            </MiddleRowBetween>
            <MiddleRowRight>
              <LeftValueContainer>
                <MiddleLabel>Sent to</MiddleLabel>
                <ToName>{invoice.clientEmail}</ToName>
              </LeftValueContainer>
            </MiddleRowRight>
          </InvoiceMiddleRow>
          <TableContainer>
            <TableMain>
              <TableColumn>
                <MiddleLabel>Item Name</MiddleLabel>
                {invoice.items
                  .map((item: any) => item.itemName)
                  .map((itemName: string) => (
                    <TableItemName key={itemName}>{itemName}</TableItemName>
                  ))}
              </TableColumn>
              <TableColumn>
                <MiddleLabel>QTY.</MiddleLabel>
                {invoice.items
                  .map((item: any) => item.quantity)
                  .map((quantity: number) => (
                    <TableItemQty key={quantity}>{quantity}</TableItemQty>
                  ))}
              </TableColumn>
              <TableColumn>
                <TableLabelLeft>Price</TableLabelLeft>
                {invoice.items
                  .map((item: any) => item.price)
                  .map((price: number) => (
                    <TableItemPrice key={price}>${price}</TableItemPrice>
                  ))}
              </TableColumn>
              <TableColumn>
                <TableLabelLeft>Total</TableLabelLeft>
                {invoice.items
                  .map((item: any) => item.price * item.quantity)
                  .map((totalPrice: number) => (
                    <TableItemTotal key={totalPrice}>
                      ${totalPrice}
                    </TableItemTotal>
                  ))}
              </TableColumn>
            </TableMain>
            <TableFooter>
              <FooterLabel>Amount Due</FooterLabel>
              <FooterTotal>${invoice.totalPrice}</FooterTotal>
            </TableFooter>
          </TableContainer>
        </InvoiceDetailsContainer>
      </StyledContainer>
    </>
  );
};

export default Invoice;
