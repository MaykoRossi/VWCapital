const apiKey = 'wss://testnet.binance.vision/ws-api/v3';  // Substitua pela sua chave de API
const exchangeRates = {};

// Função para buscar as cotações de câmbio
function fetchExchangeRates() {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    $.get(url, function(data) {
        exchangeRates.USD = data.conversion_rates;
        exchangeRates.BRL = {
            USD: 1 / exchangeRates.USD.BRL,
            ARS: exchangeRates.USD.ARS / exchangeRates.USD.BRL
        };
        exchangeRates.ARS = {
            USD: 1 / exchangeRates.USD.ARS,
            BRL: exchangeRates.USD.BRL / exchangeRates.USD.ARS
        };
        updateExchangeRate(); // Atualizar a taxa de câmbio exibida ao carregar os dados
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

    const rate = exchangeRates[fromCurrency][toCurrency];
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

    const rate = exchangeRates[fromCurrency][toCurrency];

    if (rate) {
        const result = rate * amount;
        document.getElementById('result').innerText = `Resultado: ${result.toFixed(2)} ${toCurrency}`;
    } else {
        alert('Taxa de câmbio não disponível no momento.');
    }
}