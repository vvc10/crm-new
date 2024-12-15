import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Image src="/404-illustration.svg" alt="404 Error" width={300} height={300} />
      <h1 style={{ fontSize: "2rem", marginTop: "20px" }}>404 - Page Not Found</h1>
      <p style={{ fontSize: "1.2rem", color: "#666" }}>
        Sorry, we couldn't find the page you were looking for.
      </p>
      <Link href="/" passHref>
        <button style={{ padding: "10px 20px", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Return to Home
        </button>
      </Link>
    </div>
  );
};

export default Custom404;
