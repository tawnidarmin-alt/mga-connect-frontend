import React, { useEffect, useState } from "react";
import axios from "axios";

function Summary() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/bookings")
      .then(res => setBookings(res.data))
      .catch(err => console.error("Error fetching summary:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Booking Summary</h2>
      {bookings.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}>
            <thead>
              <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Flight No</th>
                <th>Flight Date</th>
                <th>Service Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, idx) => (
                <tr key={idx}>
                  <td>{b.id}</td>
                  <td>{b.name}</td>
                  <td>{b.contactNumber}</td>
                  <td>{b.email}</td>
                  <td>{b.flightNumber}</td>
                  <td>{b.flightDate}</td>
                  <td>{b.serviceType}</td>
                  <td>{b.status || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Summary;
