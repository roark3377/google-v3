"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import microPhone from "@/public/image/mute.png";
import videoIcon from "@/public/image/video.png";
import dotIcon from "@/public/image/dot.png";

export default function VideoFeed() {
  const videoRef = useRef(null); // Reference to the video element
  const [mediaAllowed, setMediaAllowed] = useState(false); // Track permission
  const [error, setError] = useState(""); // Track errors

  useEffect(() => {
    // Function to request media access
    const requestMediaAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setMediaAllowed(true); // Media access granted
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
        setError(
          "Unable to access the camera and microphone. Please allow permissions."
        );
      }
    };

    // Attempt to access media on component mount
    requestMediaAccess();
  }, []); // Only run once when the component mounts

  const handleAllowMedia = () => {
    // This will be triggered if media access was denied initially
    requestMediaAccess();
  };

  return (
    <div>
      <div className="bg-black flex-col overflow-hidden flex md:p-10 p-5 mt-4 z-20 relative justify-center items-center min-h-40 rounded">
        <>
          <div className="z-30 relative flex justify-center flex-col items-center">
            <div className="flex w-full justify-end">
              <Image alt="dot icon" src={dotIcon} width={5} height={5} />
            </div>
            <h1 className="text-white text-2xl text-center">
              Do you want people to see and hear you in the meeting?
            </h1>
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Show error message if any */}
            <button
              onClick={handleAllowMedia}
              className="text-white mt-4 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Allow microphone and camera
            </button>
            <div className="flex gap-5 my-3">
              <span className="bg-red-600 flex justify-center items-center rounded-full p-5">
                <Image
                  alt="microphone"
                  src={microPhone}
                  width={25}
                  height={25}
                />
              </span>
              <span className="bg-red-600 flex justify-center items-center rounded-full p-5">
                <Image
                  alt="video icon"
                  src={videoIcon}
                  width={25}
                  height={25}
                />
              </span>
            </div>
          </div>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="my-3 w-full rounded min-h-40 absolute -top-10 left-0 z-0"
          />
        </>
      </div>
    </div>
  );
}
