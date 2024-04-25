/*1 devolver el listado con el codigo de oficina y la ciudad 
donde hay oficinas*/
export const getAllOficceAndCodeCity = async() => {
    let res = await fetch("http://localhost:5504/offices?city")
    let data = await res.json();
    let dataUpdate = data.map(val=>{
        return{
            code_office: val.code_office,
            city: val.city
        }
    }) //aray de objetos
    return dataUpdate
}

//2 devuelve un listado con la ciudad y el telefono de las oficinas
export const getAllOficceCityAndMobile = async()=>{
    let res = await fetch("http://localhost:5504/offices?country=España")
    let data = await res.json()
    let dataUpdate = data.map(val =>{
        return{
            code_office: val.code_office,
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