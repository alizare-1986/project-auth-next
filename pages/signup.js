import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function SignUp() {
    const router = useRouter()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    useEffect(()=>{
        fetch("/api/user").then(res=>res.json()).then((data)=>{
            if(data.status==="success")window.location.href ="/" //or router.replace("/dashboard")
        })
        },[])
    const signUpHandler=async()=>{
        const res =await fetch("/api/auth/signup",{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{"Content-Type":"application/json"}
        })
        const data =await res.json()
     if(data.status==="success")router.push("/")

    }
    
    return (
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
            <div style={{display:"grid",width:500,height:300,}}>
            <h3 style={{display:"flex",justifyContent:"center"}}>Registration from</h3>
            <input placeholder="email" type="text"  value={email} onChange={e=>setEmail(e.target.value)} />
            <input placeholder="password" type="text"  value={password} onChange={e=>setPassword(e.target.value)} />
            <button onClick={signUpHandler}>Sign Up</button>
        </div></div>
    );
}

export default SignUp;