//Ejercicio N.15
export const getAllOrnamentalsAndStockProducts = async() =>{
    let res = await fetch("http://localhost:5506/product?gama=Ornamentales&stock_gt=100")
    let data = await res.json()
    data.sort((a,b)=>{
        const priceA = a.price_sale;
        const priceB = b.price_sale;
        return priceB - priceA;
    })
    return data;
}