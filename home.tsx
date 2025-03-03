import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate programmatically
import '@fortawesome/fontawesome-free/css/all.min.css';
import './home.css';

const HomePage = () => {
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically
  const [formData, setFormData] = useState({
    age: '',
    anaemia: '',
    creatininePhosphokinase: '',
    diabetes: '',
    ejectionFraction: '',
    highBloodPressure: '',
    platelets: '',
    serumCreatinine: '',
    serumSodium: '',
    sex: '',
    smoking: '',
    time: '',
  });

  // Handling form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        ['age', 'creatininePhosphokinase', 'ejectionFraction', 'serumCreatinine', 'serumSodium', 'platelets', 'time'].includes(name)
          ? value === '' ? '' : Number(value) // Convert numeric fields to numbers
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Prediction: ${
          result.raw_prediction >= 50 ? ' ' : ' '
        }\nThere is a ${result.heart_failure_probability}% chance of heart failure.`);
        navigate('/'); // Navigate back to FrontPage after successful form submission
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      alert('An error occurred while submitting the form.');
      console.error(error);
    }
  };

  return (
    <div>
      {/* Header Banner */}
      <div className="header-banner">
        Patient Heart Failure Prediction
      </div>

      {/* Form Container */}
      <div className="form-container">
        <h2>Enter Patient Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              placeholder="Enter age"
            />
          </div>
          <div>
            <label>Anaemia (0 or 1):</label>
            <input
              type="number"
              name="anaemia"
              value={formData.anaemia}
              onChange={handleChange}
              min="0"
              max="1"
              required
              placeholder="0 or 1"
            />
          </div>
          <div>
            <label>Creatinine Phosphokinase:</label>
            <input
              type="number"
              name="creatininePhosphokinase"
              value={formData.creatininePhosphokinase}
              onChange={handleChange}
              required
              placeholder="Enter value"
            />
          </div>
          <div>
            <label>Diabetes (0 or 1):</label>
            <input
              type="number"
              name="diabetes"
              value={formData.diabetes}
              onChange={handleChange}
              min="0"
              max="1"
              required
              placeholder="0 or 1"
            />
          </div>
          <div>
            <label>Ejection Fraction:</label>
            <input
              type="number"
              name="ejectionFraction"
              value={formData.ejectionFraction}
              onChange={handleChange}
              required
              placeholder="Enter value"
            />
          </div>
          <div>
            <label>High Blood Pressure (0 or 1):</label>
            <input
              type="number"
              name="highBloodPressure"
              value={formData.highBloodPressure}
              onChange={handleChange}
              min="0"
              max="1"
              required
              placeholder="0 or 1"
            />
          </div>
          <div>
            <label>Platelets:</label>
            <input
              type="number"
              name="platelets"
              value={formData.platelets}
              onChange={handleChange}
              required
              placeholder="Enter value"
            />
          </div>
          <div>
            <label>Serum Creatinine:</label>
            <input
              type="number"
              name="serumCreatinine"
              value={formData.serumCreatinine}
              onChange={handleChange}
              required
              placeholder="Enter value"
            />
          </div>
          <div>
            <label>Serum Sodium:</label>
            <input
              type="number"
              name="serumSodium"
              value={formData.serumSodium}
              onChange={handleChange}
              required
              placeholder="Enter value"
            />
          </div>
          <div>
            <label>Sex (0 or 1):</label>
            <input
              type="number"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              min="0"
              max="1"
              required
              placeholder="0 or 1"
            />
          </div>
          <div>
            <label>Smoking (0 or 1):</label>
            <input
              type="number"
              name="smoking"
              value={formData.smoking}
              onChange={handleChange}
              min="0"
              max="1"
              required
              placeholder="0 or 1"
            />
          </div>
          <div>
            <label>Time (days):</label>
            <input
              type="number"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              placeholder="Enter days"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
