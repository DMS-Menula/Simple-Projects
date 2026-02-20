const converterForm = document.getElementById('converter-form');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');

window.addEventListener("load", fetchCurrencies);
converterForm.addEventListener('submit', convertCurrency);

async function fetchCurrencies(){
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();

    console.log(data);

    const currencyOptions = Object.keys(data.rates);

    currencyOptions.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency; 
        fromCurrency.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency; 
        toCurrency.appendChild(option2);
    });
}

function convertCurrency(e){
    e.preventDefault();

    const amount = parseFloat(amountInput.value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;

    if (isNaN(amount)) {
        resultDiv.textContent = "Please enter a valid number";
        return;
    }

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrencyValue];
            if (rate) {
                const convertedAmount = amount * rate;
                resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount.toFixed(2)} ${toCurrencyValue}`;
            } else {
                resultDiv.textContent = "Conversion rate not available";
            }
        })
        .catch(error => {
            console.error("Error fetching exchange rates:", error);
            resultDiv.textContent = "Error fetching exchange rates";
        });
}