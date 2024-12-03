import ClientNavbar from "@/components/navBar/ClientNavbar";
// import AdminDashboard from "@/pages/admin/adminDashboard/adminDashboard";
import ClientDashboard from "@/pages/user/userdashboard/clientDashboard";
// import Image from "next/image";
 
export default function Home() {
  return (
    <div>
      <ClientNavbar />
      <ClientDashboard />
    </div>
  );
}
