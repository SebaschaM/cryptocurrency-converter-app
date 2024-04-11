const useCripto = () => {
    const getCryptocurrencies = async () => {
        const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const compareCryptocurrencies = async (cryptoCurrency: string, currency: string) => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    return { getCryptocurrencies, compareCryptocurrencies };
}

export default useCripto;