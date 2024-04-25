import {getEmployeesByCode, getEmployeesByIdCode} from "./employees.js"
import {getOfficesByCode} from "./offices.js"
import {getAllCompletedPayments} from "./payments.js"

export const getAllClientsByCode = async (code) => {
    let res = await fetch(`http://localhost:5501/clients?client_code=${code}`);
    let data = await res.json(); 
    return data
}

//Ejercicio N.6
export const getAllSpanishClients = async()=>{
    let res = await fetch("http://localhost:5501/clients")
    let data = await res.json()
    let dataUpdate = []
    data.forEach(val =>{
        if(val.country == "Spain"){
            dataUpdate.push({
                name: val.contact_name,
                country: val.country
            })
        }
    })
    return dataUpdate
} 

//Ejercicio N.16

export const getAllClients = async()=>{
    let res = await fetch("http://localhost:5501/clients?city=Madrid")
    let data = await res.json()
    let dataUpdate = []
    data.forEach(val =>{
        if(val.code_employee_sales_manager == 11 || val.code_employee_sales_manager == 30){
            dataUpdate.push(val)
        }
    })
    return dataUpdate
} 

//Ejercicio N.7 (Consulta Multitabla) Devuelve el nombre de los clientes y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.

export const getAllClientsAndManagersWithTheOfficeCity = async()=>{
    
    let res = await fetch("http://localhost:5501/clients")
    let client = await res.json();
    for(let i=0; i<client.length; i++){
        let {
            id:id_client,
            limit_credit,
            postal_code:postal_code_client,
            country:country_client,
            region:region_client,
            city,
            address2:address2_client,
            address1:address1_client,
            fax,
            phone,
            ...clientUpdate} = client[i]
            client[i] = clientUpdate
        let [employee] = await getEmployeesByCode(clientUpdate.code_employee_sales_manager)
        let {
            id:id_employee,
            extension,
            email,
            code_boss,
            position,
            ...employeeUpdate
        } = employee
        let [office] = await getOfficesByCode(employeeUpdate.code_office)
        let {
            id:id_office,
            country,
            region,
            postal_code,
            movil,
            address1,
            address2,
            ...officeUpdate
        } = office
        let data = {...clientUpdate, ...employeeUpdate, ...officeUpdate}
        client[i] = {
            client_name: `${data.client_name}`,
            employees_full_name: `${data.name} ${data.lastname1} ${data.lastname2}`,
            employees_office_code: data.code_office,
            city_employees: data.city
        }
    }   
    return client;
} 

//Ejercici N.1 (Consulta Multitabla)

export const getAllClientsWithSalesManagerName = async()=>{
    
    let res = await fetch("http://localhost:5501/clients")
    let client = await res.json();
    for(const val of dataCliente){
        var [employee] = await getEmployeesByIdCode(val.code_employee_sales_manager)
        val.code_employee_sales_manager = employee
    }
    for(let i=0; i<client.length; i++){
        let {
            id:id_client,
            limit_credit,
            postal_code:postal_code_client,
            country:country_client,
            region:region_client,
            city,
            address2:address2_client,
            address1:address1_client,
            fax,
            phone,
            ...clientUpdate} = client[i]
            client[i] = clientUpdate
        let [employee] = await getEmployeesByIdCode(clientUpdate.code_employee_sales_manager)
        let {
            id:id_employee,
            extension,
            email,
            code_boss,
            position,
            code_office,
            ...employeeUpdate
        } = employee
        let data = {...clientUpdate, ...employeeUpdate}
        client[i] = {
            client_name: `${data.client_name}`,
            employees_full_name: `${data.name} ${data.lastname1} ${data.lastname2}`,
        }
    }

    return client;
}

//2 (Consulta multitabla) //falta filtrar los datos que pide

export const getAllClientsWithPaymensAndSalesManagmentInfo = async()=>{
    
    let res = await fetch("http://localhost:5501/clients")
    let client = await res.json();
    
    for(const val of client){
        var [employee] = await getEmployeesByIdCode(val.code_employee_sales_manager)
        var [payments] = await getAllCompletedPayments(val.client_code)
        
        if(payments === undefined){
            continue
        }
        val.code_employee_sales_manager = employee
        val.client_code = payments
    }
    for(const val of client){
        if(typeof val.client_code === 'number'){
            client = client.filter(client => client !== val);
            continue;
        }
    }
    for(let i=0; i<client.length; i++){
        let {
            id:id_client,
            limit_credit,
            postal_code:postal_code_client,
            country:country_client,
            region:region_client,
            city,
            address2:address2_client,
            address1:address1_client,
            fax,
            phone,
            ...clientUpdate} = client[i]
            client[i] = clientUpdate
        let [employee] = await getEmployeesByIdCode(clientUpdate.code_employee_sales_manager)
        let {
            id:id_employee,
            extension,
            email,
            code_boss,
            position,
            code_office,
            ...employeeUpdate
        } = employee
        let data = {...clientUpdate, ...employeeUpdate}
        client[i] = {
            client_name: `${data.client_name}`,
            employees_full_name: `${data.name} ${data.lastname1} ${data.lastname2}`,
        }
    }
    return client;
} 

//Ejercicio N.3 complemento (Filtrar los clientes por codigo)
export const getAllClientsNotPayment = async(code) =>{
    let res = await fetch(`http://localhost:5501/clients?client_code=${code}`)
    let data = await res.json()
    return data;
}

//Ejercicio N.6 (multitabla)

export const getAllAdressOfficesFunlabrada = async()=>{
    
    let res = await fetch("http://localhost:5501/clients?city=Fuenlabrada")
    let client = await res.json();
    for(let i=0; i<client.length; i++){
        let {
            id:id_client,
            limit_credit,
            postal_code:postal_code_client,
            country:country_client,
            region:region_client,
            address2:address2_client,
            address1:address1_client,
            fax,
            phone,
            ...clientUpdate} = client[i]
            client[i] = clientUpdate
        let [employee] = await getEmployeesByCode(clientUpdate.code_employee_sales_manager)
        let {
            id:id_employee,
            extension,
            email,
            code_boss,
            position,
            ...employeeUpdate
        } = employee
        let [office] = await getOfficesByCode(employeeUpdate.code_office)
        let {
            id:id_office,
            country,
            region,
            postal_code,
            movil,
            address1,
            address2,
            ...officeUpdate
        } = office
        let data = {...clientUpdate, ...employeeUpdate, ...officeUpdate}
        client[i] = {
            client_name: `${data.client_name}`,
            employees_full_name: `${data.name} ${data.lastname1} ${data.lastname2}`,
            employees_office_code: data.code_office,
            city_employees: data.city
        }
    }   
    return client;
} 



