export async function getFocosStorage() {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(['minutesFocos'], function (value) {
                resolve(value.minutesFocos);
            })
        } catch (e) {
            reject(e);
        }
    });
}

export async function getBreakStorage() {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.get(['minutesBreak'], function (value) {
                resolve(value.minutesBreak);
            })
        } catch (e) {
            reject(e);
        }
    });
}
