import React from "react";

const AlertUser = () => {
  return (
    <>
      <div className="flex w-full rounded-[10px] border-l-6 border-orange-500 bg-orange-100 px-7 py-8 dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
        <div className="mr-5 mt-[5px] flex h-8 w-full max-w-8 items-center justify-center rounded-md bg-orange-500">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 2H4C2.89 2 2 2.89 2 4V20L6 16H20C21.1 16 22 15.1 22 14V4C22 2.89 21.1 2 20 2ZM20 14H5.17L4 15.17V4H20V14Z"
            fill="white"
          />
        </svg>
        
        </div>
        <div className="w-full">
        <h5 className="mb-4 font-bold leading-[22px] text-orange-600">
          Attention : Message reçu
        </h5>
        <ul>
          <li className="text-orange-700">
            L'utilisateur <strong>Haithem HAMMAMI</strong> a envoyé un message :<br />
            <q>Hello Admin</q>
          </li>
        </ul>
        </div>
      </div>
    </>
  );
};

export default AlertUser;
