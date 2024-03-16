import { baseUrl } from "./baseUrl";
import Cookies from "js-cookie";

export async function getInvoices() {
  const url = baseUrl + "/api/v1/invoice";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (data.status !== "success") {
    throw new Error(data.message);
  }

  return data.data.invoices;
}

export async function postInvoice({ data }) {
  const url = baseUrl + "/api/v1/invoice";
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  const dataRes = await response.json();
  if (dataRes.status !== "success") {
    throw new Error(dataRes.status);
  }

  return dataRes;
}

export async function updateInvoice({ invoiceId, data }) {
  const url = baseUrl + `/api/v1/invoice/${invoiceId}`;
  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);
  const dataRes = await response.json();
  if (dataRes.status !== "success") {
    throw new Error(dataRes.status);
  }

  return dataRes;
}

export async function deleteInvoice({ invoiceId }) {
  const url = baseUrl + `/api/v1/invoice/${invoiceId}`;

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${Cookies.get("jwt")}`,
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);
  if (response.status !== 204) {
    throw new Error("Failed to delete!");
  }

  return response;
}
