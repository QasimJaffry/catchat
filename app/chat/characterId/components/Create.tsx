import React, { useState } from "react";
import correct from "../../../assets/icons/correct.svg";
import { personsData } from "./ChatList";

const categorySteps = ["Individual", "Group"];
const CreateChat = () => {
  const [, setCurrentStep] = useState(0);
  const [persons, setPersons] = useState(personsData);

  const handleProfileClick = (clickedIndex: number) => {
    setPersons((prevPersons: any) =>
      prevPersons.map((obj: any, index: number) =>
        index === clickedIndex ? { ...obj, selected: !obj.selected } : obj
      )
    );
  };

  return (
    <div>
      <div className="flex gap-10 mt-3">
        {categorySteps.map((step, i) => (
          <div className="flex items-center" key={i}>
            <input
              id={step}
              defaultChecked={i === 0}
              type="radio"
              defaultValue="Step 01"
              onChange={(e) => setCurrentStep(i)}
              value={step}
              name="step"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor={step}
              className="ml-3 text-darkBlue text-base font-semibold cursor-pointer"
            >
              {step}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-6">
        {persons.map(({ name, src, icon, selected }: any, i: number) => (
          <div
            className="flex items-center gap-4 mt-3 pb-3 border-b border-b-dark border-opacity-10"
            key={i}
          >
            <div className="relative" onClick={() => handleProfileClick(i)}>
              <img
                src={src}
                className="object-cover h-12 w-12 rounded-full "
                alt=""
              />
              {selected && (
                <div className="overlay absolute inset-0 flex items-center justify-center ">
                  <div className="bg-[#005856] opacity-60 h-full w-full absolute rounded-full"></div>
                  <img
                    src={correct}
                    alt="correct"
                    className="z-10 cursor-pointer"
                  />
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold">{name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateChat;
