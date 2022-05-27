import { Flip, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure()

const errorToast = (message) => {
  toast.error(message, {
    transition: Flip,
    autoClose: 2000,
  });
};

const infoToast = (message) => {
  toast.info(message, {
    transition: Flip,
    autoClose: 2000,
  });
};

const sucsessToast = (message) => {
  toast.success(message, {
    transition: Flip,
    autoClose: 2000,
  });
};

const warnToast = (message) => {
  toast.warn(message, {
    transition: Flip,
    autoClose: 2000,
  });
};

const waitToast = () => {
  toast.info("Please wait...", {
    transition: Flip,
    isLoading: true,
    autoClose: 2000,
  });
};

const updateToast = (id, message, type) => {
  if (type == 1) {
    toast.update(id, {
      render: message,
      type: "success",
      isLoading: false,
      transition: Flip,
      autoClose: 2000,
    });
  } else {
    toast.update(id, {
      render: message,
      type: "error",
      isLoading: false,
      transition: Flip,
      autoClose: 2000,
    });
  }
};
export {
  errorToast,
  infoToast,
  sucsessToast,
  warnToast,
  waitToast,
  updateToast,
};
