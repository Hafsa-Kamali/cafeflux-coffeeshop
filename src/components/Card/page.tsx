import Image from 'next/image';
import React from 'react';

type CardData = {
  title: string;
  imageSrc: string;
  altText: string;
};

type CardProps = {
  data: CardData;
  className?: string;
};

const Card: React.FC<CardProps> = ({ data, className }) => {
  return (
    <div className={className}>
      <div className="group relative h-full w-full overflow-hidden rounded-lg bg-[#967259] shadow-lg shadow-[#38220f]">
        <div className="absolute top-0 left-0 z-20 w-full p-4 bg-gradient-to-b from-[#38220f]/60 to-transparent">
          <h2 className="text-2xl font-medium text-white">{data.title}</h2>
        </div>
        
        <div className="absolute inset-0 h-full w-full">
          <Image 
            src={data.imageSrc}
            alt={data.altText}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#967259]/25 to-[#38220f]/40 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" />
        
        <a href="#" className="absolute inset-0">
          <span className="sr-only">View {data.title} details</span>
        </a>
      </div>
    </div>
  );
};

export default Card;