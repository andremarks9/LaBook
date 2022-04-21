export const dateToString = (date:Date):string => {

    const dia = date.getDate().toString(), diaF = (dia.length === 1) ? "0"+dia : dia, mes = (date.getMonth()+1).toString(), mesF = (mes.length === 1) ? "0"+mes : mes, anoF = date.getFullYear()

    return diaF+"/"+mesF+"/"+anoF
}