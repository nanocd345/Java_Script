import {getEmployByCode} from "./employees.js"
import {getOfficesByCode} from "./offices.js"
import {getAllCompletedPayments} from "./payments.js"

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

//Ejercicio N.17
export const getAllClientsWithSalesManagerName = async()=>{
    
    let res = await fetch("http://localhost:5501/clients")
    let client = await res.json();
    for(const val of dataCliente){
        var [employee] = await getEmployByCode(val.code_employee_sales_manager)
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
        let [employee] = await getEmployByCode(clientUpdate.code_employee_sales_manager)
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

//Ejercicio N.18
export const getAllClientsWithPaymensAndSalesManagmentInfo = async()=>{
    let res=await fetch("http://localhost:5501/clients")
    let data =await res.json();
    let dataUpdate = [];
    let name=""
    let promises = data.map(async (val) => {
        let p=val.code_employee_sales_manager
        let validacion= await getAllCompletedPayments(val.client_code)
        if (validacion){
            let [employeescode] =await getEmployByCode(p);
            for (let key in employeescode) {
                if (key == "name"){
                    name= employeescode[key]
                }
            }
                return{
                    code: val.client_code,
                    name: val.client_name,
                    salesRepresentative: name
                }
        }
    })
    return await Promise.all(promises)
}
   

//Ejercicio N.22 
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
        let [employee] = await getEmployByCode(clientUpdate.code_employee_sales_manager)
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

//Ejercicio N.23  
export const getClientsEmploy = async() =>{
    let res = await fetch("http://localhost:5501/clients");
    let clients = await res.json();
    for (let i = 0; i < clients.length; i++) {
        let {
            client_code,
            contact_name,
            contact_lastname,
            phone,
            fax,
            address1:address1Client,
            address2:address2Client,
            city,
            region:regionClients,
            country:countryClients,
            postal_code:postal_codeClients,
            limit_credit,
            id:idClients,
            ...clientsUpdate
        } = clients[i];

        let [employ] = await getEmployByCode(clientsUpdate.code_employee_sales_manager)
        let {
            extension,
            email,
            code_boss,
            position,
            id:idEmploy,
            name,
            lastname1,
            lastname2,
            employee_code,
            ...employUpdate
        } = employ

        let [office] = await getOfficesByCode(employUpdate.code_office)

        let {
            country:countryOffice,
            region:regionOffice,
            postal_code:postal_codeOffice,
            movil,
            address1:address1Office,
            address2:address2Office,
            id:idOffice,
            ...officeUpdate
        } = office


        let data = {...clientsUpdate, ...employUpdate, ...officeUpdate};
        let {
            code_employee_sales_manager,
            code_office,
            ...dataUpdate       
        }=data;

        dataUpdate.name_employee = `${name} ${lastname1} ${lastname2}`
        clients[i] = dataUpdate
    }
    // [
    //     {
    //         city: "San Francisco"
    //         client_name : "GoldFish Garden"
    //         name_employee: "Walter Santiago Sanchez Lopez"
    //     }
    // ]
    return clients;
}

//Ejercicio N.27
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
    }
    var AllCodeRequestsLength = []
    for(let i = 0; i<uniqueClients.length; i++){
        AllCodeRequestsLength.push(uniqueClients[i].code_requests)
    }
    var nuevo = new Set()
    for(let i = 0; i<AllCodeRequestsLength.length; i++){
        for(let j = 0; j<AllCodeRequestsLength[i].length; j++){
            var requestsDetails = await getAllRequestDetails(AllCodeRequestsLength[i][j])
            nuevo.add(requestsDetails.product_code)
            uniqueClients[i]["single_code_request"] = requestsDetails.code_request
            continue
        }
        uniqueClients[i]["products"] = [...nuevo]
        nuevo = new Set()    
    }
    var uniqueInitials = new Set();
    for(let i = 0; i<uniqueClients.length; i++){
        // Recorrer el array de productos y agregar las iniciales al conjunto
        uniqueClients[i].products.forEach(subArray => {
            if(subArray === undefined){
                return
            }
            for(let i of subArray){
                uniqueInitials.add(i);
            }
        });
        uniqueClients[i].products = [...uniqueInitials];
    }
    return uniqueClients;
}

//Filtrar los clientes por codigo
export const getAllClientsNotPayment = async(code) =>{
    let res = await fetch(`http://localhost:5501/clients`);
    let data = await res.json();
    return data;
}

