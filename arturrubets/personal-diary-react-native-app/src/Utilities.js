import { ToastAndroid } from "react-native";

const truncateText = (text, limit) => {
    text = text.trim();

    if (text.length > limit) {
        return text.substring(0, limit - 3) + "..."
    }
    return text;
}
const extractStringDate = (date = new Date()) => {
    date = new Date(date)
    const [year, month, day] = [
        date.getFullYear(),
        ((date.getMonth() + 1) + '').padStart(2, '0'),
        (date.getDate() + '').padStart(2, '0')
    ]
    return [year, month, day].join('-')
}

const toastMessage = (message) => {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0, 100
    )
}

const getDate = (date = new Date()) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]

    return {
        month: months[date.getMonth()],
        day: date.getDate(),
        year: date.getFullYear()
    }
}

export {
    truncateText,
    toastMessage,
    extractStringDate,
    getDate
}