import { Bounce, ToastContainer } from "react-toastify"

export const Toast = () => (
  <ToastContainer
    autoClose={5000}
    className="font-family:main!"
    closeOnClick={false}
    draggable
    hideProgressBar={false}
    newestOnTop
    pauseOnFocusLoss
    pauseOnHover
    position="bottom-right"
    rtl
    theme="light"
    toastClassName="font-family:main!"
    transition={Bounce}
  />
)
