import { useEffect } from "react";
import { useRouter } from "next/router";

const userRoutes = ["/dashboard", "/query", "/payment"];
const adminRoutes = [
  "/admin/admindashboard/dashboard",
  "/admin/adminquery/query",
  "/admin/adminuser/user",
  "/admin/adminpayment/payment",
];

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const userToken = localStorage.getItem("auth-token");
    const adminToken = localStorage.getItem("adminToken");
    const currentPath = router.pathname;

    // Case 1: Not authenticated
    if (!userToken && !adminToken) {
      router.push("/");
      return;
    }

    // Case 2: Authenticated user navigating to unauthorized routes
    if (userToken && !userRoutes.includes(currentPath)) {
      if (currentPath.startsWith("/admin")) {
        // User trying to access admin route
        localStorage.removeItem("auth-token");
        router.push("/");
      } else {
        router.push("/404"); // Redirect to default 404 page
      }
      return;
    }

    // Case 3: Authenticated admin navigating to unauthorized routes
    if (adminToken && !adminRoutes.includes(currentPath)) {
      if (!currentPath.startsWith("/admin")) {
        // Admin trying to access user route
        localStorage.removeItem("adminToken");
        router.push("/");
      } else {
        router.push("/404"); // Redirect to default 404 page
      }
      return;
    }

    // Case 4: If the current path doesn't match any predefined routes
    if (!userRoutes.includes(currentPath) && !adminRoutes.includes(currentPath)) {
      router.push("/404"); // Redirect to default 404 page
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
