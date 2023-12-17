import dayjs from "dayjs";
// determina e gera o calendário que será exibido na home page
export function generateDatesFromYearBeginning() {
    const firstDayOfTheYear = dayjs().startOf('year') // obtem o primeiro dia do ano
    const today = new Date() // obtem o dia atual


    const dates = []
    let compareDate = firstDayOfTheYear

    // gera as datas, enquanto a data comparada for menor que a data atual
    while (compareDate.isBefore(today)) {
        dates.push(compareDate.toDate())
        compareDate = compareDate.add(1, 'day')
    }

    return dates // terorna as datas geradas desde o primeiro dia do ano até o dia atual
}

// gera datas apartir do dia 01/01/2023 até o dia atual