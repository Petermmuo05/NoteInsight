// "use client";
// import React, { useState } from "react";
// import {
//   MdArrowLeft,
//   MdArrowRight,
//   MdVisibility,
//   MdVisibilityOff,
// } from "react-icons/md";

// export default function FlashCard() {
//   const [isAnswerVisible, setAnswerVisible] = useState(false);

//   return (
//     <div className="flex flex-row items-center rounded-xl w-[100%] h-fit transition-all duration-200 ease-in-out">
//       <div className="h-full items-center flex">
//         <MdArrowLeft className="text-[50px]" />
//       </div>
//       <div className="w-full h-full flex flex-col p-[2rem] shadow-lg rounded-xl bg-white">
//         <div className="flex flex-row w-full items-center mb-8 justify-between">
//           <p className="font-[500] text-[0.95rem]">Question 2 of 30</p>
//           <div className="w-[70px] h-[10px] bg-lime-200 rounded-lg"></div>
//         </div>
//         <p className="font-[700] px-5 text-[1.8rem]">
//           In the context of quantum entanglement, how does the violation of
//           Bell’s inequalities support the non-local nature of quantum mechanics?
//         </p>

//         {/* Answer section with smooth expansion */}
//         <div
//           className={`overflow-hidden transition-all duration-500 ease-in-out ${
//             isAnswerVisible
//               ? " mt-8 max-h-[300px] opacity-100"
//               : "max-h-0 opacity-0"
//           }`}
//         >
//           {isAnswerVisible && (
//             <div>
//               <div className="flex px-5 flex-row items-center hover:text-medium-gray text-[#555] cursor-pointer gap-1">
//                 <MdVisibilityOff size={18}/>
//                 <h1
//                   onClick={() => setAnswerVisible(false)}
//                   className="font-[700] text-[1.2rem] "
//                 >
//                   Answer
//                 </h1>
//               </div>

//               <p className="font-[400] px-5 text-[1.2rem] text-[#555]">
//                 In the context of quantum entanglement, how does the violation
//                 of Bell’s inequalities support the non-local nature of quantum
//                 mechanics?
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Toggle button for viewing the answer */}
//         <div
//           className={` w-full flex justify-end items-center py-1 overflow-hidden transition-all duration-500 ease-in-out ${
//             !isAnswerVisible
//               ? "mt-8 max-h-[300px] opacity-100"
//               : "max-h-0 opacity-0"
//           }`}
//         >
//           {!isAnswerVisible && (
//             <div
//               onClick={() => setAnswerVisible(true)}
//               className="px-3 mr-0.5 flex items-center flex-row gap-1 w-fit py-2 text-[14px] rounded-full text-light-gray transition-all active:scale-98 no-select duration-200 ease-in-out hover:bg-like-gray bg-black hover:scale-105 hover:shadow-lg"
//             >
//               <MdVisibility size={15} color="white" />
//               <span>Answer</span>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="h-full items-center flex">
//         <MdArrowRight className="text-[50px]" />
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import {
  MdArrowLeft,
  MdArrowRight,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import ProgressBar from "./ProgressBar";

export default function FlashCard() {
  const [isAnswerVisible, setAnswerVisible] = useState(false);

  return (
    <div className="flex flex-row items-center rounded-xl w-full h-fit transition-all duration-200 ease-in-out">
      {/* Left Arrow */}
      <div className="h-full items-center hidden sm:flex transition-all active:scale-98 no-select duration-200 ease-in-out hover:text-like-gray text-black hover:scale-110">
        <MdArrowLeft className="text-[30px] sm:text-[35px] md:text-[40px] lg:text-[50px]" />
      </div>

      {/* Main Card Content */}
      <div className="w-full h-full flex flex-col p-4 sm:p-5 md:p-6 lg:p-8 shadow-lg rounded-xl bg-white">
        {/* Progress Section */}
        <div className="flex flex-row w-full items-center mb-4 sm:mb-5 md:mb-6 lg:mb-8 justify-between">
          <p className="font-medium text-xs sm:text-sm md:text-base lg:text-[0.95rem]">
            Question 2 of 30
          </p>
          <ProgressBar />{" "}
        </div>

        {/* Question */}
        <p className="font-bold px-3 sm:px-4 md:px-4 lg:px-5 text-lg sm:text-xl md:text-2xl lg:text-[1.8rem]">
          In the context of quantum entanglement, how does the violation of
          Bell’s inequalities support the non-local nature of quantum mechanics?
        </p>

        {/* Answer Section with Smooth Expansion */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isAnswerVisible
              ? "mt-4 sm:mt-5 md:mt-6 lg:mt-8 max-h-[200px] sm:max-h-[250px] md:max-h-[280px] lg:max-h-[300px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          {isAnswerVisible && (
            <div>
              <div className="flex px-3 sm:px-4 md:px-4 lg:px-5 flex-row items-center hover:text-medium-gray text-[#555] cursor-pointer gap-1">
                <MdVisibilityOff className="text-[14px] sm:text-[16px] lg:text-[18px]" />
                <h1
                  onClick={() => setAnswerVisible(false)}
                  className="font-bold text-sm sm:text-base md:text-lg lg:text-[1.2rem]"
                >
                  Answer
                </h1>
              </div>

              <p className="font-normal px-3 sm:px-4 md:px-4 lg:px-5 text-sm sm:text-base md:text-lg lg:text-[1.2rem] text-[#555]">
                In the context of quantum entanglement, how does the violation
                of Bell’s inequalities support the non-local nature of quantum
                mechanics?
              </p>
            </div>
          )}
        </div>

        {/* Toggle Button for Viewing the Answer */}
        <div
          className={`w-full flex justify-end items-center py-1 overflow-hidden transition-all duration-500 ease-in-out ${
            !isAnswerVisible
              ? "mt-4 sm:mt-5 md:mt-6 lg:mt-8 max-h-[200px] sm:max-h-[250px] md:max-h-[280px] lg:max-h-[300px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          {!isAnswerVisible && (
            <div
              onClick={() => setAnswerVisible(true)}
              className="px-2 sm:px-2.5 md:px-3 mr-0.5 flex items-center flex-row gap-0.5 sm:gap-1 md:gap-1 lg:gap-1 w-fit py-1 sm:py-1.5 md:py-1.5 lg:py-2 text-xs sm:text-sm md:text-sm lg:text-[14px] rounded-full text-light-gray transition-all active:scale-98 no-select duration-200 ease-in-out hover:bg-like-gray bg-black hover:scale-105 hover:shadow-lg"
            >
              <MdVisibility
                className="text-[14px] sm:text-[16px] lg:text-[18px]"
                color="white"
              />
              <span>Answer</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Arrow */}
      <div className="h-full items-center hidden sm:flex transition-all active:scale-98 no-select duration-200 ease-in-out hover:text-like-gray text-black hover:scale-110">
        <MdArrowRight className="text-[30px] sm:text-[35px] md:text-[40px] lg:text-[50px]" />
      </div>
    </div>
  );
}
