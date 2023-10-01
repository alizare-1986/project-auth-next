import { useRouter } from "next/router"
import { useState } from "react"

function SignIn() {
    const router = useRouter()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const signInHandler=async()=>{
        const res =await fetch("/api/auth/signin",{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{"Content-Type":"application/json"}
        })
        const data =await res.json()
     if(data.status==="success")router.push("/dashboard")

    }
    
    return (
        <div>
            <h3>Login from</h3>
            <input placeholder="email" type="text"  value={email} onChange={e=>setEmail(e.target.value)} />
            <input placeholder="password" type="text"  value={password} onChange={e=>setPassword(e.target.value)} />
            <button onClick={signInHandler}>LogIn</button>
        </div>
    );
}


export default SignIn;