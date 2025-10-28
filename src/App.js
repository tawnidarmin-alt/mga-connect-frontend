import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '', email: '', contactNumber: '', flightDate: '', flightNumber: '', flightTime: '',
    arrivalDeparture: 'Arrival', numberOfPassenger: '', passengerCategory: '', corporateBankName: '',
    serviceType: '', luggage: '', lounge: '', transport: '', hotel: '', payment: '', otherRequirement: ''
  });

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5001/bookings');
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/bookings', formData);
      setFormData({
        name: '', email: '', contactNumber: '', flightDate: '', flightNumber: '', flightTime: '',
        arrivalDeparture: 'Arrival', numberOfPassenger: '', passengerCategory: '', corporateBankName: '',
        serviceType: '', luggage: '', lounge: '', transport: '', hotel: '', payment: '', otherRequirement: ''
      });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };
  // Handle updates to staff-only fields
const updateBookingField = async (id, field, value) => {
  try {
    const updatedBooking = bookings.find(b => b.id === id);
    if (!updatedBooking) return;

    updatedBooking[field] = value;

    await axios.put(`http://localhost:5001/bookings/${id}`, updatedBooking);

    // Update state instantly for UI responsiveness
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, [field]: value } : b))
    );
  } catch (err) {
    console.error("Error updating booking:", err);
  }
};
const cancelBooking = async (id) => {
  if (!window.confirm("Are you sure you want to cancel this booking?")) return;

  try {
    await axios.delete(`http://localhost:5001/bookings/${id}`);
    setBookings(bookings.filter(b => b.id !== id));
  } catch (err) {
    console.error("Error cancelling booking:", err);
  }
};

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Booking Form</h2>

      <form className="booking-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Contact Number</label>
        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />

        <label>Flight Date</label>
        <input type="date" name="flightDate" value={formData.flightDate} onChange={handleChange} required />

        <label>Flight Number</label>
        <input type="text" name="flightNumber" value={formData.flightNumber} onChange={handleChange} />

        <label>Flight Time</label>
        <input type="time" name="flightTime" value={formData.flightTime} onChange={handleChange} />

        <label>Arrival/Departure</label>
        <select name="arrivalDeparture" value={formData.arrivalDeparture} onChange={handleChange}>
          <option value="Arrival">Arrival</option>
          <option value="Departure">Departure</option>
        </select>

        <label>Number of Passenger</label>
        <input type="number" name="numberOfPassenger" value={formData.numberOfPassenger} onChange={handleChange} />

        <label>Passenger Category</label>
        <select name="passengerCategory" value={formData.passengerCategory} onChange={handleChange}>
          <option value="">-- Select Category --</option>
          <option value="VIP">VIP</option>
          <option value="VVIP">VVIP</option>
          <option value="Diplomat">Diplomat</option>
          <option value="Corporate">Corporate</option>
          <option value="Regular">Regular</option>
        </select>

        <label>Corporate/Bank Name</label>
        <input type="text" name="corporateBankName" value={formData.corporateBankName} onChange={handleChange} />

        <label>Service Type</label>
        <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
          <option value="">-- Select Service --</option>
          <option value="Meet & Assist">Meet & Assist</option>
          <option value="Premium Service">Premium Service</option>
          <option value="VIP Lounge">VIP Lounge</option>
          <option value="Protocol Service">Protocol Service</option>
        </select>

        <label>Luggage (Pc)</label>
        <input type="number" name="luggage" value={formData.luggage} onChange={handleChange} />

        <label>Lounge</label>
        <select name="lounge" value={formData.lounge} onChange={handleChange}>
          <option value="">-- Select Lounge --</option>
          <option value="Airlines Lounge">Airlines Lounge</option>
          <option value="VIP Lounge">VIP Lounge</option>
          <option value="Executive Lounge">Executive Lounge</option>
        </select>

        <label>Transport</label>
        <select name="transport" value={formData.transport} onChange={handleChange}>
          <option value="">-- Transport Required? --</option>
          <option value="Required">Required</option>
          <option value="Not Required">Not Required</option>
        </select>

        <label>Hotel</label>
        <select name="hotel" value={formData.hotel} onChange={handleChange}>
          <option value="">-- Hotel Required? --</option>
          <option value="Required">Required</option>
          <option value="Not Required">Not Required</option>
        </select>

        <label>Payment</label>
        <select name="payment" value={formData.payment} onChange={handleChange}>
          <option value="">-- Select Payment Type --</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>

        <label>Other Requirement</label>
        <input type="text" name="otherRequirement" value={formData.otherRequirement} onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>

      <h2 className="bookings-title">Bookings</h2>

<div className="bookings-container">
  {bookings.length === 0 ? (

          <p>No bookings yet.</p>
        ) : (
          bookings.map((b, idx) => (
            <div key={idx} className="booking-card">
              <h3>Booking ID: {String(idx + 1).padStart(3, '0')}</h3>

              <p><strong>Name:</strong> {b.name}</p>
              <p><strong>Email:</strong> {b.email}</p>
              <p><strong>Contact Number:</strong> {b.contactNumber}</p>
              <p><strong>Flight Date:</strong> {b.flightDate}</p>
              <p><strong>Flight Number:</strong> {b.flightNumber}</p>
              <p><strong>Flight Time:</strong> {b.flightTime}</p>
              <p><strong>Arrival/Departure:</strong> {b.arrivalDeparture}</p>
              <p><strong>Number of Passenger:</strong> {b.numberOfPassenger}</p>
              <p><strong>Passenger Category:</strong> {b.passengerCategory}</p>
              <p><strong>Corporate / Bank Name:</strong> {b.corporateBankName}</p>
              <p><strong>Service Type:</strong> {b.serviceType}</p>
              <p><strong>Luggage:</strong> {b.luggage}</p>
              <p><strong>Lounge:</strong> {b.lounge}</p>
              <p><strong>Transport:</strong> {b.transport}</p>
              <p><strong>Hotel:</strong> {b.hotel}</p>
              <p><strong>Payment:</strong> {b.payment}</p>
              <p><strong>Other Requirement:</strong> {b.otherRequirement}</p>

              <hr />

     <div className="staff-wrapper">
  <div className="staff-section">
    {/* Staff-only fields */}
    <label>
      Bill Amount:
      <input
        type="text"
        value={b.billAmount || ""}
        onChange={e => updateBookingField(b.id, "billAmount", e.target.value)}
      />
    </label>

    <label>
      Service By:
      <input
        type="text"
        value={b.serviceBy || ""}
        onChange={e => updateBookingField(b.id, "serviceBy", e.target.value)}
      />
    </label>

    <label>
      Status:
      <select
        value={b.status || ""}
        onChange={e => updateBookingField(b.id, "status", e.target.value)}
      >
        <option value="">-- Select Status --</option>
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Completed">Completed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
    </label>

    <label>
      Action:
      <select
        value={b.action || ""}
        onChange={e => updateBookingField(b.id, "action", e.target.value)}
      >
        <option value="">-- Select Action --</option>
        <option value="Notify Client">Notify Client</option>
        <option value="Assign Staff">Assign Staff</option>
        <option value="Prepare Invoice">Prepare Invoice</option>
      </select>
    </label>
  </div>

  {/* Move cancel button here */}
  <button
    className="cancel-button"
    onClick={() => cancelBooking(b.id)}
  >
    Cancel Booking
  </button>
</div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
