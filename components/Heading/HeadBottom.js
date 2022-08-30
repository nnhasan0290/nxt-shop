import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { MenuIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useState } from "react";
import {useRouter} from "next/router";


const HeadBottom = () => {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  return (
    <div className="flex relative justify-center px-10 border-t border-b">
      <div
        onClick={() => {
          setMenu(!menu);
        }}
        className="block p-3 md:hidden basis-1/3"
      >
        <MenuIcon className="h-6" />
      </div>
      <nav
        className={`flex flex-col justify-evenly md:items-center md:flex md:flex-row basis-2/3 ${
          menu ? "visible h-[auto]" : "invisible md:visible md:h-auto h-[0]"
        }`}
      >
        <li className={`hover:text-[#0167f3] transition duration-300 py-3 list-none ${router.pathname === "/" && "text-[#0167f3]"}`}>
          <Link className="" href="/">
            Home
          </Link>
        </li>
        <li className={`hover:text-[#0167f3] transition duration-300 py-3 list-none ${router.pathname === "/product" && "text-[#0167f3]"}`}>
          <Link href="/product">Shop</Link>
        </li>
        <li
          className={`flex flex-col py-3 transition duration-300 cursor-pointer z -20 hover:text-[#0167f3] md:items-center`}
        >
           <Link className="" href="/admin/dashboard">
            Dashboard
          </Link>
        </li>
        <li className={`hover:text-[#0167f3] transition duration-300 py-3 list-none ${router.pathname === "/cart" && "text-[#0167f3]"}`}>
          <Link href="/cart">Cart</Link>
        </li>
        <li className={`hover:text-[#0167f3] transition duration-300 py-3 list-none ${router.pathname === "/orders" && "text-[#0167f3]"}`}>
          <Link href="/orders">Orders</Link>
        </li>
      </nav>
      <div className="hidden justify-center items-center md:flex basis-1/3">
        <p className="hidden font-semibold md:block">Follow :</p>
        <ul className="flex ml-3 space-x-3 cursor-pointer">
          <Link
            href={"https://www.facebook.com/profile.php?id=100006626565477"}
          >
            <FacebookIcon />
          </Link>
          <Link href={"https://www.instagram.com/nazmul6390/"}>
            <InstagramIcon />
          </Link>
          <Link href={"https://twitter.com/NLNazmuL1"}>
            <TwitterIcon />
          </Link>
          <Link href={"https://github.com/nnhasan0290"}>
            <GitHubIcon />
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default HeadBottom;
