import prompt from 'async-prompt'
import { numerosAPalabras } from './module/traducirNumerosAPalabras.js'

let lista = []
let badera = undefined;
do{
    lista.push(Number(await prompt("Ingrese un numero: ")))
    badera = Number(await prompt("¿Deseas ingrese otro numero?\n\t0.No\n\t1.Si\n"))
}while(badera)

console.log(numerosAPalabras(lista))