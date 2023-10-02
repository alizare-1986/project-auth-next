import { useEffect, useState } from "react";
import { verifyToken } from "../utils/auth";
import { useRouter } from "next/router";

function Dashboard({ result }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [dataD, setDataD] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router =useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/show-profile");
      const data = await res.json();
      setDataD(data.data);
      if(data.data.name) setIsLoggedIn(true)
    };

    fetchData();
  }, []);
  const submitHandler = async () => {
    const res = await fetch("/api/update-info", {
      method: "POST",
      body: JSON.stringify({ name, lastName, phone, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if(data.status==="success") router.reload()
  };
  const signOutHandler = async () => {
    const res = await fetch("/api/auth/signout");
    const data = await res.json();
   if(data.status==="success") router.push("/")
  };
 
  return (
    <div style={{ display: "grid", justifyContent: "center",padding:"100px" }}>
      {isLoggedIn ? (
        <div style={{border:"1px solid silver",display:"grid",justifyContent:"center",width:500,height:500,alignItems:"center",borderRadius:"50px"}}>
          <h2>Email : {dataD.email}</h2>
          <h3> name : {dataD.name}</h3>
          <h3>LastName : {dataD.lastName}</h3>
          <p>Phone : {dataD.phone}</p>
          <button onClick={signOutHandler}>Log Out</button>
        </div>
      ) : (
        <>
        <div style={{ display: "grid", justifyContent: "center",padding:"10px" }}>
          <h1>My Profile</h1>
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
          <button onClick={signOutHandler}>Log Out</button>
          </div>
        </>
      )}
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
    props: { result },
  };
}
