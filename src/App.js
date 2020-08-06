/* eslint-disable jsx-a11y/anchor-is-valid */
import { ClickAwayListener, IconButton, List, ListItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Form } from "./components/Form/Form";
import { NotificationButton } from "./components/Notification";
import { getBot } from "./util/getBot";
import { getUser } from "./util/getUser";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [bots, setBots] = useState(null);

  useEffect(() => {
    getUser("408080307603111936").then((foundUser) => {
      setUser(foundUser);
      getBot(foundUser).then((foundBots) => {
        setBots(foundBots);
        setLoading(false);
      });
    });
  }, []);

  return (
    <>
      {!loading ? (
        <div style={{ height: "115vh" }}>
          <Navbar>
            <NavItem icon="😉" />
            <NavItem icon="😉" />
            <NotificationButton user={user} />
            <NavItem icon={<img src={user.avatarUrl} alt="user" className="icon-button" />}>
              <DropdownMenu user={user} bots={bots} />
            </NavItem>
          </Navbar>
          <button className="button"> Submit Bot </button>
          <Form />
        </div>
      ) : null}
    </>
  );
}

function DropdownMenu({ user, bots }) {
  const [activeMenu, setActiveMenu] = useState("main");

  function DropdownItem(props) {
    return (
      <>
        <a href="#" className="te" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className="icon-button circle">{props.leftIcon}</span>
          {props.children}
          <span className="icon-right">{props.rightIcon}</span>
        </a>
        <List component="nav">
          <ListItem button className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
            <span className="icon-button circle">{props.leftIcon}</span>

            {props.children}
            <span className="icon-right">{props.rightIcon}</span>
          </ListItem>
        </List>
      </>
    );
  }
  return (
    <div className="dropdown">
      <CSSTransition in={activeMenu === "main"} unmountOnExit timeout={500} classNames="menu-primary">
        <div className="menu">
          <DropdownItem leftIcon={<img src={user.avatarUrl} alt="logo" className="icon-button" />}>My Profile</DropdownItem>

          <DropdownItem leftIcon="f"> Creeper#0001 has rated your bot 5 stars!</DropdownItem>

          <DropdownItem leftIcon="🤖" rightIcon="➡" goToMenu="bots">
            Bots
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition in={activeMenu === "bots"} unmountOnExit timeout={500} classNames="menu-secondary">
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon="⬅">
            <h1>Bots</h1>
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
      <ul className="navbar-nav"> {props.children} </ul>
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

export default App;
