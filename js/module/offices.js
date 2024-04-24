import {
    getClientsByCode
} from "./clients.js";

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


// Obtener toda la informacion de la oficina por codigo
export const getOfficesByCode = async(code)=>{
    let res = await fetch(`http://localhost:5504/offices?code_office=${code}`)
    let data = await res.json();
    return data
}


//6. Lista la dirección de las oficinas que tengan clientes en `Fuenlabrada`.
export const getAllOfficeDirrectionAndClientsInFuenlabrada = async () => {
    let res = await fetch("http://localhost:5504/offices")
    let office = await res.json();
    for (let i = 0; i < office.length; i++) {
        let {
            id:id_office,
            country,
            region,
            postal_code:codigo_postal,
            movil,
            address1:constraseña1,
            address2:contraseña2,
            ...officeUpdate
        } = office[i]
        office[i] = officeUpdate
        // Filtrar los elementos del json de clients para optener los clientes respecto a la ubicacion Fuenlabra
        let [client] = await getClientsByCode(officeUpdate.city)
        let {
            contact_name,
            contact_lastname,
            code_employee_sales_manager,
            address2,
            address1,
            fax,
            phone,
            postal_code,
            limit_credit,
            ...clientUpdate
        } = client
        let data = {...officeUpdate, ...clientUpdate}
        office[i] = {
            client_name: `${data.client_name}`,
            client_office_code: data.code_office,
            client_city: data.client_city,
        }
    }
    return office;
}