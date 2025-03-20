import { useRouter } from "next/router";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import Alert from "../Alert/Alert";

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
          <span className="text-3xl font-bold font-lora">
            HomeFindr.
            {user && <span className="text-primary text-2xl">{user.role}</span>}
          </span>
        </div>

        <div className="flex space-x-4">
          {showButtons && (
            <>
              {(!user || user.role === "customer") && (
                <Button
                  variant="outline"
                  size={"lg"}
                  onClick={() => router.push("/search")}
                >
                  Search
                </Button>
              )}
              {(!user || user.role === "owner") && (
                <Button
                  variant="default"
                  size={"lg"}
                  onClick={() => router.push("/owner")}
                >
                  Sell
                </Button>
              )}
            </>
          )}
          {user && (
            <>
              {(user.role === "admin" || user.role === "customer") && (
                <Button
                  variant="outline"
                  size={"lg"}
                  onClick={() =>
                    router.push(
                      user.role === "admin"
                        ? "/dashboard"
                        : "/dashboard/customer",
                    )
                  }
                >
                  Dashboard
                </Button>
              )}
              <Alert
                label="Logout"
                modalTitle="Are Sure you want to logout"
                onConfirm={() => logout()}
                className="w-[120px] h-10 bg-black text-white rounded-md"
                modalDescription={""}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
