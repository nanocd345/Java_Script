export const numerosAPalabras = (arr)=>{
    
    let numerosLetras = ['cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
    let resultado = arr.map(val => numerosLetras[val])

    return resultado
}