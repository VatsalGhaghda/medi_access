// pages/userinfo.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QRCode from "react-qr-code";

interface User {
    firstName: string;
    middleName: string;
    lastName: string;
    dob: string;
    gender: string;
    bloodGroup: string;
    address: string;
    email: string;
    phoneNumber: string;
    emergencyNumber: string;
  }
  
  
  

export default function UserInfo() {
    const [user, setUser] = useState<User | null>(null);  // Use the 'User' type
//   const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { email } = router.query;

  useEffect(() => {
    if (!email) return;

    async function fetchUserData() {
      try {
        const res = await fetch(`/api/user?email=${email}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [email]);

  if (loading) return <p>Loading user data...</p>;

  const userLink = user ? `${window.location.origin}/userinfo?email=${user.email}` : "";

  return (
    <div>
      <h1>User Information</h1>
      {user ? (
        <div>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Middle Name:</strong> {user.middleName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Date of Birth:</strong> {user.dob ? user.dob.split("T")[0] : "N/A"}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
          <p><strong>Emergency Contact:</strong> {user.emergencyNumber}</p>

          {/* Display the QR Code with a valid URL */}
          <div style={{ marginTop: "20px" }}>
            <h2>Scan the QR Code to view details</h2>
            <QRCode value={userLink} size={256} />
          </div>

          {/* Link to view the user details */}
          <div style={{ marginTop: "20px" }}>
            <h3>Or click the link to view the details:</h3>
            <a href={userLink} target="_blank" rel="noopener noreferrer">
              View User Details
            </a>
          </div>
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
}
