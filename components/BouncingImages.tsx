"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

/**
 * Demonstrates two images overlapping in normal flow.
 * Every 3s, they both shrink + move apart, swap z-index,
 * then scale back up to overlap again.
 */
export default function BouncingImages() {
  const [frontImage, setFrontImage] = useState(0);
  // Tracks the current animation stage: idle | scaleDown | scaleUp
  const [swapStage, setSwapStage] = useState<"idle" | "scaleDown" | "scaleUp">(
    "idle"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Start scale down
      setSwapStage("scaleDown");

      setTimeout(() => {
        setFrontImage((prev) => (prev === 0 ? 1 : 0));
      }, 200);

      // After 300ms (scaleDown done), swap front image
      setTimeout(() => {
        // Then scale up
        setSwapStage("scaleUp");
      }, 400);

      // After another 300ms, return to idle
      setTimeout(() => {
        setSwapStage("idle");
      }, 600);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Classes for image #1
  const image1Transforms = () => {
    switch (swapStage) {
      case "scaleDown":
        // Shrink + shift left
        return "scale-90 -translate-x-8";
      case "scaleUp":
        // Return to original position + size
        return "scale-100 translate-x-0";
      default:
        return "";
    }
  };

  // Classes for image #2
  const image2Transforms = () => {
    switch (swapStage) {
      case "scaleDown":
        // Shrink + shift right
        return "scale-90 translate-x-8";
      case "scaleUp":
        // Return to original position + size
        return "scale-100 translate-x-0";
      default:
        return "";
    }
  };

  return (
    <div className="relative flex items-start w-full mb-24">
      <div
        className={`
          relative border-4 border-[#D4F0FE] mr-[-60px]
          transition-all duration-300 
          ${frontImage === 0 ? "z-10" : "z-0"} 
          ${image1Transforms()}
        `}
      >
        <Image
          src="https://assets.pimms.io/dashboard-links-screenshot-2.webp"
          alt="Image 1"
          width={1200}
          height={1303}
          className="object-cover"
        />
      </div>
      <div
        className={`
          relative border-4 border-primary
          transition-all duration-300 top-[60px]
          ${frontImage === 1 ? "z-10" : "z-0"}
          ${image2Transforms()}
        `}
      >
        <Image
          src="https://assets.pimms.io/dashboard-links-screenshot-3.webp"
          alt="Image 2"
          width={1200}
          height={1303}
          className="object-cover"
        />
      </div>
    </div>
  );
}
