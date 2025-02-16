"use client";
import React, { useState, useEffect } from "react";

interface InquiryFormProps {
  productName?: string | string[]; // Handle possible array type
  onClose: () => void; // Function to close modal
}

const InquiryForm: React.FC<InquiryFormProps> = ({ productName, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    product: "",
  });

  // Ensure product is always a string
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      product: Array.isArray(productName) ? productName[0] : productName || "",
    }));
  }, [productName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const response = await fetch("/api/send-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Your inquiry has been sent!");
        onClose();
      } else {
        console.error("Error sending inquiry:", result);
        alert("Error sending inquiry. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <div className="inquiry-modal">
      <div className="modal-content">
        <h2>Request a Quote</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Company:</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} />

          <label>Product:</label>
          <input type="text" name="product" value={formData.product} readOnly />

          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required />

          <button type="submit">Send Inquiry</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;
