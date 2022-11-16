import React from "react";

// Routing
import { Routes, Route } from "react-router-dom";

// Layout
import SideBar from "./components/SideBar.jsx";

// Screens
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import NotFound from "./components/screens/NotFound";
import ForgotPassword from "./components/screens/ForgotPassword";
import ResetPassword from "./components/screens/ResetPassword";
import ConfirmRegister from "./components/screens/ConfirmRegister";
import ProtectedRoutes from "ProtectedRoutes";

// Private screens
import Dashboard from "./components/screens/private/Dashboard";
import Services from "./components/screens/private/Services";
import MyAREAs from "./components/screens/private/MyAREAs";
import Profile from "./components/screens/private/Profile";
// Actions
import Action from "./components/action/Action";

// APK Downloader
import APKDownloader from "./APKDownloader";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/client.apk"
        element={<APKDownloader file="apk/client.apk" />}
      />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="app/*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/services" element={<Services />} />
                <Route path="/my_areas" element={<MyAREAs />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="action/*"
                  element={
                    <Routes>
                      <Route
                        path="/timer"
                        element={<Action action_name="UniqueTimer" />}
                      />
                      <Route
                        path="/gmailNewDraft"
                        element={<Action action_name="TriggerWhenNewDraft" />}
                      />
                      <Route
                        path="/googleNewCalendar"
                        element={
                          <Action action_name="TriggerWhenNewCalendar" />
                        }
                      />
                      <Route
                        path="/googleNewCalendarEvent"
                        element={
                          <Action action_name="TriggerWhenNewCalendarEvent" />
                        }
                      />
                      <Route
                        path="/gmailNewMail"
                        element={<Action action_name="TriggerWhenNewMail" />}
                      />
                      <Route
                        path="/gmailNewLabel"
                        element={<Action action_name="TriggerWhenNewLabel" />}
                      />
                      <Route
                        path="/gmailNewStarredMail"
                        element={
                          <Action action_name="TriggerWhenNewStarredMail" />
                        }
                      />
                      <Route
                        path="/gmailNewAttachment"
                        element={
                          <Action action_name="TriggerWhenNewAttachment" />
                        }
                      />
                      <Route
                        path="/gmailNewEmailMatchingSearch"
                        element={
                          <Action action_name="TriggerWhenNewEmailMatchingSearch" />
                        }
                      />
                      <Route
                        path="/gmailNewThread"
                        element={<Action action_name="TriggerWhenNewThread" />}
                      />
                      <Route
                        path="/gmailNewContact"
                        element={<Action action_name="TriggerWhenNewContact" />}
                      />
                      <Route
                        path="/gmailDeletedMail"
                        element={
                          <Action action_name="TriggerWhenDeletedMail" />
                        }
                      />
                      <Route
                        path="/gmailEventCanceled"
                        element={
                          <Action action_name="TriggerWhenEventCanceled" />
                        }
                      />
                      <Route
                        path="/gmailEventEnded"
                        element={<Action action_name="TriggerWhenEventEnded" />}
                      />
                      <Route
                        path="/gmailEventStarted"
                        element={
                          <Action action_name="TriggerWhenEventStarted" />
                        }
                      />
                      <Route
                        path="/googleNewDoc"
                        element={<Action action_name="TriggerWhenNewDoc" />}
                      />
                      <Route
                        path="/googleDocDeleted"
                        element={<Action action_name="TriggerWhenDocDeleted" />}
                      />
                      <Route
                        path="/temperatureReached"
                        element={
                          <Action action_name="TriggerWhenTempReached" />
                        }
                      />
                      <Route
                        path="/temperatureDropped"
                        element={
                          <Action action_name="TriggerWhenTempDropped" />
                        }
                      />
                      <Route
                        path="/temperatureRise"
                        element={<Action action_name="TriggerWhenTempRise" />}
                      />
                      <Route
                        path="/weatherReached"
                        element={
                          <Action action_name="TriggerWhenWeatherReached" />
                        }
                      />
                      <Route
                        path="/googleContactDeleted"
                        element={
                          <Action action_name="TriggerWhenContactDeleted" />
                        }
                      />
                      <Route
                        path="/googleContactLabel"
                        element={
                          <Action action_name="TriggerWhenNewContactLabel" />
                        }
                      />
                      <Route
                        path="/discordNameUpdated"
                        element={
                          <Action action_name="TriggerWhenDiscordNameUpdated" />
                        }
                      />
                      <Route
                        path="/facebookNameUpdated"
                        element={
                          <Action action_name="TriggerWhenFacebookNameUpdated" />
                        }
                      />
                      <Route
                        path="/facebookProfilePictureUpdated"
                        element={
                          <Action action_name="TriggerWhenFacebookProfilePictureUpdated" />
                        }
                      />
                      <Route
                        path="/googleNewTask"
                        element={<Action action_name="TriggerWhenNewTask" />}
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          }
        />
      </Route>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/passwordreset/:resetToken" element={<ResetPassword />} />
      <Route path="/confirmation/:confirmToken" element={<ConfirmRegister />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
