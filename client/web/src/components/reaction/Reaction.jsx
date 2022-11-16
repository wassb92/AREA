import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactionForm from "components/reaction/ReactionForm";

const Reaction = ({ reaction_name, props }) => {
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
          `${global.API_ENDPOINT}/api/area/reactions/${reaction_name}`,
          config
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getJSON();
  }, [reaction_name]);

  if (!data) return <div>Loading...</div>;

  return <ReactionForm formJSON={data} action={props.action} />;
};

export default Reaction;
