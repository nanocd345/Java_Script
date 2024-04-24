import { 
    getEmployeesByCode 
} from "./employees.js";
import { 
    getOfficesByCode 
} from "./offices.js";

// 16. Devuelve un listado con todos los clientes que sean de la 
// ciudad de Madrid y cuyo representante de ventas tenga el código 
// de empleado 11 o 30.
export const getAllClientsFromCityAndCode = async()=>{
    let res = await fetch("http://localhost:5501/clients?city=Madrid")
    let data = await res.json();
    let clientUpdate = [];
    clientUpdate = data.filter(val => val.code_employee_sales_manager == 11 || val.code_employee_sales_manager == 30);
    return clientUpdate
}
// Consultas multitabla
// 7. Devuelve el nombre de los clientes y el nombre de sus representantes
// junto con la ciudad de la oficina a la que pertenece el representante.
export const getAllClientsManagersWithTheirOfficeCity = async()=>{
    let res = await fetch("http://localhost:5501/clients")
    let client = await res.json();
    for (let i = 0; i < client.length; i++) {
        // Actualiza la data clientes eliminando identificadores que no queremos
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
        // Realizamos la consulta al fucion modular de los empleados para buscar
        // la informacion del empleado segun su id de la data cliente anterior
        // buscada
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
        // {  
        //     client_code: 38,
        //     client_name: 'El Jardin Viviente S.L',
        //     contact_name: 'Justin',
        //     contact_lastname: 'Smith',
        //     code_employee_sales_manager: 31,
        //     employee_code: 31,
        //     name: 'Mariko',
        //     lastname1: 'Kishi',
        //     lastname2: '',
        //     code_office: 'SYD-AU',
        //     city: 'Sydney'
        //   }
        client[i] = {
            client_name: `${data.client_name}`,
            employees_full_name: `${data.name} ${data.lastname1} ${data.lastname2}`,
            employees_office_code: data.code_office,
            city_employees: data.city
        }
        
    }
    return client;
}

//1. Obtén un listado con el nombre de cada cliente y el nombre y apellido de su representante de ventas.
export const getAllClientsAndManagersName = async () => {
    try {
        let res = await fetch("http://localhost:5501/clients");
        let clients = await res.json();
        let employeeNames = {};
        clients.forEach(client => {
            employeeNames[client.code_employee_sales_manager] = `${client.contact_name} ${client.contact_lastname}`;
        });
        clients.forEach(client => {
            let salesManagerName = employeeNames[client.code_employee_sales_manager];
            return console.log((`${client.client_name} - ${salesManagerName}`));
        });

    } catch (error) {
        console.error("No hay datos:", error);
    }
};

//6. Lista la dirección de las oficinas que tengan clientes en `Fuenlabrada`.


