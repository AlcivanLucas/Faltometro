import dayjs from "dayjs";
// determina e gera o calendário que será exibido na home page
export function generateDatesFromYearBeginning() {
    const firstDayOfTheMonth = dayjs().startOf('month'); // obtem o primeiro dia do mês
    const today = new Date() // obtem o dia atual


    const dates = []
    let compareDate = firstDayOfTheMonth;

    // gera as datas, enquanto a data comparada for menor que a data atual
    while (compareDate.isBefore(today)) {
        dates.push(compareDate.toDate());
        compareDate = compareDate.add(1, 'day');
    }

    return dates // terorna as datas geradas desde o primeiro dia do mes até o dia atual
}

