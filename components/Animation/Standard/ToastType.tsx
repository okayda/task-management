import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const toastConfig: {} = {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const Toast = function () {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
};

export const ToastError = function (msg: string) {
  return toast.error(msg, toastConfig);
};

export const ToastSuccess = function (msg: string) {
  return toast.success(msg, toastConfig);
};
