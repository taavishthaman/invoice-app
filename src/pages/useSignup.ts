import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      Cookies.set("jwt", user.token);
      toast.success("Successfully Signed Up!");
      setTimeout(() => {
        navigate("/invoices", { replace: true });
      }, 1000);
    },
    onError: (err) => {
      toast.error("Something went wrong!");
    },
  });

  return { signup, isLoading };
}
