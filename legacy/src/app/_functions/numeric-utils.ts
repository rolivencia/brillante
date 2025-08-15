export function decimalsSeparator(x): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function replaceDotWithComma(x): string {
    return x.toString().replace('.', ',');
}
