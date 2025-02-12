<<<<<<< HEAD
import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";

const ChartThree: React.FC = () => {
  const series = [65, 34, 12, 56];
=======
"use client"

import type { ApexOptions } from "apexcharts"
import type React from "react"
import { useState, useEffect } from "react"
import ReactApexChart from "react-apexcharts"
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption"

interface OrderStatus {
  id: number
  status: string
  count: number
}

const ChartThree: React.FC = () => {
  const [data, setData] = useState<OrderStatus[]>([])
  const [timeRange, setTimeRange] = useState<"monthly" | "yearly">("monthly")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/stats/order-status?range=${timeRange}`)
        if (!response.ok) throw new Error("Échec de la récupération des données")
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
      }
    }

    fetchData()
  }, [timeRange])

  const series = data.map((item) => item.count)
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#5750F1", "#5475E5", "#8099EC", "#ADBCF2"],
<<<<<<< HEAD
    labels: ["Desktop", "Tablet", "Mobile", "Unknown"],
=======
    labels: data.map((item) => item.status),
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
    legend: {
      show: false,
      position: "bottom",
    },
<<<<<<< HEAD

=======
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
<<<<<<< HEAD
              label: "Visitors",
=======
              label: "Commandes",
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
              fontSize: "16px",
              fontWeight: "400",
            },
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: "bold",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
<<<<<<< HEAD
  };
=======
  }
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-9 justify-between gap-4 sm:flex">
        <div>
<<<<<<< HEAD
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Used Devices
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={["Monthly", "Yearly"]} />
=======
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Statuts des commandes</h4>
        </div>
        <div>
          <DefaultSelectOption
            options={["Mensuel", "Annuel"]}
            onChange={(value: string) => setTimeRange(value.toLowerCase() as "monthly" | "yearly")}
          />
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
        </div>
      </div>

      <div className="mb-8">
        <div className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[350px]">
        <div className="-mx-7.5 flex flex-wrap items-center justify-center gap-y-2.5">
<<<<<<< HEAD
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> Desktop </span>
                <span> 65% </span>
              </p>
            </div>
          </div>
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue-light"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> Tablet </span>
                <span> 34% </span>
              </p>
            </div>
          </div>
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue-light-2"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> Mobile </span>
                <span> 45% </span>
              </p>
            </div>
          </div>
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue-light-3"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> Unknown </span>
                <span> 12% </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
=======
          {data.map((item, index) => (
            <div key={item.id} className="w-full px-7.5 sm:w-1/2">
              <div className="flex w-full items-center">
                <span className={`mr-2 block h-3 w-full max-w-3 rounded-full bg-${options.colors?.[index]}`}></span>
                <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                  <span>{item.status}</span>
                  <span>{item.count}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChartThree

>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
