import { useRouter } from "next/router";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

export interface INavProps {
  showButtons?: boolean;
}

const Nav = ({ showButtons = true }) => {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <nav className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-4 bg-white shadow-sm">
      <div className="max-w-7xl w-full flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span className="text-3xl font-bold font-lora">HomeFindr.</span>
        </div>
        <div className="flex space-x-4">
          {showButtons && (
            <>
              <Button
                variant="outline"
                size={"lg"}
                onClick={() => router.push("/search")}
              >
                Buy
              </Button>
              <Button
                variant="default"
                size={"lg"}
                onClick={() => router.push("/owner")}
              >
                Sell
              </Button>
            </>
          )}
          {user && (
            <>
              {user.role === "admin" && (
                <Button
                  variant="outline"
                  size={"lg"}
                  onClick={() => router.push("/dashboard")}
                >
                  Dashboard
                </Button>
              )}
              <Button variant="default" size={"lg"} onClick={() => logout()}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
