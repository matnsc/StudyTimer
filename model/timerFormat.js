class TimerFormat {

    static minutesAndSecondsToText(minutes, seconds) {

        return minutes + ':' + seconds;

    }

    static textToMinutesAndSeconds(value) {

        const minutesAndSeconds = value.split(':');

        return {
            "minutes": minutesAndSeconds[0],
            "seconds": minutesAndSeconds[1]
        };

    }

    static textToMilliseconds(value) {

        const minutesAndSeconds = this.textToMinutesAndSeconds(value);

        const minutes = parseInt(minutesAndSeconds.minutes);
        const seconds = parseInt(minutesAndSeconds.seconds);

        return ((minutes * 60) * 1000) + (seconds * 1000);

    }

    static millisecondsToText(value) {

        const totalSeconds = value / 1000;

        const minutes = Math.floor(totalSeconds / 60).toString();
        const seconds = Math.floor(totalSeconds % 60).toString();

        return minutes.padStart(2, '0') + ':' + seconds.padStart(2, '0');

    }

    static millisecondsToMinutes(value) {

        return Math.ceil(value / 1000 / 60);

    }

}