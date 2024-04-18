export const sumarRango = (numeroInicial, numeroFinal)=>{
    let resultado = 0;
    for (let i = numeroInicial; i <= numeroFinal; i++) {
        resultado += i
    }
    return resultado;
}
