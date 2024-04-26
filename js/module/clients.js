import {getEmployeesByCode, getEmployeesByIdCode} from "./employees.js"
import {getOfficesByCode} from "./offices.js"
import {getAllCompletedPayments} from "./payments.js"
import {getAllNotAtTimeDelivers, getAllRequest} from "./Request.js"
import {getAllProducts} from "./product.js"
import {getAllRequestDetails} from "./request_details.js"

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

//10 (Multitabla) falta filtrar informacion
export const getAllAdressNotAtTimeDeliverClients = async()=>{
    
    let res = await fetch("http://localhost:5501/clients")
    let client = await res.json();
    let requests = await getAllNotAtTimeDelivers()
    let nuevo = new Set()
    for(let i = 0; i<client.length; i++){
        for(let j = 0; j<requests.length; j++){
            if(requests[j].code_client===client[i].client_code){
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
                let {
                    code_request,
                    date_request,
                    status,
                    comment,
                    id,
                    ...requestUpdate} = requests[j]
                let Nuevadata = {...clientUpdate, ...requestUpdate}
                nuevo.add(Nuevadata)   
            }
        }
    }
    let ListClientes = [...nuevo]
    return ListClientes;
}    

//Ejercicio N.11 (multitabla)

export const getAllCostumersWithGamas = async()=>{
    let res = await fetch("http://localhost:5501/clients")
    let clients = await res.json();
    let clientNames = clients.map(client => client.client_name);
    
    let uniqueClients = clients.filter((client, index) => {
        return clientNames.indexOf(client.client_name) === index;
    });

    let clientCodes = uniqueClients.map(client => client.client_code);
    let groups = {};

    uniqueClients.forEach((client,i) =>{
        let code_client = client.client_code;
        if(!groups[code_client]){
            groups[code_client] = []
        }
    })
    


    for (let i = uniqueClients.length - 1; i >= 0; i--) {
        var {
            id:id_client,
            limit_credit,
            postal_code:postal_code_client,
            country:country_client,
            region:region_client,
            address2:address2_client,
            address1:address1_client,
            fax,
            phone,
            city,
            code_employee_sales_manager,
            ...clientUpdate} = uniqueClients[i]
            uniqueClients[i] = clientUpdate
        let code_client = await getAllRequest(uniqueClients[i].client_code);
        if (code_client.code_client !== undefined) {
            uniqueClients[i] = {
                code_client: code_client.code_client,
                client_name: uniqueClients[i].contact_name,
                code_requests: code_client.codes_requests
                
            }
        } else {
            uniqueClients.splice(i, 1);
        }
        

        var AllCodeRequestsLength = []
        for(let i = 0; i<uniqueClients.length; i++){
            AllCodeRequestsLength.push(uniqueClients[i].code_requests)
            //lon = val.length
           //AllCodeRequestsLength.push(val.length)
        }
        
        /*
        
        for(let i = 0; i<uniqueClients.length; i++){
            for(let j of uniqueClients.code_requests){
                let requestsDetails = await getAllRequestDetails(j)
                uniqueClients[i] = {
                    code_client: code_client.code_client,
                    client_name: uniqueClients[i].contact_name,
                    code_requests: code_client.codes_requests,
                    product_code: requestsDetails.product_code 
                }
                continue
            }
            
        */
    }
        

    return AllCodeRequestsLength;
    /*
    for(let i=0; i<client.length; i++){
        var {
            id:id_client,
            limit_credit,
            postal_code:postal_code_client,
            country:country_client,
            region:region_client,
            address2:address2_client,
            address1:address1_client,
            fax,
            phone,
            city,
            code_employee_sales_manager,
            ...clientUpdate} = client[i]
            client[i] = clientUpdate
        names.push(clientUpdate.client_name)
        console.log(!names.some(val => val == client[i].client_name))
        
        /*if () {
            nuevo.push(clientUpdate);
        }
        /*
        let code_client = await getAllRequest(clientUpdate.client_code)
        clientUpdate.client_code = code_client
        otro.push(clientUpdate)
        /*
        let {
            date_request,
            date_wait,
            date_delivery,
            status,
            comment,
            id,
            ...requestsUpdate
        } = code_client
        let requestsDetails = await getAllRequestDetails(requestsUpdate.code_request)
        let {
            quantity,
            unit_price,
            line_number,
            id:id_request_details,
            ...requestsDetailsUpdate
        } = requestsDetails
        let products = await getAllProducts(requestsDetailsUpdate.product_code)
        let {
            name,
            dimension,
            provider,
            description,
            stock,
            price_sale,
            price_provider,
            id:id_products,
            ...productsUpdate
        } = products
        var data = {...clientUpdate, ...requestsUpdate, ...requestsDetailsUpdate, ...productsUpdate}
        /*
        client[i] = {
            client_name: `${data.client_name}`,
            employees_full_name: `${data.name} ${data.lastname1} ${data.lastname2}`,
            employees_office_code: data.code_office,
            city_employees: data.city
        }
        */
        
    }   