import Toastify from "toastify-js"

function notify(type = "is-dark", message = "", duration = 5000, position = "center") {
    Toastify({
        text: message,
        duration: duration,
        className: type,
        // destination: "https://github.com/apvarun/toastify-js",
        // newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: position, // `left`, `center` or `right`
        // backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true // Prevents dismissing of toast on hover
        // onClick: function () { } // Callback after click
    }).showToast()
}

export default notify
