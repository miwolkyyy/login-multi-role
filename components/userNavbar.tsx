import Link from "next/link";
import LogoutButton from "./ui/logout-button";

function UserNavbar() {
  const links = [
    { label: "home", href: "/user/home" },
    { label: "menu", href: "/user/menu" },
    { label: "reservasi", href: "/user/reservasi" },
    { label: "info", href: "/user/info" },
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
        <LogoutButton />
      </div>
    </nav>
  );
}

export default UserNavbar;
