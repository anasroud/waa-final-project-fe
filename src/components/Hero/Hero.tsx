

import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="h-[60vh] w-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/hero-bg.jpg")',
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-lora text-white text-center mb-4">
          Find Your Dream Home
        </h1>
        <p className="text-xl text-white text-center mb-8">
          Search properties by city or zipcode
        </p>

        <div className="w-full max-w-2xl relative bg-white overflow-hidden rounded-full">
          <input
            type="text"
            placeholder="Enter city or zipcode..."
            className="w-full px-6 py-4 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-transparent pl-12"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default Hero;