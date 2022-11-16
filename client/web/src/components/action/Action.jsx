import React, { useState, useEffect } from "react";
import axios from "axios";
import ActionForm from "components/action/ActionForm";

const Action = ({ action_name }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getJSON = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const res = await axios.get(
          `${global.API_ENDPOINT}/api/area/actions/${action_name}`,
          config
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getJSON();
  }, []);

  if (!data) return <div>Loading...</div>;

  return <ActionForm formJSON={data} />;
};

export default Action;
