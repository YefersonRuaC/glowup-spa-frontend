import { parse, formatISO, parseISO, format } from 'date-fns'//Using date-fns dependency
import es from 'date-fns/locale/es'

//Formatting string date to ISO date (frontend -> backend)
export function convertToISO(stringDate) {
    const newDate = parse(stringDate, 'dd/MM/yyyy', new Date())
    //fomatISO is the format that Mongo use to dates in type Date
    return formatISO(newDate)
}

//Formatting ISO date to string date (backend -> frontend)
export function displayDate(date) {
    const newDate = parseISO(date)
    const formattedDate = format(newDate, 'PPPP')//English (default)
    // const formattedDate = format(newDate, 'PPPP', {locale: es})//Spanish
    return formattedDate
}

export function convertToDDMMYYYY(isoDate) {
    const newDate = new Date(isoDate)
    const formattedDate = format(newDate, 'dd/MM/yyyy')
    return formattedDate
}