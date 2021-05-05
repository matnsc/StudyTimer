const sound = {
    play() {
        let alert = new Audio("../sounds/notification.ogg");
        alert.currentTime = 0;
        alert.play();
    }
}