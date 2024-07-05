import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/AccountsLogo.png";
import { RiBankLine } from "react-icons/ri";

function Sidebar({ onLogout }) {
  const [leadMenuOpen, setLeadMenuOpen] = useState(false);
  const [studentMenuOpen, setStudentMenuOpen] = useState(false);
  const [referMenuOpen, setReferMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeReferSubmenu, setActiveReferSubmenu] = useState(null);

  const handelLogOutClick = () => {
    onLogout();
  };

  const toggleReferMenu = () => {
    setReferMenuOpen(!referMenuOpen);
    setActiveReferSubmenu(null);
    if (studentMenuOpen) {
      setStudentMenuOpen(false);
      setActiveSubmenu(null);
    }
  };

  const toggleStudentMenu = () => {
    setStudentMenuOpen(!studentMenuOpen);
    setActiveSubmenu(null);
    if (referMenuOpen) {
      setReferMenuOpen(false);
      setActiveReferSubmenu(null);
    }
  };

  const handleSubmenuClick = (submenu) => {
    setActiveSubmenu(submenu);
    setLeadMenuOpen(true);
  };

  const handleReferSubmenuClick = (referSubmenu) => {
    setActiveReferSubmenu(referSubmenu);
    setActiveSubmenu(null);
    setLeadMenuOpen(false);
    setReferMenuOpen(true);
  };

  const closeDropdown = () => {
    setLeadMenuOpen(false);
    setActiveSubmenu(null);
    setReferMenuOpen(false);
    setStudentMenuOpen(false);
    setActiveReferSubmenu(null);
  };

  return (
    <nav
      className="navbar show navbar-vertical h-lg-screen navbar-expand-lg p-0 navbar-light border-bottom border-bottom-lg-0 border-end-lg"
      style={{ backgroundColor: "#fff" }}
      id="navbarVertical"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler mx-2 p-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-white"></span>
        </button>
        <NavLink
          style={{ background: "#fff" }}
          className={`navbar-brand logo_ats py-lg-2 px-lg-6 m-0 d-flex align-items-center justify-content-center ${leadMenuOpen || activeSubmenu ? "active" : ""
            }`}
          to="/"
        >
          <img
            src={Logo}
            alt="logo"
            style={{ width: "130px" }}
          />
          {/* <span
            className="text-dark fs-3 fw-bolder mx-3"
          // style={{ textShadow: "1px 1px 2px black" }}
          >
            Accounts
          </span> */}
        </NavLink>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/dashboard"
                onClick={closeDropdown}
              >
                <i class="bx bx-bar-chart"></i>Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/items" onClick={closeDropdown}>
                <i class="bx bx-category"></i>Items
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/bank" onClick={closeDropdown}>
                <i class="bx bxs-bank"></i>Banking
              </NavLink>
            </li>
            <li className="nav-item">
              <div
                className={`nav-link ${referMenuOpen || activeReferSubmenu ? "active" : ""
                  }`}
                onClick={toggleReferMenu}
              >
                <i class="bx bx-cart"></i>Sales
                {referMenuOpen && (
                  <i
                    className="bi bi-chevron-up"
                    style={{ marginLeft: "auto" }}
                  ></i>
                )}
                {!referMenuOpen && (
                  <i
                    className="bi bi-chevron-down"
                    style={{ marginLeft: "auto" }}
                  ></i>
                )}
              </div>
              {referMenuOpen && (
                <ul className="submenu mx-1">
                  <NavLink
                    className="nav-link"
                    to="/customer"
                    onClick={() => handleReferSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeReferSubmenu === "create"
                        ? "active-referSubmenu"
                        : ""
                        }`}
                    >
                      <span className="mx-2">
                        Customer
                      </span>
                    </li>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/estimates"
                    onClick={() => handleReferSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeReferSubmenu === "create"
                        ? "active-referSubmenu"
                        : ""
                        }`}
                    >
                      <span className="mx-2">
                        Estimates
                      </span>
                    </li>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/salesorder"
                    onClick={() => handleReferSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeReferSubmenu === "create"
                        ? "active-referSubmenu"
                        : ""
                        }`}
                    >
                      <span className="mx-2">
                        Sales Order
                      </span>
                    </li>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/delivery"
                    onClick={() => handleReferSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeReferSubmenu === "create"
                        ? "active-referSubmenu"
                        : ""
                        }`}
                    >
                      <span className="mx-2">Deliver Challans</span>
                    </li>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/invoice"
                    onClick={() => handleReferSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeReferSubmenu === "create"
                        ? "active-referSubmenu"
                        : ""
                        }`}
                    >
                      <span className="mx-2">Invoice</span>
                    </li>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/recurringinvoice"
                    onClick={() => handleReferSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeReferSubmenu === "create"
                        ? "active-referSubmenu"
                        : ""
                        }`}
                    >
                      <span className="mx-2">Recurring Invoice</span>
                    </li>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/paymentReceived"
                    onClick={() => handleReferSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeReferSubmenu === "create"
                        ? "active-referSubmenu"
                        : ""
                        }`}
                    >
                      <span className="mx-2">
                        Payement Received
                      </span>
                    </li>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/creditNotes"
                    onClick={() => handleReferSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeReferSubmenu === "create"
                        ? "active-referSubmenu"
                        : ""
                        }`}
                    >
                      <span className="mx-2">
                        Credit Notes
                      </span>
                    </li>
                  </NavLink>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <div
                className={`nav-link ${studentMenuOpen || activeSubmenu ? "active" : ""
                  }`}
                onClick={toggleStudentMenu}
              >
                <i class="bx bx-basket"></i> Purchases
                {studentMenuOpen && (
                  <i
                    className="bi bi-chevron-up"
                    style={{ marginLeft: "auto" }}
                  ></i>
                )}
                {!studentMenuOpen && (
                  <i
                    className="bi bi-chevron-down"
                    style={{ marginLeft: "auto" }}
                  ></i>
                )}
              </div>
              {studentMenuOpen && (
                <ul className="submenu mx-1">
                  <NavLink
                    className="nav-link"
                    to="/vendor"
                    onClick={() => handleSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeSubmenu === "create" ? "active-submenu" : ""
                        }`}
                    >
                      <span className="mx-2">Vendor</span>
                    </li>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/expenses"
                    onClick={() => handleSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeSubmenu === "create" ? "active-submenu" : ""
                        }`}
                    >
                      <span className="mx-2">Expenses</span>
                    </li>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/purchase"
                    onClick={() => handleSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeSubmenu === "create" ? "active-submenu" : ""
                        }`}
                    >
                      <span className="mx-2">Purchase Orders</span>
                    </li>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/bills"
                    onClick={() => handleSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeSubmenu === "create" ? "active-submenu" : ""
                        }`}
                    >
                      <span className="mx-2">
                        Bills
                      </span>
                    </li>
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    to="/paymentmade"
                    onClick={() => handleSubmenuClick("create")}
                  >
                    <li
                      className={`nav-item ${activeSubmenu === "create" ? "active-submenu" : ""
                        }`}
                    >
                      <span className="mx-2">
                        Payments Made
                      </span>
                    </li>
                  </NavLink>
                </ul>
              )}
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/chartofaccount"
                onClick={closeDropdown}
              >
                <i class="bx bx-briefcase-alt-2"></i>Accounts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/report"
                onClick={closeDropdown}
              >
                <i class="bx bx-spreadsheet"></i>Reports
              </NavLink>
            </li>
          </ul>
          <hr className="navbar-divider my-5 opacity-20" />
          <div className="mt-auto"></div>
          <ul className="navbar-nav">
            <div className="mt-auto logutBtn">
              {/* <li className="py-2 px-4 nav-link nav-item" style={{ cursor: "pointer" }}>
                <button className="nav-link ps-4" to={"#"}>
                  <i className="bi bi-person-square"></i> Account
                </button>
              </li> */}
              <li className="py-2 px-4 nav-link nav-item" style={{ cursor: "pointer" }}>
                <button
                  to={"#"}
                  className="nav-link ps-4"
                  onClick={handelLogOutClick}
                >
                  <i className="bi bi-box-arrow-left"></i> Logout
                </button>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
