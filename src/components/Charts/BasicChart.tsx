"use client";

import React from "react";
import ChartThree from "@/components/Charts/ChartThree";

const BasicChart: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartThree />
      
      </div>
    </>
  );
};

export default BasicChart;
