import { useEffect } from "react";
import { useSnackbar } from "./snackbar.context";

const Snackbar = () => {
  const { snackbar, snackbarDispatch } = useSnackbar();

  useEffect(() => {
    const timerID = setTimeout(() => {
      snackbarDispatch({ type: "DELETE_SNACKBAR" });
    }, 2000);
    return function () {
      clearInterval(timerID);
    };
  });

  return (
    <>
      {snackbar.visible && (
        <div className="snackbar">
          <p>{snackbar.message}</p>
        </div>
      )}
    </>
  );
};

export default Snackbar;
