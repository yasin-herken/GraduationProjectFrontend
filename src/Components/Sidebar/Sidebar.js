import React from "react";
import { useLocation } from "react-router-dom";
import "primeicons/primeicons.css";
import {
  MdOutlineSettingsInputComposite,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectUser } from "../../Features/user/userSlice";
import { hasRole } from "../../Utils/auth";
const Sidebar = ({ toggle }) => {
  const user = useSelector(selectUser);
  const location = useLocation();
  return (
    <React.Fragment>
      <nav
        id="sidebar"
        className={
          toggle ? "sidebar js-sidebar collapsed" : "sidebar js-sidebar"
        }
      >
        <div className="sidebar-content js-simplebar">
          <a className="sidebar-brand" href="/">
            <span className="align-middle">E Ticaret Sitesi</span>
          </a>
          <ul className="sidebar-nav">
            <li className="sidebar-header">Pages</li>
            <li
              className={
                location.pathname === "/"
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
            >
              <a className="sidebar-link" href="/">
                <MdOutlineSettingsInputComposite />
                <span className="align-middle">Dashboard</span>
              </a>
            </li>
            <li
              className={
                location.pathname === "/orderlist"
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
            >
              <a className="sidebar-link" href="/orderlist">
                <TiShoppingCart />
                <span className="align-middle">Orders</span>
              </a>
            </li>
            <li
              className={
                location.pathname === "/products"
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
            >
              <a className="sidebar-link" href="/products">
                <MdOutlineProductionQuantityLimits />
                <span className="align-middle">Products</span>
              </a>
            </li>
            {hasRole(user, ["ROLE_ADMIN"]) && (
              <li
                className={
                  location.pathname === "/users"
                    ? "sidebar-item active"
                    : "sidebar-item"
                }
              >
                <a className="sidebar-link" href="/users">
                  <BsPersonCircle />
                  <span className="align-middle">Users</span>
                </a>
              </li>
            )}
            <li className="sidebar-header">Tools &amp; Components</li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="ui-buttons.html">
                <i className="align-middle" data-feather="square" />{" "}
                <span className="align-middle">Buttons</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="ui-forms.html">
                <i className="align-middle" data-feather="check-square" />{" "}
                <span className="align-middle">Forms</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="ui-cards.html">
                <i className="align-middle" data-feather="grid" />{" "}
                <span className="align-middle">Cards</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="ui-typography.html">
                <i className="align-middle" data-feather="align-left" />{" "}
                <span className="align-middle">Typography</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="icons-feather.html">
                <i className="align-middle" data-feather="coffee" />{" "}
                <span className="align-middle">Icons</span>
              </a>
            </li>
            <li className="sidebar-header">Plugins &amp; Addons</li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="charts-chartjs.html">
                <i className="align-middle" data-feather="bar-chart-2" />{" "}
                <span className="align-middle">Charts</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link" href="maps-google.html">
                <i className="align-middle" data-feather="map" />{" "}
                <span className="align-middle">Maps</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Sidebar;
