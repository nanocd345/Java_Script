import {getAllClientsNotPayment} from "./clients.js"
import {getEmployeesByIdCode} from "./employees.js"

//Ejercicio N.8
export const getAllClientsUniques = async() =>{
    let res = await fetch("http://localhost:5505/payments")
    let data = await res.json()
    let dataUpdate = [];
    let uniqueClientCodes = new Set();
    for(let i = 0; i<data.length; i++){
        let {date_payment, code_client} = data[i]
        let [year] = date_payment.split("-")
        if(year === "2008" && !uniqueClientCodes.has(code_client)){
            uniqueClientCodes.add(code_client);
            dataUpdate.push(code_client)
        }
    }
    return dataUpdate;
}

//13 Devuelve un listado con todos los pagos que se realizaron en el año `2008` mediante `Paypal`. Ordene el resultado de mayor a menor.

export const getAllPaymentsIn2008WithPaypal = async() => {
    let res = await fetch("http://localhost:5505/payments")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let {date_payment} = val
        let [year] = date_payment.split("-")
        if(year == "2008"){
            dataUpdate.push(val)
        }
    })
    dataUpdate.sort((a,b)=>{
        const dateA = new Date(a.date_payment);
        const dateB = new Date(b.date_payment);
        return dateB - dateA;
    })
    return dataUpdate;
}

//Ejercicio N.14

export const getAllPaymentsWays = async() =>{
    let res = await fetch("http://localhost:5505/payments")
    let data = await res.json()
    let uniqueClientCodes = new Set();
    for(let i = 0; i<data.length; i++){
        uniqueClientCodes.add(data[i].payment)
    }
    let dataUpdate = [...uniqueClientCodes]
    return dataUpdate;
}

//Filtrar los pagos completados por codigo

export const getAllCompletedPayments = async(code) =>{
    let res = await fetch(`http://localhost:5505/payments?code_client=${code}`)
    let data = await res.json()
    return data;
}

//Ejercicio N.3 (multitabla) y Ejercicio N.4

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
            employees_full_name: `${data.name} ${data.lastname1} ${data.lastname2}`,
        }
    }

    return data;
}