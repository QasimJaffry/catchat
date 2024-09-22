import React from "react";
import { FaChevronRight } from "react-icons/fa"; // Ensure you have react-icons installed

interface CatCardProps {
  id: number;
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
    <div
      onClick={() => setSelectedCat(item)}
      className="flex flex-col w-full h-80 sm:h-96 cursor-pointer transition-transform duration-300 transform hover:scale-105 shadow-lg rounded-lg overflow-hidden relative bg-white"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 flex-grow">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover object-center transition-transform transform group-hover:scale-105 group-hover:opacity-75"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-sm text-gray-300">{personality}</p>
          <div className="flex items-center text-xs text-gray-400 mt-1">
            <p className="flex-grow">{scenario}</p>
            <FaChevronRight className="text-white-500 ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatCard;
