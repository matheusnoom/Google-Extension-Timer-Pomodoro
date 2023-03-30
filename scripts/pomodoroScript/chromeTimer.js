function convertMinutesToMs(minutes){
    return minutes * 60000;
}

function convertSecondsToMs(seconds){
    return seconds * 1000;
}

export default async function createTimer(minutes,seconds){
    chrome.alarms.clearAll();
    chrome.alarms.create("myAlarm", {when: Date.now() + (convertMinutesToMs(minutes) + convertSecondsToMs(seconds))});
}