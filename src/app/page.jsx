import NavBar from "@/components/navBar/Navbar";
// import AdminDashboard from "@/pages/admin/adminDashboard/adminDashboard";
import ClientDashboard from "@/pages/user/userDashboard/clientDashboard";
// import Image from "next/image";
 
export default function Home() {
  return (
    <div>
      <NavBar />
      <ClientDashboard />
    </div>
  );
}
