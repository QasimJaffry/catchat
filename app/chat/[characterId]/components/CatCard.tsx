import React from "react";
import Link from "next/link";

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
      // href={`/chat/${id}`}
      onClick={() => setSelectedCat(item)}
      className="group flex flex-col h-full"
    >
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 flex-grow">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover object-center transition-transform transform group-hover:scale-105 group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{name}</h3>
      <p className="mt-1 text-sm text-gray-500">{personality}</p>
    </div>
  );
};

export default CatCard;
