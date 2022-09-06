const currency_source = document.getElementById('currency-one');
const currency_convert = document.getElementById('currency-two');
const currency_source_value = document.getElementById('amount-one');
const currency_convert_value = document.getElementById('amount-two');
const rate = document.getElementById('rate');

const swap = document.getElementById('swap');

function calculate() {
const currency_one = currency_source.value;
const currency_two = currency_convert.value;

fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
 .then(res => res.json())
 .then(data => {
    console.log(data);
    const rates = data.rates[currency_two];
    rate.innerText = `1 ${currency_one} = ${rates} ${currency_two}`;

    currency_convert_value.value = (currency_source_value.value * rates).toFixed(2);
 });
}

swap.addEventListener('click', () => {
    let temp_option = currency_source.value;
    currency_source.value = currency_convert.value;
    currency_convert.value = temp_option;
    let temp = currency_source_value.value;
    currency_source_value.value = currency_convert_value.value;
    currency_convert_value.value = temp;
    calculate();

})

//event listeners:

currency_convert.addEventListener('change', calculate);
currency_convert_value.addEventListener('input', calculate);
currency_source.addEventListener('change', calculate);
currency_source_value.addEventListener('input', calculate);