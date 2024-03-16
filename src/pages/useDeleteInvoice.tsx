import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvoice as deleteInvoiceApi } from "../services/apiInvoices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useDeleteInvoice() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteInvoice, isPending: isLoading } = useMutation({
    mutationFn: deleteInvoiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice"] });
      navigate("/invoices", { replace: true });
      toast.success("Successfully deleted Invoice!");
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });

  return { deleteInvoice, isLoading };
}
