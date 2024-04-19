export const sumarArreglo = (array, start, end)=>{
    if(end<=0 && start==0) return 0;
    if(array.length <= end) return 0;
    
    let nueva = array.slice(start, (end+1));
    let suma = nueva.reduce((a, b) => a + b, 0);
    return suma
}