import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MyAccordion = ({ header, children }) => {
  const images = {
    Gmail: "https://cdn-icons-png.flaticon.com/512/281/281769.png",
    "Google Agenda":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/1024px-Google_Calendar_icon_%282020%29.svg.png",
    OpenWeatherMap:
      "https://openweathermap.org/themes/openweathermap/assets/img/mobile_app/android-app-top-banner.png",
    "Google Drive":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Qw4izG59ENBQITZpnFJBmbw42HLF3iH2l6q1IEFl44Bw87tJessAoiv9mabXllOZOMs&usqp=CAU",
    "Google Contacts":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/1200px-Google_Contacts_icon.svg.png",
    "Google Docs":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Google_Docs_logo_%282014-2020%29.svg/1481px-Google_Docs_logo_%282014-2020%29.svg.png",
    "Google Tasks":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Google_Tasks_2021.svg/1200px-Google_Tasks_2021.svg.png",
    SendGrid:
      "https://assets.website-files.com/5ff319852fb4b1c3fc23719b/60461b74bbe19827a199cc4f_60084e45b6186e1f350eb273_Logo%2520Sendgrid.png",
    Twilio:
      "https://toppng.com/uploads/preview/twilio-logo-11609380242jwkoktksba.png",
    WhatsApp:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png",
    Discord: "https://cdn-icons-png.flaticon.com/512/4945/4945973.png",
    Twitter:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW3LvfWjjZJyF-j-QtUrBLfbYvb46K9n6tIHYsmusn&s",
    Facebook:
      "https://www.unipile.com/wp-content/uploads/2022/06/logo-facebook.png",
    Microsoft: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    Autre: "https://miro.medium.com/max/512/1*Js0Y20MwjcTnVAe7KjDXNg.png",
  };
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="flex justify-center items-center gap-4">
            {images[header] && (
              <img
                src={images[header]}
                alt={`${header} logo`}
                className="w-10 h-10"
              />
            )}
            <div className="text-2xl font-medium">{header}</div>
          </div>
        </AccordionSummary>
        <AccordionDetails className="w-full flex flex-wrap gap-4">
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MyAccordion;
