import React, { useState } from "react";
import { useOrderData } from "./hooks/order";
import logo from './assets/payme_01.png'

function App() {
  const [phone, setPhone] = useState("");
  const [phoneVis, setPhoneVis] = useState(true);
  const [cardVis, setCardVis] = useState(false);
  const [smsForm, setSmsForm] = useState(false);
  const [expiry, setExpiry] = useState("");

  const next = () => {
    setPhoneVis(false);
    setCardVis(true);
    console.log(phone);
  };

  // Функция для форматирования ввода номера карты
  const formatCardNumber = (value) => {
    // Удаляем все пробелы
    const inputValue = value.replace(/\s/g, "");
    // Добавляем пробелы после каждых 4 символов
    const formattedValue = inputValue
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .substr(0, 19); // Ограничиваем длину поля 16 цифрами с пробелами
    return formattedValue;
  };

  const handleCardNumberChange = (e) => {
    const inputCardNumber = e.target.value;
    const formattedCardNumber = formatCardNumber(inputCardNumber);
    setCardNumber(formattedCardNumber);
  };

  const [cardNumber, setCardNumber] = useState("");

  const formatExpiry = (value) => {
    // Очищаем значение от нецифровых символов
    const cleanedValue = value.replace(/\D/g, "");
    // Ограничиваем длину ввода до 4 символов
    const limitedValue = cleanedValue.substr(0, 4);
    // Разделяем MM и YY
    const formattedValue = limitedValue
      .replace(/(\d{2})(\d{0,2})/, "$1 / $2")
      .trim();
    return formattedValue;
  };

  const handleExpiryChange = (e) => {
    const inputExpiry = e.target.value;
    const formattedExpiry = formatExpiry(inputExpiry);
    setExpiry(formattedExpiry);
  };

  const toSms = () => {
    setCardVis(false);
    setSmsForm(true);
  };

  const begining = () => {
    setCardVis(false)
    setSmsForm(false)
    setPhoneVis(true)
  }


  const {data} = useOrderData();
  console.log(data);

  return (
    <div className="App">
      <div className={`phone ${phoneVis}`}>
        <div className="card">
          <div className="form">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
            >
              <label className="phone-label">+998</label>
              <input
                aria-label="+998"
                type="tel"
                placeholder="Номер телефона"
                className="phone-input"
                maxLength={9}
                minLength={16}
                onChange={(e) => {
                  e.target.value.length < 10 && setPhone(e.target.value);
                }}
              />
            </div>
            <button className="form-btn" onClick={next}>
              Далее
            </button>
          </div>
        </div>
      </div>

      <div className={`card ${cardVis}`}>
        <div className="cardForm">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <label className="card-label" />
            <input
              maxLength={19} // Максимальная длина с учетом пробелов
              minLength={19} // Минимальная длина с учетом пробелов
              placeholder="Номер карты"
              type="text"
              className="card-input"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "30%",
            }}
          >
            <input
              placeholder="MM/YY"
              type="text"
              className="card-input"
              value={expiry}
              style={{borderRadius: 26}}
              onChange={handleExpiryChange}
            />
          </div>
          <button onClick={toSms} className="form-btn">
            Далее
          </button>
          <button onClick={begining} className="form-btn" style={{background: '#6c9e6d'}}>
            В Начало
          </button>
          <div>Powered by <img src={logo} alt="Pay me"/></div>
        </div>
      </div>

      <div className={`sms-form card ${smsForm}`}>
        <div className="cardForm">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <input
              maxLength={19} // Максимальная длина с учетом пробелов
              minLength={19} // Минимальная длина с учетом пробелов
              placeholder="Код Подтверждение"
              type="text"
              className="card-input"
              value={cardNumber}
              style={{ width: "100%" }}
              onChange={handleCardNumberChange}
            />
          </div>
          <button onClick={toSms} className="form-btn">
            Далее
          </button>
          <button onClick={begining} className="form-btn" style={{background: '#6c9e6d'}}>
            В Начало
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
