import React from "react";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";

export function ThreeDCardDemo({
  imageUrl,
  title,
  description,
  assigned,
  link,
}) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 h-auto relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[18rem] md:w-[20rem] lg:w-[22rem]  rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={imageUrl}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={title}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href={link}
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 transform ${
              assigned
                ? "bg-white text-gray-500  hover:text-black hover:scale-105 hover:shadow-lg"
                : "bg-black text-white hover:bg-white hover:text-black hover:scale-105 hover:shadow-lg"
            }`}
          >
            {assigned ? "Assigned" : "Assign"}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
