import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import Trash from "../assets/trash.svg";
import { useCreateInvoice } from "../pages/useCreateInvoice";
import { useForm } from "react-hook-form";
import { useUpdateInvoice } from "../pages/useUpdateInvoice";

interface InputProps {
  error?: string; // Define the error prop as an optional string
}

const InvoiceContainer = styled.div`
  height: 100vh;
  width: calc(100% - 10.3rem);
  position: absolute;
  display: flex;
  top: 0;
  left: 10.3rem;
`;

const Invoice = styled.form`
  height: 100vh;
  width: 61.6rem;
  border-radius: 0px 2rem 2rem 0px;
  background-color: #fff;
  padding: 5.9rem 5.6rem 0rem 5.6rem;
  position: relative;
  overflow-y: scroll;
`;

const InvoiceBottomBar = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 0px 20px 20px 0px;
  background-color: #fff;
  padding: 3.1rem 0rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomLeftSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DiscardBtn = styled.button`
  all: initial;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background: #f9fafe;
  color: var(--07, #7e88c3);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
  padding: 1.8rem 2.4rem;
  cursor: pointer;
`;

const SaveDraftBtn = styled.button`
  all: initial;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background: #373b53;
  padding: 1.8rem 2.2rem;
  color: var(--06, #888eb0);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
  cursor: pointer;
`;

const SaveSendBtn = styled.button`
  all: initial;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background: var(--01, #7c5dfa);
  padding: 1.8rem 2.2rem;
  color: #fff;
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
  cursor: pointer;
`;

const Overlay = styled.div`
  height: 100vh;
  background: #000;
  opacity: 0.4984;
  flex-grow: 1;
`;

const Title = styled.div`
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 133.333% */
  letter-spacing: -0.5px;
`;

const InvoiceBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.9rem;
  margin-top: 4.6rem;
`;

const SectionTitle = styled.div`
  color: var(--01, #7c5dfa);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 2.4rem;
`;

const FormElement = styled.div`
  display: flex;
  gap: 9px;
  flex-direction: column;
  flex: 1;
`;

const FormAddressElement = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 2.4rem;
  max-width: 100%;
  overflow-x: auto;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ErrorMessage = styled.div`
  color: var(--08, #ec5757);
  font-family: "League Spartan";
  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px; /* 150% */
  letter-spacing: -0.208px;
`;

const Label = styled.label<InputProps>`
  color: ${(props) =>
    props.error ? "var(--08, #EC5757)" : "var(--07, #7e88c3)"};
  background: #fff;
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 115.385% */
  letter-spacing: -0.1px;
`;

const Input = styled.input<InputProps>`
  border-radius: 4px;
  border: ${(props) =>
    props.error
      ? "1px solid var(--08, #EC5757)"
      : "1px solid var(--05, #dfe3fa)"};
  background: #fff;
  padding: 1.8rem 2rem;
  width: 100%;
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;

  &:focus {
    border-color: var(--02, #9277ff); /* Change the color as desired */
  }
`;

const InputDate = styled.input<InputProps>`
  /* Add a custom arrow */
  border-radius: 4px;
  border: ${(props) =>
    props.error
      ? "1px solid var(--08, #EC5757)"
      : "1px solid var(--05, #dfe3fa)"};
  background: #fff;
  padding: 1.8rem 2rem;
  width: 100%;
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
  &::placeholder {
    color: var(--07, #7e88c3); /* Change placeholder color as desired */
  }
`;

const ItemListContainer = styled.div`
  margin-top: 1.5rem;
`;

const ItemListTitle = styled.div`
  color: #777f98;
  font-family: "League Spartan";
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 177.778% */
  letter-spacing: -0.375px;
`;

const ItemListLabelContainer = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-top: 1.4rem;
  width: 100%;
`;

const ItemName = styled.label`
  color: var(--07, #7e88c3);
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 115.385% */
  letter-spacing: -0.1px;
  width: 40%;
`;
const Quantity = styled.label`
  color: var(--07, #7e88c3);
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 115.385% */
  letter-spacing: -0.1px;
  width: 10%;
`;
const Price = styled.label`
  color: var(--07, #7e88c3);
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 115.385% */
  letter-spacing: -0.1px;
  width: 20%;
`;
const Total = styled.label`
  color: var(--07, #7e88c3);
  font-family: "League Spartan";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 15px; /* 115.385% */
  letter-spacing: -0.1px;
  width: 20%;
`;

const DelDummy = styled.div`
  width: 2%;
`;

const ItemNameInput = styled.input<InputProps>`
  /* flex-grow: 4; */
  width: 40%;
  border-radius: 4px;
  border: ${(props) =>
    props.error
      ? "1px solid var(--08, #EC5757)"
      : "1px solid var(--05, #dfe3fa)"};
  background: #fff;
  padding: 1.8rem 2rem;
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
`;

const QtyInput = styled.input<InputProps>`
  /* flex-grow: 1; */
  width: 10%;
  border-radius: 4px;
  border: ${(props) =>
    props.error
      ? "1px solid var(--08, #EC5757)"
      : "1px solid var(--05, #dfe3fa)"};
  background: #fff;
  padding: 1.8rem 2rem;
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
`;

const PriceInput = styled.input<InputProps>`
  /* flex-grow: 2; */
  width: 20%;
  border-radius: 4px;
  border: ${(props) =>
    props.error
      ? "1px solid var(--08, #EC5757)"
      : "1px solid var(--05, #dfe3fa)"};
  background: #fff;
  padding: 1.8rem 2rem;
  color: var(--08, #0c0e16);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
`;

const TotalPerRow = styled.div`
  /* flex-grow: 2; */
  color: var(--06, #888eb0);
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
  width: 20%;
  display: flex;
  align-items: center;
  height: 100%;
`;

const ItemRow = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  margin-top: 1.5rem;
  width: 100%;
`;

const Delete = styled.img`
  cursor: pointer;
`;

const AddItemBtn = styled.button`
  all: initial;
  border-radius: 24px;
  background: #f9fafe;
  color: var(--07, #7e88c3);
  text-align: center;
  font-family: "League Spartan";
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 15px; /* 100% */
  letter-spacing: -0.25px;
  padding: 1.8rem;
  cursor: pointer;
`;

interface InvoiceFormProps {
  setShowInvoice: (s: boolean) => void;
  invoiceToEdit: any;
}

interface Item {
  itemName: string;
  quantity: string;
  price: string;
  total: string;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoiceToEdit = {},
  setShowInvoice,
}) => {
  const [isDraft, setIsDraft] = useState(false);
  const { _id: invoiceId, ...editValues } = invoiceToEdit;
  const isEditSession = Boolean(invoiceId);
  const { createInvoice, isLoading: loadingCreate } = useCreateInvoice();
  const { updateInvoice, isLoading: loadingUpdate } = useUpdateInvoice();
  const [itemList, setItemList] = useState<Item[]>(() => {
    if (!isEditSession) {
      return [];
    } else {
      const itemList = editValues.items.map((item: Item) => {
        const itemObj = {
          ...item,
          total: parseInt(item.quantity) * parseInt(item.price),
        };
        return itemObj;
      });
      return itemList;
    }
  });
  const { register, handleSubmit, formState } = useForm<any>({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function saveAndSend(data: any) {
    const keys = Object.keys(data);
    //Format Data for submission
    const itemNames: string[] = keys.filter((key) =>
      key.startsWith("itemName")
    );
    const quantities: string[] = keys.filter((key) =>
      key.startsWith("quantity")
    );
    const prices: string[] = keys.filter((key) => key.startsWith("price"));

    //Create an items array
    const items = itemNames.map((item, i) => {
      const itemObj = {
        itemName: data[item],
        quantity: data[quantities[i]],
        price: data[prices[i]],
      };

      delete data[item];
      delete data[quantities[i]];
      delete data[prices[i]];

      return itemObj;
    });

    data.items = items;
    if (isEditSession) {
      delete data["invoiceId"];
      delete data["_id"];
      delete data["id"];
      updateInvoice({ invoiceId, data });
    } else {
      createInvoice({ data });
    }

    setShowInvoice(false);
  }

  function onQtyChange(e: ChangeEvent<HTMLInputElement>, i: number) {
    const itemListCopy = [...itemList];
    itemListCopy[i].quantity = e.target.value;
    if (parseInt(e.target.value) * parseInt(itemListCopy[i].price)) {
      itemListCopy[i].total =
        parseInt(e.target.value) * parseInt(itemListCopy[i].price) + "";
    } else {
      itemListCopy[i].total = "";
    }
    setItemList(itemListCopy);
  }

  function onPriceChange(e: ChangeEvent<HTMLInputElement>, i: number) {
    const itemListCopy = [...itemList];
    itemListCopy[i].price = e.target.value;
    if (parseInt(e.target.value) * parseInt(itemListCopy[i].quantity)) {
      itemListCopy[i].total =
        parseInt(e.target.value) * parseInt(itemListCopy[i].quantity) + "";
    } else {
      itemListCopy[i].total = "";
    }

    setItemList(itemListCopy);
  }

  function saveAndSendDraft(data: any) {
    const keys = Object.keys(data);
    //Format Data for submission
    const itemNames: string[] = keys.filter((key) =>
      key.startsWith("itemName")
    );
    const quantities: string[] = keys.filter((key) =>
      key.startsWith("quantity")
    );
    const prices: string[] = keys.filter((key) => key.startsWith("price"));

    //Create an items array
    const items = itemNames.map((item, i) => {
      const itemObj = {
        itemName: data[item],
        quantity: data[quantities[i]],
        price: data[prices[i]],
      };

      delete data[item];
      delete data[quantities[i]];
      delete data[prices[i]];

      return itemObj;
    });

    data.items = items;
    data.status = "draft";
    if (isEditSession) {
      delete data["invoiceId"];
      delete data["_id"];
      delete data["id"];
      updateInvoice({ invoiceId, data });
    } else {
      createInvoice({ data });
    }

    setShowInvoice(false);
  }

  function deleteItem(i: number) {
    const itemListCopy = [...itemList];
    itemListCopy.splice(i, 1);
    setItemList(itemListCopy);
  }

  const onSubmit = function (data: any) {};

  const addNewItem = function (data: any) {
    const item = {
      itemName: "",
      quantity: "",
      price: "",
      total: "",
    };
    setItemList((items) => {
      const newItems = [...items];
      newItems.push(item);
      return newItems;
    });
  };

  return (
    <InvoiceContainer>
      <Invoice onSubmit={handleSubmit(onSubmit)}>
        <Title>New Invoice</Title>
        <InvoiceBody>
          <div>
            <SectionTitle>Bill From</SectionTitle>
            <FormSection>
              <FormElement>
                <LabelContainer>
                  <Label error={errors?.fromStreetAddress?.message?.toString()}>
                    Street Address
                  </Label>
                  {errors.fromStreetAddress && (
                    <ErrorMessage>
                      {errors.fromStreetAddress.message?.toString()}
                    </ErrorMessage>
                  )}
                </LabelContainer>

                <Input
                  type="text"
                  id="fromStreetAddress"
                  {...register("fromStreetAddress", {
                    required: "This field is required",
                  })}
                  error={errors?.fromStreetAddress?.message?.toString()}
                />
              </FormElement>
              <FormAddressElement>
                <FormElement>
                  <LabelContainer>
                    <Label error={errors?.fromCity?.message?.toString()}>
                      City
                    </Label>
                  </LabelContainer>

                  <Input
                    type="text"
                    id="fromCity"
                    {...register("fromCity", {
                      required: "This field is required",
                    })}
                    error={errors?.fromCity?.message?.toString()}
                  />
                </FormElement>
                <FormElement>
                  <LabelContainer>
                    <Label error={errors?.fromPostalCode?.toString()}>
                      Post Code
                    </Label>
                  </LabelContainer>
                  <Input
                    type="text"
                    id="fromPostalCode"
                    {...register("fromPostalCode", {
                      required: "This field is required",
                    })}
                    error={errors?.fromPostalCode?.toString()}
                  />
                </FormElement>
                <FormElement>
                  <Label error={errors?.fromCountry?.toString()}>Country</Label>
                  <Input
                    type="text"
                    id="fromCountry"
                    {...register("fromCountry", {
                      required: "This field is required",
                    })}
                    error={errors?.fromCountry?.toString()}
                  />
                </FormElement>
              </FormAddressElement>
            </FormSection>
          </div>
          <div>
            <SectionTitle>Bill To</SectionTitle>
            <FormSection>
              <FormElement>
                <LabelContainer>
                  <Label error={errors.clientName?.message?.toString()}>
                    Client's Name
                  </Label>
                  {errors.clientName && (
                    <ErrorMessage>
                      {errors.clientName?.message?.toString()}
                    </ErrorMessage>
                  )}
                </LabelContainer>
                <Input
                  type="text"
                  id="clientName"
                  {...register("clientName", {
                    required: "This field is required",
                  })}
                  error={errors.clientName?.message?.toString()}
                />
              </FormElement>
              <FormElement>
                <LabelContainer>
                  <Label error={errors.clientEmail?.message?.toString()}>
                    Client's Email
                  </Label>
                  {errors.clientEmail && (
                    <ErrorMessage>
                      {errors.clientEmail?.message?.toString()}
                    </ErrorMessage>
                  )}
                </LabelContainer>
                <Input
                  type="text"
                  id="clientEmail"
                  {...register("clientEmail", {
                    required: "This field is required",
                  })}
                  error={errors.clientEmail?.message?.toString()}
                />
              </FormElement>
              <FormElement>
                <LabelContainer>
                  <Label
                    error={errors.clientStreetAddress?.message?.toString()}
                  >
                    Street Address
                  </Label>
                  {errors.clientStreetAddress && (
                    <ErrorMessage>
                      {errors.clientStreetAddress?.message?.toString()}
                    </ErrorMessage>
                  )}
                </LabelContainer>

                <Input
                  type="text"
                  id="clientStreetAddress"
                  {...register("clientStreetAddress", {
                    required: "This field is required",
                  })}
                  error={errors.clientStreetAddress?.message?.toString()}
                />
              </FormElement>
              <FormAddressElement>
                <FormElement>
                  <Label error={errors.clientCity?.message?.toString()}>
                    City
                  </Label>
                  <Input
                    type="text"
                    id="clientCity"
                    {...register("clientCity", {
                      required: "This field is required",
                    })}
                    error={errors.clientCity?.message?.toString()}
                  />
                </FormElement>
                <FormElement>
                  <Label error={errors.clientPostalCode?.message?.toString()}>
                    Post Code
                  </Label>
                  <Input
                    type="text"
                    id="clientPostalCode"
                    {...register("clientPostalCode", {
                      required: "This field is required",
                    })}
                    error={errors.clientPostalCode?.message?.toString()}
                  />
                </FormElement>
                <FormElement>
                  <Label error={errors.clientCountry?.message?.toString()}>
                    Country
                  </Label>
                  <Input
                    type="text"
                    id="clientCountry"
                    {...register("clientCountry", {
                      required: "This field is required",
                    })}
                    error={errors.clientCountry?.message?.toString()}
                  />
                </FormElement>
              </FormAddressElement>
              <FormAddressElement>
                <FormElement>
                  <Label error={errors.invoiceDate?.message?.toString()}>
                    Issue Date
                  </Label>
                  <InputDate
                    type="date"
                    id="invoiceDate"
                    {...register("invoiceDate", {
                      required: "This field is required",
                    })}
                    error={errors.invoiceDate?.message?.toString()}
                  />
                </FormElement>
                <FormElement>
                  <Label error={errors.paymentTerms?.message?.toString()}>
                    Payment Terms
                  </Label>
                  <Input
                    type="number"
                    id="paymentTerms"
                    {...register("paymentTerms", {
                      required: "This field is required",
                    })}
                    error={errors.paymentTerms?.message?.toString()}
                  />
                </FormElement>
              </FormAddressElement>
              <FormElement>
                <LabelContainer>
                  <Label error={errors.projectDescription?.message?.toString()}>
                    Project Description
                  </Label>
                  {errors.projectDescription && (
                    <ErrorMessage>
                      {errors.projectDescription?.message?.toString()}
                    </ErrorMessage>
                  )}
                </LabelContainer>
                <Input
                  type="text"
                  id="projectDescription"
                  {...register("projectDescription", {
                    required: "This field is required",
                  })}
                  error={errors.projectDescription?.message?.toString()}
                />
              </FormElement>
              <ItemListContainer>
                <ItemListTitle>Item List</ItemListTitle>
                {itemList.length > 0 && (
                  <ItemListLabelContainer>
                    <ItemName>Item Name</ItemName>
                    <Quantity>Qty.</Quantity>
                    <Price>Price</Price>
                    <Total>Total</Total>
                    <DelDummy></DelDummy>
                  </ItemListLabelContainer>
                )}
                {itemList.map((item, i) => (
                  <ItemRow>
                    <ItemNameInput
                      type="text"
                      id={`itemName-${i}`}
                      {...register(`itemName-${i}`, {
                        required: "This field is required",
                      })}
                      defaultValue={isEditSession ? item.itemName : ""}
                      error={errors?.[`itemName-${i}`]?.message?.toString()}
                    />
                    <QtyInput
                      type="text"
                      id={`quantity-${i}`}
                      {...register(`quantity-${i}`, {
                        required: "This field is required",
                      })}
                      onChange={(e) => {
                        onQtyChange(e, i);
                      }}
                      defaultValue={isEditSession ? item.quantity : ""}
                      error={errors?.[`quantity-${i}`]?.message?.toString()}
                    />
                    <PriceInput
                      type="text"
                      id={`price-${i}`}
                      {...register(`price-${i}`, {
                        required: "This field is required",
                      })}
                      onChange={(e) => {
                        onPriceChange(e, i);
                      }}
                      defaultValue={isEditSession ? item.price : ""}
                      error={errors?.[`price-${i}`]?.message?.toString()}
                    />
                    <TotalPerRow>{`${
                      item.total ? `$${item.total}` : ""
                    }`}</TotalPerRow>
                    <Delete src={Trash} onClick={() => deleteItem(i)} />
                  </ItemRow>
                ))}
              </ItemListContainer>
              <AddItemBtn type="button" onClick={addNewItem}>
                + Add New Item
              </AddItemBtn>
            </FormSection>
          </div>
        </InvoiceBody>
        <InvoiceBottomBar>
          <BottomLeftSection>
            <DiscardBtn
              onClick={() => {
                setShowInvoice(false);
              }}
            >
              {isEditSession ? "Cancel" : "Discard"}
            </DiscardBtn>
          </BottomLeftSection>
          <BottomRightSection>
            <SaveDraftBtn
              type="submit"
              onClick={handleSubmit(saveAndSendDraft)}
            >
              Save as Draft
            </SaveDraftBtn>
            <SaveSendBtn type="button" onClick={handleSubmit(saveAndSend)}>
              {isEditSession ? "Save Changes" : "Save & Send"}
            </SaveSendBtn>
          </BottomRightSection>
        </InvoiceBottomBar>
      </Invoice>
      <Overlay
        onClick={() => {
          setIsDraft(false);
          setShowInvoice(false);
        }}
      />
    </InvoiceContainer>
  );
};

export default InvoiceForm;
