import React from "react";

export const Location = () => {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="hidden absolute w-1/2 h-full bg-gray-100 lg:block"
      />
      <div className="relative bg-gray-100 lg:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2">
          <div className="max-w-2xl mx-auto py-24 lg:py-64 lg:max-w-none">
            <div className="lg:pr-14">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                Want to see our products in person?
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                We have a store in the heart of the city. Come and visit us!
              </p>
              <div className="mt-6">
                <a
                  href="https://goo.gl/maps/Z892mWdSU3PRxhCw9"
                  className="inline-block bg-indigo-600 border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-indigo-700"
                  target="_blank"
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-48 sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.024249629485!2d72.85448807525897!3d22.69014117940818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e5b3c099a2273%3A0x93fe09e950d77143!2sANTIQUE%20SHOP%20AND%20COLLECTION!5e0!3m2!1sen!2sin!4v1667926069826!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
