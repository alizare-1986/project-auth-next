
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return <div className={styles.container}>
     <button ><Link href={"/dashboard"}>Dashboard</Link></button>
     <br></br>
   <button ><Link href={"/signup"}>Sign Up</Link></button>
   <br></br>
   <button ><Link href={"/signin"}>Sign In</Link></button>
  </div>;
}
