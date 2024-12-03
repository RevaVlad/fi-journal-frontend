export function checkIfDatesEqual(date1, date2){
    return Math.abs(date1.getTime() - date2.getTime()) < 86_400_000
        && date1.getDate() === date2.getDate();
}

export function getSubjectColor(tableId){
    let colorFromStorage = localStorage.getItem(tableId);
    if (colorFromStorage)
        return colorFromStorage;
    else {
        let subjectColor = chooseSubjectColor()
        localStorage.setItem(tableId, subjectColor);
        return subjectColor;
    }
}

const subjectColors = [
    "#F47858",
    "#EC7091",
    "#69C350",
    "#49B4DC",
    "#8F79EB",
    "#8680F8",
    "#A40CFF",
    "#2F76F5",
    "#D219D1",
    "#4682B4",
    "#4B0082",
    "#30B287",
    "#E855E8",
    "#C71585",
    "#6A5ACD"
]

function chooseSubjectColor() {
    let availableColors = JSON.parse(localStorage.getItem("availableColors"));
    if (availableColors == null || availableColors.length === 0)
        availableColors = subjectColors;
    let color = randomChoice(availableColors);
    availableColors = availableColors.filter(x => x !== color);
    localStorage.setItem("availableColors", JSON.stringify(availableColors));
    return color;
}

function randomChoice(array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}
