export const capitalizarPalabra = (palabra) => {

    const x = palabra.split(" ");
    for (let i = 0; i < x.length; i++) {
        x[i] = x[i].charAt(0).toUpperCase() + x[i].slice(1);
    }

    const y = x.join(" ");


    return y;
}