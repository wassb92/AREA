import React, { useState, useEffect } from "react";
import { Button } from "components/custom/Button";
import axios from "axios";

const APKDownloader = ({ file }) => {
  const [fileExists, setFileExists] = useState(false);

  const checkFileExists = async () => {
    try {
      const res = await axios.get(file);
      setFileExists(true);
    } catch (err) {
      setFileExists(false);
    }
  };

  useEffect(() => {
    checkFileExists();
    if (fileExists) {
      window.location.href = file;
    }
  }, []);

  if (!fileExists) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-black">
          File "{file}" has not been downloaded yet
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-2">
      <h1 className="text-3xl font-bold">Télécharger la version mobile</h1>
      <p className="text-center mb-10">
        Si le téléchargement ne démarre pas, cliquez ici :
      </p>
      <Button
        className="bg-main text-white rounded-md hover:bg-soft hover:drop-shadow-md duration-200 ease-in p-2"
        onClick={() => {
          window.location.href = file;
        }}
      >
        Télécharger
      </Button>
    </div>
  );
};

export default APKDownloader;
