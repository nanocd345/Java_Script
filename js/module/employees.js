// 3. Devuelve un listado con el nombre, apellidos y email de los empleados 
// cuyo jefe tiene un código de jefe igual a 7.
export const getAllFullNameAndEmailsAndBoss = async() =>{
    let res = await fetch("http://localhost:5502/employees?code_boss=7")
    let data = await res.json();
    let dataUpdate = data.map(val=>{
        return {
            name: val.name,
            fullLastname: `${val.lastname1} ${val.lastname2}`,
            email: val.email.match(/(?<=\[)[^\[\]]+@[^@\[\]]+(?=\])/)[0]
        }
    })
    return dataUpdate;
}
// 4. Devuelve el nombre del puesto, nombre, apellidos y
//  email del jefe de la empresa.
export const getBossFullNameAndEmail = async() =>{
    let res=await fetch("http://localhost:5502/employees")
    let data =await res.json();
    let dataUpdate = []
    data.forEach(val=>{
        if(val.code_boss == null){
            dataUpdate.push({
                position: val.position,
                name: val.name,
                fullLastname: `${val.lastname1} ${val.lastname2}`,
                email: val.email.match(/(?<=\[)[^\[\]]+@[^@\[\]]+(?=\])/)[0]
    
            })
        }
    })
    return dataUpdate
}

//5. Devuelve un listado con el nombre, apellidos y puesto de aquellos 
// empleados que no sean representantes de ventas.
export const getAllFullnamePositionDiferentSalesRepresentative = async()=>{
    let res = await fetch("http://localhost:5502/employees?position_ne=Representante Ventas")
    let data = await res.json();
    let dataUpdata = []
    data.forEach(val => {
        if(val.code_boss != null){
            dataUpdata.push({
                name: val.name,
                fullLastname: `${val.lastname1} ${val.lastname2}`,
                position: val.position,
            })
        }
    });
    return dataUpdata;
}


// Obtener toda la informacion del empleado por codigo
export const getEmployeesByCode = async(code)=>{
    let res = await fetch(`http://localhost:5502/employees?employee_code=${code}`)
    let data = await res.json();
    return data
}