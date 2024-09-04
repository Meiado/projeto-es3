export const currencyMask = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, ""); 
    if (value.length === 1) {
        value = '0.0' + value; 
    } else if (value.length === 2) {
        value = '0.' + value; 
    } else {
        value = value.replace(/(\d+)(\d{2})$/, "$1.$2"); 
    }
    value = value.replace(/^0+(\d)/, "$1"); 
    event.target.value = value;
    return event;
};

export const currencyFormat = (currency: string) => {
    if (!currency.includes('.')) {
        return currency + ".00";
    } else if (currency.split('.')[1].length === 1) {
        return currency + "0";
    } else {
        return currency;
    }
};

export const adicionarUmDia = (data) => {
    const novaData = new Date(data);
    novaData.setDate(novaData.getDate() + 1);
    return novaData;
}

