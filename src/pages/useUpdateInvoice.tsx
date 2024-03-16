import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoice as updateInvoiceApi } from "../services/apiInvoices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useUpdateInvoice() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: updateInvoice, isPending: isLoading } = useMutation({
    mutationFn: updateInvoiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice"] });
      navigate("/invoices", { replace: true });
      toast.success("Successfully updated Invoice!");
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });

  return { updateInvoice, isLoading };
}
