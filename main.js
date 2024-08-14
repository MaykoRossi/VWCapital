const baseUrl = 'https://api.binance.com/api/v3/';
const exchangeRates = {};

// Função para buscar as cotações de câmbio
function fetchExchangeRates() {
    const url = `${baseUrl}ticker/price`;

    $.get(url, function(data) {
        // Inicialize as taxas de conversão
        const rates = {};
        data.forEach(pair => {
            const symbol = pair.symbol;
            const price = parseFloat(pair.price);
            if (symbol === 'USDTBRL') {
                rates.BRL = { USDT: price };
            } else if (symbol === 'USDTARS') {
                rates.ARS = { USDT: price };
            } else if (symbol === 'USDTUSD') {
                rates.USD = { USDT: price };
            }
        });

        // Calcular as taxas de câmbio entre BRL, ARS e USD
        if (rates.BRL && rates.ARS && rates.USD) {
            exchangeRates.BRL = {
                USD: 1 / rates.BRL.USDT * rates.USD.USDT,
                ARS: rates.ARS.USDT / rates.BRL.USDT
            };

            exchangeRates.ARS = {
                USD: 1 / rates.ARS.USDT * rates.USD.USDT,
                BRL: 1 / rates.ARS.USDT * rates.BRL.USDT
            };

            exchangeRates.USD = {
                BRL: rates.BRL.USDT / rates.USD.USDT,
                ARS: rates.ARS.USDT / rates.USD.USDT
            };

            updateExchangeRate(); // Atualizar a taxa de câmbio exibida ao carregar os dados
        } else {
            alert('Taxas de câmbio não disponíveis. Por favor, tente novamente mais tarde.');
        }
    }).fail(function() {
        alert('Erro ao buscar a cotação. Por favor, tente novamente mais tarde.');
    });
}

fetchExchangeRates();

function updateExchangeRate() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (fromCurrency === toCurrency) {
        document.getElementById('exchangeRate').innerText = '1';
        return;
    }

    const rate = exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency];
    document.getElementById('exchangeRate').innerText = `TAXA: ${rate ? rate.toFixed(4) : 'N/A'}`;
}

function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    if (amount === '' || isNaN(amount)) {
        alert('Por favor, insira um valor válido.');
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById('result').innerText = `Resultado: ${amount} ${toCurrency}`;
        return;
    }

    const rate = exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency];

    if (rate) {
        const result = rate * amount;
        document.getElementById('result').innerText = `Resultado: ${result.toFixed(2)} ${toCurrency}`;
    } else {
        alert('Taxa de câmbio não disponível no momento.');
    }
}
