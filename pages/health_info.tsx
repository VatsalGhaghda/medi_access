import { useState } from "react";
// import { PrismaClient } from "@prisma/client";
import { NextPage } from "next";

// Initialize Prisma Client
// const prisma = new PrismaClient();

const HealthInfoForm: NextPage = () => {
  const [formData, setFormData] = useState({
    medicalConditions: "",
    allergies: "",
    pastSurgeries: "",
    primaryDoctorName: "",
    primaryDoctorContact: "",
    insurancePolicyNumber: "",
    preferredHospital: "",
  });

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit the form data to the server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Assuming PersonalInfoId is passed and is valid
      const personalInfoId = 1; // Replace with actual PersonalInfoId from context or URL

      const response = await fetch("/api/save_health_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, personalInfoId }),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error saving health info:", error);
    }
  };

  return (
    <div>
      <h1>Health Info Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Medical Conditions</label>
          <input
            type="text"
            name="medicalConditions"
            value={formData.medicalConditions}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Allergies</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Past Surgeries</label>
          <input
            type="text"
            name="pastSurgeries"
            value={formData.pastSurgeries}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Primary Doctor Name</label>
          <input
            type="text"
            name="primaryDoctorName"
            value={formData.primaryDoctorName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Primary Doctor Contact</label>
          <input
            type="text"
            name="primaryDoctorContact"
            value={formData.primaryDoctorContact}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Insurance Policy Number</label>
          <input
            type="text"
            name="insurancePolicyNumber"
            value={formData.insurancePolicyNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Preferred Hospital</label>
          <input
            type="text"
            name="preferredHospital"
            value={formData.preferredHospital}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HealthInfoForm;
