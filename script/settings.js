const settings = {
    get = () => {
        const storage = window.localStorage;

        const values = {
            pomodoros: storage.getItem("pomodoros"),
            timer: storage.getItem("studytime"),
            shortbreak: storage.getItem("shortbreak"),
            longbreak: storage.getItem("longbreak"),
            soundEnabled: storage.getItem("soundEnabled")
        }

        return values.pomodoro ? values : { pomodoros: 4, timer: "25:00", shortbreak: "05:00", longbreak: "30:00", soundEnabled: true };
    }
}