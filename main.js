const apiKey = ''; // A API de conversão de moedas utilizada aqui não requer uma chave
const baseUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; // Endpoint para obter taxas de câmbio
const exchangeRates = {};

// Função para buscar as cotações de câmbio
function fetchExchangeRates() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            exchangeRates.USD = data.rates;
            exchangeRates.BRL = {
                USD: 1 / exchangeRates.USD.BRL,
                ARS: exchangeRates.USD.ARS / exchangeRates.USD.BRL
            };
            exchangeRates.ARS = {
                USD: 1 / exchangeRates.USD.ARS,
                BRL: exchangeRates.USD.BRL / exchangeRates.USD.ARS
            };
            updateExchangeRate(); // Atualizar a taxa de câmbio exibida ao carregar os dados
        })
        .catch(() => {
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