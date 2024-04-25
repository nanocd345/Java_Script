import {getEmployeesByCode, getEmployeesByIdCode} from "./employees.js"
import {getOfficesByCode} from "./offices.js"
import {getAllCompletedPayments} from "./payments.js"

export const getAll = async()=>{
    
    let res = await fetch("http://localhost:5501/clients")
    let client = await res.json();
    
    let dataCliente = await res.json();
    
    for(const val of dataCliente){
        let [employee] = await getEmployeesByCode(val.code_employee_sales_manager)
        let {code_office} = employee
        let [office] = await getOfficesByCode(code_office)
        employee.code_office = office
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

export const getAllClientsWithNotPaymentsWithManagersSales = async()=>{
    
    let res = await fetch("http://localhost:5505/payments")
    let client = await res.json();
    for(const val of dataCliente){
        var [client_code] = await getAllClientsNotPayment(val.code_client)
        //var [employee] = await getEmployeesByIdCode(val.)
        val.code_client = client_code
    }
    for(const val of dataCliente){
        var [code_employee_sales_manager] = await getEmployeesByIdCode(val.code_client.code_employee_sales_manager)
        val.code_client.code_employee_sales_manager = code_employee_sales_manager
    }
    for(let i=0; i<client.length; i++){
        let {
            payment:payment,
            limit_credit:limit_credit,
            id_transaction:id_transaction,
            date_payment:date_payment,
            total:total,
            id:id,
            ...PaymentUpdate} = client[i]
    
            client[i] = PaymentUpdate
        let [clientes] = await getAllClientsNotPayment(PaymentUpdate.code_client)
        let {
            client_code: client_code,
            client_name: client_name,
            phone: phone,
            fax: fax,
            address1: address1,
            address2: address2,
            region: region,
            country: country,
            postal_code: postal_code,
            limit_credit: limit_credit_clone,
            id: id_clone,
            ...employeeUpdate
        } = clientes
        client[i] = employeeUpdate
        let [employees] = await getEmployeesByIdCode(employeeUpdate.code_employee_sales_manager)
        let {
            employee_code:employee_code,
            id:id_employee,
            extension,
            email,
            code_office,
            code_boss,
            position,
            ...employeeUpdateTrue
        } = employees
        var data = {...PaymentUpdate, ...employeeUpdate, ...employeeUpdateTrue}
        
        client[i] = {
            client_name: `${data.contact_name} ${data.contact_lastname}`,
            employees_full_name: `${data.name} ${data.lastname1} ${data.lastname2}`
        }
        
    }

    return data;
}

