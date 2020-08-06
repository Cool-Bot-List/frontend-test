import { Badge, List, ListItem, Tooltip, Chip } from "@material-ui/core";
import { Done as DoneIcon, Notifications as NotificationLogo, NotificationsOff, Close as CloseIcon } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { NavItem } from "../../App";
import { io } from "../../ws";

import "./index.css";
import { getNoti } from "../../util/noti/getNoti";
import { updateNoti } from "../../util/noti/updateNoti";
import { markAllRead } from "../../util/noti/markAllRead";

export const NotificationButton = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async function () {
      const notis = await getNoti(user.id);
      notis.reverse();
      setNotifications(notis);
      setLoading(false);
    })();
  }, [user.id]);

  io.on("new-notification", (user) => {
    console.log("emited new-notification");
    setNotifications(user.setNotifications);
  });
  io.on("notification-update", (user) => {
    console.log("emited notification-update");
    setNotifications((s) => (s = user.notifications));
  });

  return !loading ? (
    <NavItem icon={<NotificationIcon count={notifications.filter((e) => e.read === false).length} />}>
      <NotificationDropdownMenu user={user} notifications={notifications} />
    </NavItem>
  ) : null;
};

const NotificationIcon = ({ count }) => {
  return (
    <>
      <Badge badgeContent={count} max={9} color="secondary" className="notification-number">
        <NotificationLogo style={{ color: "white" }} />
      </Badge>
    </>
  );
};

const NotificationDropdownMenu = ({ notifications, user }) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [showAll, setShowAll] = useState(true);

  const NotificationDropdownMenuItem = (props) => {
    const [showToolTip, setShowToolTip] = useState(null);
    const [showNotification, setShowNotification] = useState(true);
    useEffect(() => {
      console.log("useeffect with blnck array called");
      if (props.showToolTip === undefined) setShowToolTip(false);
      if (props.toolTipTitle) setShowToolTip(true);
    }, [props.showToolTip, props.toolTipTitle]);

    return showNotification ? (
      <List component="nav">
        {showToolTip ? (
          <Tooltip title={props.toolTipTitle}>
            <ListItem
              button
              className="menu-item"
              onClick={async () => {
                props.goToMenu && setActiveMenu(props.goToMenu);
                setShowNotification(false);
                await updateNoti(props.message, props.action, user.id);
                // if (props.action === 'read') // call mark as read fn
                // else if(props.action === 'unread') //call mark as unread fn
              }}
            >
              <span className="icon-button circle">{props.leftIcon}</span>

              {props.children}

              <span className="icon-right">{props.rightIcon}</span>
            </ListItem>
          </Tooltip>
        ) : (
          <ListItem button className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
            <span className="icon-button circle">{props.leftIcon}</span>

            {props.children}

            <span className="icon-right">{props.rightIcon}</span>
          </ListItem>
        )}
      </List>
    ) : null;
  };
  return (
    <div className="dropdown">
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={500} classNames="menu-primary">
        <div className="menu">
          <div className="notification-mark-all-read-container">
            <Chip
              className="notification-mark-all-read-item"
              label="Mark All As Read"
              clickable
              deleteIcon={<DoneIcon className="notification-mark-all-read-icon" />}
              color="primary"
              onClick={async () => {
                setShowAll(false);
                await markAllRead(user.id);
              }}
              variant="outlined"
            />
          </div>
          {showAll &&
            notifications
              .filter((e) => e.read === false)
              .map((n) => (
                <>
                  <NotificationDropdownMenuItem toolTipTitle="Mark As Read" action="read" message={n.message} leftIcon={<DoneIcon className="done-icon" />}>
                    {n.message}
                  </NotificationDropdownMenuItem>
                  <NotificationDropdownMenuItem toolTipTitle="Mark As Read" action="read" message={n.message} leftIcon={<DoneIcon className="done-icon" />}>
                    {n.message}
                  </NotificationDropdownMenuItem>
                  <NotificationDropdownMenuItem toolTipTitle="Mark As Read" action="read" message={n.message} leftIcon={<DoneIcon className="done-icon" />}>
                    {n.message}
                  </NotificationDropdownMenuItem>
                  <NotificationDropdownMenuItem toolTipTitle="Mark As Read" action="read" message={n.message} leftIcon={<DoneIcon className="done-icon" />}>
                    {n.message}
                  </NotificationDropdownMenuItem>
                  <NotificationDropdownMenuItem toolTipTitle="Mark As Read" action="read" message={n.message} leftIcon={<DoneIcon className="done-icon" />}>
                    {n.message}
                  </NotificationDropdownMenuItem>
                </>
              ))}

          <NotificationDropdownMenuItem leftIcon={<NotificationsOff />} rightIcon="➡" goToMenu="read-notifications">
            Read Notifications
          </NotificationDropdownMenuItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === "read-notifications"} unmountOnExit timeout={500} classNames="menu-secondary">
        <div className="menu">
          <NotificationDropdownMenuItem goToMenu="main" leftIcon="⬅">
            <h1>Read Notifications</h1>
          </NotificationDropdownMenuItem>
          {notifications
            .filter((e) => e.read === true)
            .map((n) => (
              <NotificationDropdownMenuItem toolTipTitle="Mark As Unread" action="unread" message={n.message} leftIcon={<CloseIcon className="done-icon" />}>
                {n.message}
              </NotificationDropdownMenuItem>
            ))}
        </div>
      </CSSTransition>
    </div>
  );
};
