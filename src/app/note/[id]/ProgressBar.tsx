// components/ProgressBar.jsx
import React from "react";

const ProgressBar = ({
  progress = 40, // Percentage (0 to 100)
  label = "", // Optional label (e.g., "Question 2 of 30")
  showPercentage = false, // Show percentage in the label
  bgColor = "bg-gray-200", // Background color of the bar
  fillColor = "bg-lime-200", // Fill color of the progress
  height = "h-2 sm:h-2.5 md:h-3 lg:h-3", // Height of the bar
  width = "w-12 sm:w-14 md:w-16 lg:w-[70px]", // Width of the bar
  labelClass = "text-xs sm:text-sm md:text-base lg:text-[0.95rem]", // Label font size
}) => {
  // Ensure progress is between 0 and 100

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`flex flex-col ${width}  gap-2`}>
      {/* Label Section */}
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && <p className={`font-medium ${labelClass}`}>{label}</p>}
          {showPercentage && (
            <p className={`font-medium ${labelClass}`}>{clampedProgress}%</p>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div
        className={`w-full ${height} ${bgColor} rounded-full overflow-hidden`}
      >
        <div
          className={`h-full ${fillColor} rounded-full transition-all duration-500 ease-in-out`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
