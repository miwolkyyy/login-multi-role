import Link from "next/link";
import React from "react";

function AdminNavbar() {
  const links = [
    { label: "home", href: "/user/home" },
    { label: "menu", href: "/user/menu" },
    { label: "reservasi", href: "/user/reservasi" },
    { label: "info", href: "/user/info" },
    { label: "dashboard", href: "/admin/dashboard" },
    { label: "add menu", href: "/admin/add-menu" },
  ];
  return (
    <nav className="bg-primary p-4 uppercase text-primary-content text-sm">
      <div className="navbar-start">
        <Link href={"/home"} className="">
          home
        </Link>
      </div>
      <div className="navbar-end">
        <ul className="flex gap-2.5">
          {links.map((item) => {
            return (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default AdminNavbar;
