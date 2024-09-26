import React from "react";
import Image from "next/image";
import googleImage from "@/public/image/googleImage.svg";


import Link from "next/link";
import MeetPopup from "@/components/MeetPopup";
import VideoFeed from "@/components/VideoFeed";
export const metadata = {
  title: "Meet",
};
export default async function page({ params }) {
  return (
    <div className=" relative min-h-screen text-black  bg-white flex justify-between border p-5 ">
      <nav className=" w-full flex flex-col items-center ">
        <div className="flex w-full justify-between items-center text-nowrap ">
          {" "}
          <Image alt="Google Meet" src={googleImage} width={250} height={250} />
          <Link className=" text-blue-600 text-xl" href={`/${params.id}/login`}>
            sign in
          </Link>
        </div>
        <VideoFeed />
        <span className="text-2xl text-center pt-4 w-full">
          Whats your name?
        </span>
        <input
          type="text"
          className=" bg-gray-100 border-b-2 mt-4  p-2 rounded w-80 py-4  focus:outline-none focus:border-blue-400"
          placeholder=" Your name"
        />
        <div className="mt-4">{<MeetPopup id={params.id} />}</div>
        <p className="text-gray-400 mt-4 w-full  text-sm text-center absolute bottom-5 left-0 ">
          {" "}
          By joining agree to the Google{" "}
          <span className="text-blue-600"> Terms of Service</span> and{" "}
          <span className="text-blue-600">Privacy Policy</span> . System info
          will be sent to confirm you&lsquo;re not a bot.
        </p>
      </nav>
    </div>
  );
}
