import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaFilm, FaTv } from "react-icons/fa";
import { motion } from "framer-motion";

export const SIDEBAR_WIDTH = 256;
export const SIDEBAR_COLLAPSED_WIDTH = 80;

export const Sidebar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void; // <-- REMOVE "1000"!
}) => {
  const location = useLocation();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ProSidebar
        collapsed={collapsed}
        rootStyles={{
          [".ps-sidebar-container"]: {
            backgroundColor: "#111",
            color: "#fff",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 999,
            borderRight: "none",
            width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
            transition: "width 0.3s",
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              "&:hover": { backgroundColor: "#e50914" },
              color: "#fff",
              fontWeight: 600,
              fontSize: "1rem",
              borderRadius: "8px",
            },
            icon: {
              color: "#fff",
              fontSize: "1.2rem",
            },
          }}
        >
          <MenuItem
            icon={<FaHome />}
            component={<Link to="/" />}
            active={location.pathname === "/"}
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<FaFilm />}
            component={<Link to="/movies" />}
            active={location.pathname === "/movies"} // <-- REMOVE "1000"!
          >
            Movies
          </MenuItem>
          <MenuItem
            icon={<FaTv />}
            component={<Link to="/series" />}
            active={location.pathname === "/series"}
          >
            Series
          </MenuItem>
        </Menu>
      </ProSidebar>
      <motion.button
        className="fixed top-4 left-4 z-[1000] p-2 bg-red-600 text-white rounded-full shadow"
        onClick={() => setCollapsed(!collapsed)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ left: collapsed ? 24 : SIDEBAR_WIDTH + 24, transition: "left 0.3s" }}
      >
        {collapsed ? ">" : "<"}
      </motion.button>
    </div>
  );
};
