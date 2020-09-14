/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { ClickAwayListener, Drawer, IconButton } from "@material-ui/core";
import { ReactComponent as HamBurgerIcon } from "../../assets/hamburger.svg";
import { ReactComponent as CloseIcon } from "../../assets/x.svg";
import { ReactComponent as RightArrowIcon } from "../../assets/right-arrow-icon.svg";
import { ReactComponent as NotificationIcon } from "../../assets/notification-icon.svg";
import "./index.scss";

const avatarUrl = "https://cdn.discordapp.com/avatars/408080307603111936/fdb086b732e630a22095de8b26fea242.png?size=2048";

export const MobilePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <nav className="mobile-nav">
        <ul>
          <h1 onClick={() => (window.location.href = "/mobile")}>Cool Bot List</h1>
        </ul>
        <ul>
          <IconButton onClick={() => setIsDrawerOpen(true)}>
            <HamBurgerIcon className="hamburger-icon" />
          </IconButton>
        </ul>
      </nav>

      <Drawer open={isDrawerOpen} anchor="right">
        <ClickAwayListener onClickAway={() => setIsDrawerOpen(false)}>
          <div className="drawer">
            <nav>
              <ul>
                <h1 onClick={() => (window.location.href = "/mobile")}>Cool Bot List</h1>
              </ul>
              <ul>
                <IconButton onClick={() => setIsDrawerOpen(false)}>
                  <CloseIcon className="close-icon" />
                </IconButton>
              </ul>
              <ul></ul>
            </nav>

            <div className="mobile-nav-card-container">
              <div className="mobile-nav-card" id="mobile-nav-card-profile">
                <img src={avatarUrl} className="mobile-nav-card-icon" />
                <h1>Profile</h1>
                <RightArrowIcon className="mobile-nav-card-right-arrow-icon" />
              </div>

              <div className="mobile-nav-card" id="mobile-nav-card-notifications">
                <NotificationIcon className="mobile-nav-card-icon" id="noti-icon" />
                <h1>Notis</h1>
                <RightArrowIcon className="mobile-nav-card-right-arrow-icon" />
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </Drawer>
    </>
  );
};
