export default {
    data: () => ({
        Timeover: false,
        Timeout: 360,
        Timer: null
    }),
    computed: {
        TimeoutBeauty() {
            const SecondsNumber = parseInt(this.Timeout, 10)
            const Hours = Math.floor(SecondsNumber / 3600)
            let Minutes = Math.floor((SecondsNumber - (Hours * 3600)) / 60)
            let Seconds = SecondsNumber - (Hours * 3600) - (Minutes * 60)

            if (Minutes < 10) {
                Minutes = `0${Minutes}`
            }
            if (Seconds < 10) {
                Seconds = `0${Seconds}`
            }

            return `${Minutes}:${Seconds}`
        }
    },
    methods: {
        decrementTimer() {
            this.Timeout -= 1
            if (this.Timeout <= 0) {
                this.Timeover = true
                clearInterval(this.Timer)
            }
        },
        setTimer() {
            this.Timer = setInterval(this.decrementTimer, 1000)
        },
        setTimerAgain(seconds) {
            this.Timeover = false
            this.Timeout = seconds
        }
    },
    beforeUnmount() {
        clearInterval(this.Timer)
    }
}
