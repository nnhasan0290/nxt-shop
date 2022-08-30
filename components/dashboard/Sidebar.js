import Image from "next/image";
import Link from "next/link";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {
  ClipboardListIcon,
  PlusCircleIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Sidebar = () => {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  console.log(visibility);
  useEffect(() => {
    if (
      router.pathname === "/admin/allproduct" ||
      router.pathname === "/admin/createproduct"
    ) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [router]);
  return (
    <>
      <div className="w-[20%] border hidden fixed sm:block h-full top-0 bottom-0 overflow-auto p-3 box-border ">
        <a href="/">
          <Image
            className="cursor-pointer"
            src="/logo.svg"
            width={200}
            height={70}
          />
        </a>
        <div className="mx-2 text-medium">
          <div
            className={`each-sidebar-item ${
              router.pathname === "/admin/dashboard" &&
              "text-[#0167f3]  scale-105"
            }`}
          >
            <ViewGridIcon className="h-6" />
            <Link href="/admin/dashboard">Dashboard</Link>
          </div>
          <div className="each-sidebar-item peer hover:text-[#888]">
            <ChevronDownIcon className="h-6" />
            <p>Product(s)</p>
          </div>
          <div
            className={`ml-2  transition duration-500 ease-in-out ${
              !visibility ? "invisible opacity-0 h-0" : "h-[5em]"
            } peer-hover:visible hover:visible peer-hover:opacity-100 peer-hover:h-[5em] hover:h-[5em] hover:opacity-100 h-0`}
          >
            <div
              className={`each-sidebar-item  ${
                router.pathname === "/admin/allproduct" &&
                "text-[#0167f3]  scale-105"
              }`}
            >
              <ClipboardListIcon className="h-5" />
              <Link href={"/admin/allproduct"}>All</Link>
            </div>
            <div
              className={`each-sidebar-item  ${
                router.pathname === "/admin/createproduct" &&
                "text-[#0167f3]  scale-105"
              }`}
            >
              <PlusCircleIcon className="h-5" />
              <Link href="/admin/createproduct">Create</Link>
            </div>
          </div>
          <div
            className={`each-sidebar-item ${
              router.pathname === "/admin/orders" && "text-[#0167f3]  scale-105"
            }`}
          >
            <ListAltIcon className="h-6" />
            <Link href="/admin/orders">Orders</Link>
          </div>

          <div
            className={`each-sidebar-item ${
              router.pathname === "/admin/users" && "text-[#0167f3]  scale-105"
            }`}
          >
            <AccountCircleIcon className="h-6" />
            <Link href="/admin/users">Users</Link>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 flex justify-around w-full bg-white sm:hidden">
        <Link href="/admin/dashboard">
          <ViewGridIcon
            className={`${
              router.pathname === "/admin/dashboard" && "text-[#0167f3]"
            } h-7`}
          />
        </Link>
        <Link href="/admin/allproduct">
          <ClipboardListIcon
            className={`${
              router.pathname === "/admin/allproduct" && "text-[#0167f3]"
            } h-7`}
          />
        </Link>
        <Link href="/admin/createproduct">
          <PlusCircleIcon
            className={`${
              router.pathname === "/admin/createproduct" && "text-[#0167f3]"
            } h-7`}
          />
        </Link>
        <Link href="/admin/orders">
          <ListAltIcon
            className={`${
              router.pathname === "/admin/orders" && "text-[#0167f3]"
            } h-7`}
          />
        </Link>
        <Link href="/admin/users">
          <AccountCircleIcon
            className={`${
              router.pathname === "/admin/users" && "text-[#0167f3]"
            } h-7`}
          />
        </Link>
      </div>
    </>
  );
};
export default Sidebar;
