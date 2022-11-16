import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "components/custom/Button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "UserContext";

const formatcreatedAt = ({ date }) => {
  const dateSplitted = date.split("T");
  const dateSplitted2 = dateSplitted[0].split("-");
  const dateSplitted3 = dateSplitted[1].split(":");
  const dateSplitted4 = dateSplitted3[2].split(".");
  const dateSplitted5 = dateSplitted4[0].split(".");
  const dateSplitted6 = dateSplitted5[0].split(".");

  const day = parseInt(dateSplitted2[2]);
  const month = parseInt(dateSplitted2[1]);
  const year = parseInt(dateSplitted2[0]);
  const hour = parseInt(dateSplitted3[0]);
  const min = parseInt(dateSplitted3[1]);
  const sec = parseInt(dateSplitted6[0]);

  return `${day}/${month}/${year} à ${hour + 1}:${min}:${sec}`;
};

const AREACard = ({ area }) => {
  const handleDelete = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      const res = await axios.delete(
        `${global.API_ENDPOINT}/api/area/${area._id}`,
        config
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };

  return (
    <div className="flex flex-row justify-between items-center bg-white rounded p-4 shadow">
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">Action</p>
        <p className="text-gray-900 text-lg">{area.action}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">Réaction</p>
        <p className="text-gray-900 text-lg">{area.reaction}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-500 text-sm">Créé le</p>
        <p className="text-gray-900 text-lg">
          {formatcreatedAt({ date: area.createdAt })}
        </p>
      </div>

      <div className="flex flex-col">
        <Button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Supprimer l'AREA
        </Button>
      </div>
    </div>
  );
};

const ListMyAREAs = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (user.areas.length === 0)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-2xl font-bold text-gray-500 mb-6">
          Vous n'avez pas encore d'AREAs
        </h1>
        <Button onClick={() => navigate("/app/services")}>
          Créer une AREA
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-500">Mes AREAs</h1>
        <button
          onClick={() => navigate("/app/services")}
          className="bg-primary text-white font-bold py-2 px-4 rounded"
        >
          Créer un AREAs
        </button>
      </div>
      <div className="flex flex-col gap-y-4 mt-4 mr-8">
        {user.areas.map((area, index) => (
          <AREACard area={area} key={`user_area_${index}`} />
        ))}
      </div>
    </div>
  );
};

const MyAREAs = () => {
  return (
    <div className="reveal">
      <div className="text-center px-8 py-16 mb-8">
        <h2 className="text-5xl">Voici vos AREAs</h2>
      </div>
      <div className="flex flex-wrap gap-4 ml-8">
        <ListMyAREAs />
      </div>
    </div>
  );
};

export default MyAREAs;
