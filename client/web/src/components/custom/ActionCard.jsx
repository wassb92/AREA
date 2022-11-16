import React from "react";
import { useNavigate } from "react-router-dom";

const ActionCard = ({ name, description, img, to = null, needAuth = true }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          className="gap-y-2 p-4 border border-gray-200 w-96 h-40 hover:border-black rounded-md"
          onClick={() => navigate(to)}
        >
          <div className="flex items-center gap-x-2">
            <img src={img} className="w-10 h-10" />
            <h1 className="text-xl font-semibold mr-2">{name}</h1>
          </div>
          <p className="text-gray-500 mt-4">{description}</p>
        </button>
      </div>
    </div>
  );
};

export default ActionCard;
