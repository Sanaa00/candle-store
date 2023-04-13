import React from "react";

function Button({ text, type, onClick }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={` h-10 w-full lg:w-80 xl:w-96  rounded-sm  bg-greeen text-center text-gray-100 hover:bg-darkgreen hover:duration-500 duration-500 hover:shadow-lg`}
    >
      {text}
    </button>
  );
}

export default Button;
// const widthOfButton = () => {
//   if (window.innerWidth < 640) {
//     return "full";
//   } else if (window.innerWidth < 768) {
//     return "full";
//   } else if (window.innerWidth < 1024) {
//     return "full";
//   } else {
//     return "96";
//   }
// };
