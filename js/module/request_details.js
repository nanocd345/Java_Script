//Filtrar los detalles de las solicitudes
export const getAllRequestDetails = async(code) =>{
    let res = await fetch(`http://localhost:5507/request_details?code_request=${code}`)
    let data = await res.json()
    
    let nuevo = {
        code_request: undefined,
        product_code: []
    };
    if (data !== undefined && data.length > 0) {
        nuevo.code_request = data[0].code_request
        for (let i of data) {
            nuevo.product_code.push(i.product_code);
        }
    }
    return nuevo;
}