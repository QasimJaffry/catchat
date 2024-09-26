import React from "react";
import { FaChevronRight } from "react-icons/fa";

interface CatCardProps {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  scenario: string;
  personality: string;
  item: any;
  setSelectedCat: any;
}

const CatCard: React.FC<CatCardProps> = ({
  id,
  name,
  imageSrc,
  imageAlt,
  scenario,
  personality,
  item,
  setSelectedCat,
}) => {
  return (
    <div className="relative w-full h-80 sm:h-96 perspective">
      <div className="relative w-full h-full transition-transform duration-300 transform hover:rotate-y-180">
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden rounded-lg shadow-lg overflow-hidden bg-white border border-gray-200">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-2/3 w-full object-cover"
          />
          <div className="p-4 flex-grow">
            <h3 className="text-lg font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-600">{personality}</p>
            <p className="text-xs text-gray-400 mt-1">{scenario}</p>
          </div>
          <div className="p-4">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300">
              Chat Now
            </button>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-500 to-pink-500 text-white flex flex-col items-center justify-center rounded-lg shadow-lg transform rotate-y-180">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm">{personality}</p>
          <p className="text-xs mt-2">{scenario}</p>
          <button
            onClick={() => setSelectedCat(item)}
            className="mt-4 bg-white text-purple-500 hover:bg-gray-200 font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatCard;