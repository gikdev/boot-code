import { Bounce, ToastContainer } from "react-toastify"

export const Toast = () => (
  <ToastContainer
    autoClose={5000}
    className="font-main!"
    closeOnClick={false}
    draggable
    hideProgressBar={false}
    newestOnTop
    pauseOnFocusLoss
    pauseOnHover
    position="bottom-right"
    rtl
    theme="light"
    toastClassName="font-main!"
    transition={Bounce}
  />
)
