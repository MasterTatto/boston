export const getFormatedDate = (date) => {
    if (date) {
        const newDate = new Date(date)
        return `${newDate.getFullYear()}-${newDate.getMonth() + 1 >= 10 ? newDate.getMonth() + 1 : `0${newDate.getMonth() + 1}`}-${newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`}`
    } else {
        return 'None'
    }
}
