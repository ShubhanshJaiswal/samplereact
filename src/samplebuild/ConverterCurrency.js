import { useState } from "react";
import Navbar from "../navbar/Navigationbar";
import '../samplebuild/concurrency.css'
import axios from "axios";
import Autocomplete from '../AutoComplete';

const currencies = [
  { code: "AUD", name: "Australian Dollar" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "DKK", name: "Danish Krone" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "ILS", name: "Israeli Shekel" },
  { code: "INR", name: "Indian Rupee" },
  { code: "ISK", name: "Icelandic Krona" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "KRW", name: "South Korean Won" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "RON", name: "Romanian Leu" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "THB", name: "Thai Baht" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "USD", name: "US Dollar" },
  { code: "ZAR", name: "South African Rand" }
];

function ConverterCurrency() {
    const [firstcurr, setFirstCurrency] = useState('');
    const [result, setResult] = useState(0.0);
    const [firstdrop, setFirstDrop] = useState('');
    const [seconddrop, setSecondDrop] = useState('');
    const [firstInputValue, setFirstInputValue] = useState('');
    const [secondInputValue, setSecondInputValue] = useState('');
    const [firstSuggestions, setFirstSuggestions] = useState([]);
    const [secondSuggestions, setSecondSuggestions] = useState([]);

    const handleFirstInput = (event) => {
        const value = event.target.value;
        setFirstInputValue(value);

        const filteredSuggestions = currencies.filter(currency =>
            currency.code.toLowerCase().includes(value.toLowerCase()) ||
            currency.name.toLowerCase().includes(value.toLowerCase())
        );
        setFirstSuggestions(filteredSuggestions);
    };

    const handleSecondInput = (event) => {
        const value = event.target.value;
        setSecondInputValue(value);

        const filteredSuggestions = currencies.filter(currency =>
            currency.code.toLowerCase().includes(value.toLowerCase()) ||
            currency.name.toLowerCase().includes(value.toLowerCase())
        );
        setSecondSuggestions(filteredSuggestions);
    };

  const HandleInput = (e) => {
    if (e) {
      let isnum = /^\d+$/.test(e);
      if (isnum) {
        setFirstCurrency(e);
      } else {
        alert('Input Only accepts Numbers');
        var input = document.getElementById('firstcur')
        if (input) {
          input.value = firstcurr;
        }
      }
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if(!firstcurr)
        return false;
    if (firstdrop && seconddrop) {
      if (firstdrop === seconddrop) {
        setResult(firstcurr)
      } else {
        const options = {
          url: `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_AOel1e6YFt3zb8tLPQmqLavdyFAi2DevdwrBrosp&currencies=${firstdrop}%2C${seconddrop}`,
          method: "GET"
        };
        var response = (await axios.request(options));
        console.log(response)
        if (response.status === 200) {
          var result = response.data.data;
          console.log(result);
          var a = parseFloat(result[firstdrop]);
          console.log(a);
          var b = parseFloat(result[seconddrop]);
          console.log(b);

          const conversionResult = (parseFloat(firstcurr) * b) / a;
          setResult(conversionResult.toFixed(3));
        } else {
          alert('Something went wrong..')
        }
      }
    } else {
      alert('Please Select Currencies')
    }
  };

  const HandleSelect = (value, drop) => {
    setResult(0);
    if (drop === 'firstdrop') {
      setFirstDrop(value);
    } else {
      setSecondDrop(value);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container divmain">
        <div className="maincurrencydiv">
          <h3>Currency Exchange</h3>
          <hr />
          <form onSubmit={(e) => HandleSubmit(e)} className="currency-form">
            <div className="form-group align-items-center d-flex">
              <Autocomplete
                suggestions={currencies}
                onSelect={(value) => HandleSelect(value, 'firstdrop')}
              />
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
              <Autocomplete
                suggestions={currencies}
                onSelect={(value) => HandleSelect(value, 'seconddrop')}
              />
            </div>
            <div className="form-group align-items-center d-flex">
              <input
                type="text"
                id="firstcur"
                className="form-control currency-input"
                placeholder="Enter Amount"
                onChange={(e) => HandleInput(e.target.value)}
              />
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
              <input
                type="text"
                readOnly
                className="form-control currency-result"
                id="resultvalue"
                value={result}
              />
            </div>
            <div className="form-group">
              <input
                className="btn btn-success convert-btn"
                type="submit"
                value="Convert"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ConverterCurrency;
