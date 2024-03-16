import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import FilterDropdown from "../ui/FilterDropdown";
import NewInvoiceButton from "../ui/NewInvoiceButton";
import InvoiceTile from "../ui/InvoiceTile";
import useInvoices from "./useInvoices";
import InvoiceForm from "../ui/InvoiceForm";
import Spinner from "../ui/Spiiner";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin-top: 2rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5.5rem;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
`;

const Heading = styled.div`
  color: var(--08, #0c0e16);
  font-feature-settings: "clig" off, "liga" off;

  /* Heading L */
  font-family: "League Spartan";
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.125px;
`;

const NumberInvoices = styled.div`
  color: var(--06, #888eb0);
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 115.385% */
  letter-spacing: -0.1px;
`;

const InvoicesContainer = styled.div`
  margin-top: 6.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  height: 47rem;
  overflow-y: scroll;
`;

const Loading = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Invoices = () => {
  const { isLoading, invoices, error } = useInvoices();
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  return (
    <>
      {showInvoice && (
        <InvoiceForm invoiceToEdit={{}} setShowInvoice={setShowInvoice} />
      )}
      {isLoading ? (
        <Loading>
          <Spinner />
        </Loading>
      ) : (
        <StyledContainer>
          <StyledHeader>
            <HeaderLeft>
              <Heading>Invoices</Heading>
              <NumberInvoices>
                There are {invoices.length} total invoices
              </NumberInvoices>
            </HeaderLeft>
            <HeaderRight>
              <FilterDropdown setSelectedType={setSelectedType} />
              <NewInvoiceButton setShowInvoice={setShowInvoice} />
            </HeaderRight>
          </StyledHeader>

          <InvoicesContainer>
            {!selectedType
              ? invoices.map((invoice: any) => (
                  <InvoiceTile key={invoice.invoiceId} invoice={invoice} />
                ))
              : invoices
                  .filter((invoice: any) => invoice.status === selectedType)
                  .map((invoice: any) => (
                    <InvoiceTile key={invoice.invoiceId} invoice={invoice} />
                  ))}
          </InvoicesContainer>
        </StyledContainer>
      )}
    </>
  );
};

export default Invoices;
