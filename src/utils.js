export function checkIfDatesEqual(date1, date2){
    return Math.abs(date1.getTime() - date2.getTime()) < 86_400_000
        && date1.getDate() === date2.getDate();
}
