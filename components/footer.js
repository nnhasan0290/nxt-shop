import React from "react";
import Image from "next/image";
import Link from "next/link";

const Contact = () => {
  return (
    <div className=" bg-[#081828] flex justify-evenly items-center py-10">
      <div className="hidden sm:block">
        <a href={"/"}>
          <Image
            className="cursor-pointer"
            src={"/logo.svg"}
            height={100}
            width={200}
          ></Image>
        </a>
      </div>
      <a className="" href="mailto:mymailforabhi@gmail.com">
        <button className="text-white bg-[#172635] py-3 px-10 text-xl rounded-md hover:bg-[#0167f3] transition duration-300">
          Contact me{" "}
        </button>
      </a>
    </div>
  );
};

export default Contact;
