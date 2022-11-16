import React, { useState, useEffect, useContext } from "react";
import ActionCard from "components/custom/ActionCard";
import axios from "axios";
import Accordion from "components/custom/Accordion";
import { useNavigate } from "react-router-dom";
import { UserContext } from "UserContext";

const ListActions = () => {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const getActions = async () => {
      try {
        const res = await axios.get(`${global.API_ENDPOINT}/api/area/actions`);
        setActions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getActions();
  }, []);

  const Gmail = actions.filter((action) => action.service === "Gmail");
  const GoogleAgenda = actions.filter(
    (action) => action.service === "Google Agenda"
  );
  const GoogleDrive = actions.filter(
    (action) => action.service === "Google Drive"
  );
  const GoogleContacts = actions.filter(
    (action) => action.service === "Google Contacts"
  );
  const GoogleDocs = actions.filter(
    (action) => action.service === "Google Docs"
  );
  const GoogleTasks = actions.filter(
    (action) => action.service === "Google Tasks"
  );
  const OpenWeatherMap = actions.filter(
    (action) => action.service === "OpenWeatherMap"
  );
  const Discord = actions.filter((action) => action.service === "Discord");
  const Facebook = actions.filter((action) => action.service === "Facebook");
  const Else = actions.filter((action) => action.service === "Else");

  return (
    <div className="w-full space-y-4">
      {actions.length !==
        Gmail.length +
          GoogleAgenda.length +
          GoogleDrive.length +
          GoogleContacts.length +
          GoogleDocs.length +
          GoogleTasks.length +
          OpenWeatherMap.length +
          Discord.length +
          Facebook.length +
          Else.length && (
        <div className="text-3xl text-center text-red-600">
          Un service n'est pas reconnu
        </div>
      )}

      {Gmail.length > 0 && (
        <Accordion header="Gmail">
          {Gmail.map((action, index) => (
            <div key={`action_${index}`}>
              <ActionCard
                name={action.name}
                description={action.description}
                img={action.img}
                to={action.to}
              />
            </div>
          ))}
        </Accordion>
      )}
      {GoogleAgenda.length > 0 && (
        <Accordion header="Google Agenda">
          {GoogleAgenda.map((action, index) => (
            <div key={`action_${index}`}>
              <ActionCard
                name={action.name}
                description={action.description}
                img={action.img}
                to={action.to}
              />
            </div>
          ))}
        </Accordion>
      )}
      {GoogleDrive.length > 0 && (
        <Accordion header="Google Drive">
          {GoogleDrive.map((action, index) => (
            <div key={`action_${index}`}>
              <ActionCard
                name={action.name}
                description={action.description}
                img={action.img}
                to={action.to}
              />
            </div>
          ))}
        </Accordion>
      )}
      {GoogleContacts.length > 0 && (
        <Accordion header="Google Contacts">
          {GoogleContacts.map((action, index) => (
            <div key={`action_${index}`}>
              <ActionCard
                name={action.name}
                description={action.description}
                img={action.img}
                to={action.to}
              />
            </div>
          ))}
        </Accordion>
      )}
      {GoogleDocs.length > 0 && (
        <Accordion header="Google Docs">
          {GoogleDocs.map((action, index) => (
            <div key={`action_${index}`}>
              <ActionCard
                name={action.name}
                description={action.description}
                img={action.img}
                to={action.to}
              />
            </div>
          ))}
        </Accordion>
      )}
      {GoogleTasks.length > 0 && (
        <Accordion header="Google Tasks">
          {GoogleTasks.map((action, index) => (
            <div key={`action_${index}`}>
              <ActionCard
                name={action.name}
                description={action.description}
                img={action.img}
                to={action.to}
              />
            </div>
          ))}
        </Accordion>
      )}
      {Discord.length > 0 && (
        <Accordion header="Discord">
          {Discord.map((action, index) => (
            <div key={`action_${index}`}>
              <ActionCard
                name={action.name}
                description={action.description}
                img={action.img}
                to={action.to}
              />
            </div>
          ))}
        </Accordion>
      )}
      {Facebook.length > 0 && (
        <Accordion header="Facebook">
          {Facebook.map((action, index) => (
            <div key={`action_${index}`}>
              <ActionCard
                name={action.name}
                description={action.description}
                img={action.img}
                to={action.to}
              />
            </div>
          ))}
        </Accordion>
      )}
      {OpenWeatherMap.length > 0 && (
        <Accordion header="OpenWeatherMap">
          {OpenWeatherMap.map((action, index) => (
            <div key={`action_${index}`}>
              <ActionCard
                name={action.name}
                description={action.description}
                img={action.img}
                to={action.to}
              />
            </div>
          ))}
        </Accordion>
      )}
      {Else.length > 0 && (
        <Accordion header="Autre">
          {Else.map((action, index) => (
            <div key={`action_${index}`}>
              <ActionCard
                name={action.name}
                description={action.description}
                img={action.img}
                to={action.to}
              />
            </div>
          ))}
        </Accordion>
      )}
    </div>
  );
};

const Services = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (code && user.email) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const login = async () => {
        try {
          const res = await axios.post(
            `${global.API_ENDPOINT}/api/twitter/login`,
            {
              code,
              email: user.email,
            },
            config
          );
          navigate("/app/services");
        } catch (err) {
          console.log("err = ", err.response.data);
        }
      };
      login();
    }
  }, [code, navigate, user.email]);

  return (
    <div className="reveal">
      <div className="text-center px-8 py-16 mb-8">
        <h2 className="text-5xl">Choississez une action</h2>
      </div>
      <div className="flex flex-wrap gap-4 mx-4">
        <ListActions />
      </div>
    </div>
  );
};

export default Services;
