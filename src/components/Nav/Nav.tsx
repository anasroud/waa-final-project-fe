import { Button } from "../ui/button";

const Nav = () => {
    return (
        <nav className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-4 bg-white shadow-sm">
            <div className="max-w-4xl w-full flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold font-lora">HomeFindr.</span>
                </div>
                <div className="flex space-x-4">
                    <Button variant="outline" size={"lg"}>
                        Buy
                    </Button>
                    <Button variant="default" size={"lg"}>
                        Sell
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Nav;