// 1. Devuelve un listado con el código de oficina y la ciudad 
// donde hay oficinas.
export const getAllOficceAndCodeCity = async()=>{
    let res = await fetch("http://localhost:5504/offices")
    let data = await res.json();
    let dataUpdate = data.map(val =>{
        return {
            code_office: val.code_office,
            city: val.city
        }
    })
    return dataUpdate;
}
// 2. Devuelve un listado con la ciudad y el teléfono de las oficinas de España.
export const getAllOficceCityAndMovil = async()=>{
    let res = await fetch("http://localhost:5504/offices?country=España")
    let data = await res.json();
    let dataUpdate = data.map(val =>{
        return {
            code_office: val.code_office,
            movil: val.movil
        }
    })
    return dataUpdate
}