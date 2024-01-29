import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const Phonefrom = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  
  const next = () => {
    navigate(`/card`)
    return phone;
  };

  return (
    <div className="phone">
      <div className="card">
        <div className="form">
          <view style={{display: "flex", alignItems: "center", width: '100%'}}>
            <label className="phone-label">+998</label>
            <input
              aria-label="+998"
              type="tel"
              placeholder="Номер телефона"
              className="phone-input"
              onChange={(e) => setPhone(e.target.value)}
            />
          </view>
          <button className="form-btn" onClick={next}>
            Далее
          </button>
        </div>
      </div>
    </div>
  );
};

export default Phonefrom;
