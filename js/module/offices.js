//Ejercicio N.1
export const getAllOficceAndCodeCity = async() => {
    let res = await fetch("http://localhost:5504/offices?city")
    let data = await res.json();
    let dataUpdate = data.map(val=>{
        return{
            code_office: val.code_office,
            city: val.city
        }
    })
    return dataUpdate
}

//Ejercicio N.2
export const getAllOficceCityAndMovil = async()=>{
    let res = await fetch("http://localhost:5504/offices?country=España")
    let data = await res.json()
    let dataUpdate = data.map(val =>{
        return{
            city: val.city,
            movil: val.movil
        }
    })
    return dataUpdate
} 

//Filtrar las oficinas por codigo
export const getOfficesByCode = async (code) => {
    let res = await fetch(`http://localhost:5504/offices?code_office=${code}`);
    let data = await res.json();
    return data
}