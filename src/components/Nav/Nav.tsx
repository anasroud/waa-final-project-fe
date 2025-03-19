import { useRouter } from "next/router";
import { Button } from "../ui/button";

export interface INavProps {
  showButtons?: boolean;
}

const Nav = ({ showButtons = true }) => {
  const router = useRouter();

  return (
    <nav className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-4 bg-white shadow-sm">
      <div className="max-w-7xl w-full flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <span className="text-3xl font-bold font-lora">HomeFindr.</span>
        </div>
        {showButtons && (
          <div className="flex space-x-4">
            <Button variant="outline" size={"lg"}>
              Buy
            </Button>
            <Button
              variant="default"
              size={"lg"}
              onClick={() => router.push("/owner")}
            >
              Sell
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
