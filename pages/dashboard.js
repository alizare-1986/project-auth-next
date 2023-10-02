import { useEffect, useState } from "react";
import { verifyToken } from "../utils/auth";

function Dashboard({ result }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  
  const submitHandler = async () => {
    const res = await fetch("/api/update-info", {
      method: "POST",
      body: JSON.stringify({ name, lastName, phone, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data=await res.json()
    console.log(data);
  };
  return (
    <div style={{ display: "grid", justifyContent: "center" }}>
      <h1>you Profile</h1>
      <h2> Email :{result.email}</h2>
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={lastName}
        placeholder="LastName"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="text"
        value={phone}
        placeholder="Phone"
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submitHandler}>Submit</button>
     
    </div>
  );
}

export default Dashboard;
export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;
  const result = verifyToken(token, secretKey);
  if (!result)
    return {
      redirect: { destination: "/signin", permanent: false },
    };
    
    
  return {
    props: { result }
  };
}
