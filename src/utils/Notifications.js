import { toastController } from "@ionic/vue"

async function notify(type = "dark", message = "Уведомление", duration = 5000, position = "top") {
    const toast = await toastController
        .create({
            color: type,
            message: message,
            duration: duration,
            position: position,
            buttons: [
                {
                    icon: "assets/icon_times.svg",
                    role: "cancel"
                }
            ]
        })
    return toast.present()
}

export default notify
