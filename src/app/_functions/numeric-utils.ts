export function decimalsSeparator(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function replaceDotWithComma(x) {
    return x.toString().replace('.', ',');
}
