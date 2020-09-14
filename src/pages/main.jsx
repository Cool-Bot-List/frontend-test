import React, { useEffect } from "react";
import { ClickAwayListener, IconButton, List, ListItem } from "@material-ui/core";
import { useState } from "react";
import { NotificationButton } from "../components/Notification";
import { Form } from "../components/Form/Form";
import { getUser } from "../util/getUser";
import { getBot } from "../util/getBot";
import { CSSTransition } from "react-transition-group";

export const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [bots, setBots] = useState(null);

  useEffect(() => {
    getUser("408080307603111936").then((foundUser) => {
      setUser(foundUser);
      console.log(foundUser);
      setLoading(false);
      getBot(foundUser).then((foundBots) => {
        setBots(foundBots);
        setLoading(false);
      });
    });
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Navbar>
            <a href="/">Cool Bot List</a>
            <NavItem icon="😉" />
            <NavItem icon="😉" />
            <NotificationButton user={user} />
            <NavItem icon={<img src={user.avatarUrl} alt="user" className="icon-button" />}>
              <DropdownMenu user={user} bots={bots} />
            </NavItem>
          </Navbar>
          <button className="button" onClick={() => (window.location.href = "/mobile")}>
            Submit Bot
          </button>
          <Form />
        </>
      ) : null}
    </>
  );
};

function DropdownMenu({ user, bots }) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    setMenuHeight(el.offsetHeight); // el.offsetHeight it the current height of the DOM element
  }

  function DropdownItem(props) {
    return (
      <List component="nav">
        <ListItem button className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className="icon-button circle">{props.leftIcon}</span>

          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </ListItem>
      </List>
    );
  }
  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={500} classNames="menu-primary" onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem leftIcon={<img src={user.avatarUrl} alt="logo" className="icon-button" />}>My Profile</DropdownItem>

          <DropdownItem leftIcon="f"> Creeper#0001 has rated your bot 5 stars!</DropdownItem>

          <DropdownItem leftIcon="🤖" rightIcon="➡" goToMenu="bots">
            Bots
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === "bots"} unmountOnExit timeout={500} classNames="menu-secondary" onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon="⬅">
            <h1 style={{ fontSize: "25px" }}>Bots</h1>
          </DropdownItem>
          {bots.map((b) => (
            <DropdownItem leftIcon={<img src={b.avatarUrl} alt="logo" className="icon-button" key={b.id} />}>{b.tag}</DropdownItem>
          ))}

          <DropdownItem leftIcon="🛠">Manage All</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

export function NavItem(props) {
  const [open, setOpen] = useState(false);

  const handleClickAway = () => {
    if (open) setOpen(false);
  };

  return (
    <ClickAwayListener className="test-color" onClickAway={handleClickAway}>
      <li className="nav-item">
        <IconButton color="inherit" className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </IconButton>
        {open && props.children}
      </li>
    </ClickAwayListener>
    //  <Backdrop className="test-color" open={open} onClick={handleClickAway}></Backdrop>
  );
}
