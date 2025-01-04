import { Carousel } from "flowbite-react";
import React from "react";
import banner1 from "../assets/banner1.png";

const Home = () => {
  return (
    <div className="bg-white">
      <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto min-h-screen h-screen">
        <Carousel
          onSlideChange={(index) => console.log("onSlideChange()", index)}
          className="w-full mx-auto"
        >
          <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
            <div>
              <img src={banner1} alt="" />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-5xl font-semibold mb-4 text-gray-900 md:w-3/4 leading-snug">
                Lessons and insights <span className="text-green-900">from 8 years</span>
              </h1>
              <p className="text-gray-400 text-base mb-8">Where to grow your business as a photographer: site or social media?</p>
              <button className="px-7 py-2 bg-green-400 text-while rounded hover:bg-gray-900 transition-all duration-300 hover:-translate-y-4">Register</button>
            </div>
          </div>
          <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
            <div>
              <img src={banner1} alt="" />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-5xl font-semibold mb-4 text-gray-900 md:w-3/4 leading-snug">
                Learn and Earn Money <span className="text-green-900">in 4 Months</span>
              </h1>
              <p className="text-gray-400 text-base mb-8">Where to grow your business as a photographer: site or social media?</p>
              <button className="px-7 py-2 bg-green-400 text-while rounded hover:bg-gray-900 transition-all duration-300 hover:-translate-y-4">Register</button>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
