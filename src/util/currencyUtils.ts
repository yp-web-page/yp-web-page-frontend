const convertNumberToCurrency = (value: number): string => {
    const currencyFormatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return currencyFormatter.format(value);
}

export const CurrencyUtils = {
    convertNumberToCurrency,
};