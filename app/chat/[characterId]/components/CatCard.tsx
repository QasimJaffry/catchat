import React from "react";
import { FaChevronRight } from "react-icons/fa";
import Image from "next/image";

interface CatCardProps {
  name: string;
  imageSrc: string;
  imageAlt: string;
  scenario: string;
  personality: string;
  item: any;
  setSelectedCat: any;
}

const CatCard: React.FC<CatCardProps> = ({
  name,
  imageSrc,
  imageAlt,
  scenario,
  personality,
  item,
  setSelectedCat,
}) => {
  return (
    <div className="justify-center" key={item?.id}>
      <div
        onClick={() => setSelectedCat(item)}
        className="flex flex-col w-72 h-72 cursor-pointer transition-transform duration-300 transform hover:scale-105 shadow-lg rounded-lg overflow-hidden relative"
      >
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-5 xl:aspect-h-5 flex-grow">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={100}
            height={100}
            className="h-full w-full object-cover object-center transition-transform transform group-hover:scale-105 group-hover:opacity-75"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
            <h3 className="text-lg font-bold text-white flex-wrap overflow-hidden text-ellipsis whitespace-nowrap">
              {name}
            </h3>
            <p className="text-sm text-gray-300 flex-wrap overflow-hidden text-ellipsis whitespace-nowrap">
              {personality}
            </p>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <p className="flex-wrap overflow-hidden text-ellipsis whitespace-nowrap">
                {scenario}
              </p>
              <FaChevronRight className="text-white-500 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatCard;
