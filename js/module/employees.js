import { 
    getAllClients 
} from "./client.js";
// 3. Devuelve un listado con el nombre, apellidos y email de los empleados cuyo jefe 
// tiene un código de jefe igual a 7.
export const getAllEmployeesWithBossAndCodeSeven = async() =>{
    let res = await fetch("http://localhost:5502/employees?code_boss=7")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let [email] = val.email.match(/(?<=\[)[^\[\]]+@[^@\[\]]+(?=\])/)
        dataUpdate.push({
            nombre: val.name,
            apellidos: `${val.lastname1} ${val.lastname2}`,
            email
        });
    });
    return dataUpdate;
}
// 4. Devuelve el nombre del puesto, nombre, apellidos y email del jefe de la 
// empresa.
export const getBossFullNameAndEmail = async()=>{
    let res = await fetch("http://localhost:5502/employees");
    let data = await res.json();
    let dataUpdate = {};
    data.forEach(val => {
        if(val.code_boss == null){
            dataUpdate.nombre = val.name
            dataUpdate.apellidos = `${val.lastname1} ${val.lastname2}`
            dataUpdate.email = val.email.match(/(?<=\[)[^\[\]]+@[^@\[\]]+(?=\])/)[0]
            dataUpdate.puesto = val.position
        }
    });
    
    return dataUpdate;
}
//5. Devuelve un listado con el nombre, apellidos y puesto de aquellos empleados 
// que no sean representantes de ventas.
export const getAllEmployeesNotSalesReps = async()=>{
    let res = await fetch("http://localhost:5502/employees?position_ne=Representante%20Ventas")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        dataUpdate.push({
            nombre: val.name,
            apellidos: `${val.lastname1} ${val.lastname2}`,
            puesto: val.position
        })
    });
    console.log(dataUpdate)
    return dataUpdate;
}
//9. Devuelve un listado que muestre el nombre de cada empleados, 
// el nombre de su jefe y el nombre del jefe de sus jefe.
export const getAll3 = async()=>{
    let dataEmployees = await getAllEmploy();
    for (let i = 0; i < dataEmployees.length; i++) {
        let {code_boss} = dataEmployees[i]
        let listBoss = [];
        if(!code_boss) continue 
        do{
            let searchedBoss = async() => await getEmployByCode(code_boss)
            let [boos] = await searchedBoss()
            code_boss = boos.code_boss
            listBoss.push(boos)
        }while(code_boss)
        dataEmployees[i].code_boss = listBoss;
    }
    return dataEmployees[29];
}
// Consultas multitabla (Composición externa)
// 12. Devuelve un listado con los datos de los empleados que no 
// tienen clientes asociados y el nombre de su jefe asociado
export const getAllEmployNotClients = async()=>{
    let dataClients = await getAllClients();
    let dataEmployees = await getAllEmploy();
    let code_employee_sales_manager = [...new Set(dataClients.map(val => val.code_employee_sales_manager))]
    let employee_code = dataEmployees.map(val => val.employee_code)
    let codes = [
        code_employee_sales_manager,
        employee_code
    ]
    let code = codes.reduce((resultado, array) => resultado.filter(elemento => !array.includes(elemento)).concat(array.filter(elemento => !resultado.includes(elemento))))
    let employees = []
    for (let i = 0; i < code.length; i++) {
        let searchingEmployees = async() => await getEmployByCode(code[i])
        let [employee] = await searchingEmployees()
        if(!employee.code_boss) {
            let {
                code_boss,
                ...employeeUpdate
            } = employee
            employeeUpdate.name_boss = employee.name;
            employees.push(employeeUpdate)
            continue
        }
        let searchedBoss = async() => await getEmployByCode(employee.code_boss)
        let [boos] = await searchedBoss()
        let {
            code_boss,
            ...employeeUpdate
        } = employee
        employeeUpdate.name_boss = boos.name;
        employees.push(employeeUpdate)
    }
    return employees
}
// Obtener la informacion de un empleado por su codigo
export const getEmployByCode = async(code) =>{
    let res = await fetch(`http://localhost:5502/employees?employee_code=${code}`);
    let dataClients = await res.json();
    return dataClients;
}
// Obtener la informacion de un empleado por su codigo
export const getAllEmploy = async() =>{
    let res = await fetch(`http://localhost:5502/employees`);
    let data = await res.json();
    return data;
}