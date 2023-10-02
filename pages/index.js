import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if(data.status === "success") setIsLoggedIn(true);
      });
  }, []);
  const signOutHandler = async () => {
    const res = await fetch("/api/auth/signout");
    const data = await res.json();
    if(data.status==="success") setIsLoggedIn(false)
  };
  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <>
          <button>
            <Link href={"/dashboard"}>Dashboard</Link>
          </button>
          <br></br>
          <button onClick={signOutHandler}>Log Out</button>
        </>
      ) : null}

      {!isLoggedIn ? (
        <>
          <br></br>
          <button>
            <Link href={"/signup"}>Sign Up</Link>
          </button>
          <br></br>
          <button>
            <Link href={"/signin"}>Sign In</Link>
          </button>
        </>
      ) : null}
    </div>
  );
}
