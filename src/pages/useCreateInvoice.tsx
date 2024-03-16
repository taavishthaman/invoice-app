import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postInvoice } from "../services/apiInvoices";
import toast from "react-hot-toast";

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  const { mutate: createInvoice, isPending: isLoading } = useMutation({
    mutationFn: postInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoice"] });
      toast.success("Successfully created new Invoice!");
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });

  return { createInvoice, isLoading };
}
