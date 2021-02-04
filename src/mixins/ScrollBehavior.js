export default {
    methods: {
        logScrolling($event) {
            const Content = document.getElementsByTagName("ion-header")[0]
            if (Content && $event.detail.scrollTop > 0) {
                Content.classList.add("is-scrolled")
            }
            else if (Content && $event.detail.scrollTop === 0) {
                Content.classList.remove("is-scrolled")
            }
        }
    }
}
