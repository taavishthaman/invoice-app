import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "../services/apiInvoices";

export default function useInvoices() {
  const {
    isLoading,
    data: invoices,
    error,
  } = useQuery({
    queryKey: ["invoice"],
    queryFn: getInvoices,
  });

  return { isLoading, error, invoices };
}
