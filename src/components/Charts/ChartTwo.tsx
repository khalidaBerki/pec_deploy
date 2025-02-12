<<<<<<< HEAD
import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";

const ChartTwo: React.FC = () => {
  const series = [
    {
      name: "Sales",
      data: [44, 55, 41, 67, 22, 43, 65],
    },
    {
      name: "Revenue",
      data: [13, 23, 20, 8, 13, 27, 15],
    },
  ];
=======
"use client"

import type { ApexOptions } from "apexcharts"
import type React from "react"
import { useState, useEffect } from "react"
import ReactApexChart from "react-apexcharts"
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption"

interface OrderData {
  day: string
  orders: number
  revenue: number
}

const ChartTwo: React.FC = () => {
  const [data, setData] = useState<OrderData[]>([])
  const [timeRange, setTimeRange] = useState<"this" | "last">("this")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/stats/order-distribution?range=${timeRange}`)
        if (!response.ok) throw new Error("Échec de la récupération des données")
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error)
      }
    }

    fetchData()
  }, [timeRange])

  const series = [
    {
      name: "Ventes",
      data: data.map((item) => item.orders),
    },
    {
      name: "Revenus",
      data: data.map((item) => item.revenue),
    },
  ]
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf

  const options: ApexOptions = {
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
<<<<<<< HEAD

=======
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },
<<<<<<< HEAD

=======
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
<<<<<<< HEAD

    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
=======
    xaxis: {
      categories: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",
<<<<<<< HEAD

      markers: {
        radius: 99,
        width: 16,
        height: 16,
        strokeWidth: 10,
        strokeColor: "transparent",
=======
      markers: {
        size: 16,
        strokeWidth: 10,
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
      },
    },
    fill: {
      opacity: 1,
    },
<<<<<<< HEAD
  };
=======
  }
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
<<<<<<< HEAD
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Profit this week
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={["This Week", "Last Week"]} />
=======
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">Profit cette semaine</h4>
        </div>
        <div>
          <DefaultSelectOption
            options={["Cette semaine", "Semaine dernière"]}
            onChange={(value: string) => setTimeRange(value === "Cette semaine" ? "this" : "last")}
          />
>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-3.5">
<<<<<<< HEAD
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={370}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
=======
          <ReactApexChart options={options} series={series} type="bar" height={370} />
        </div>
      </div>
    </div>
  )
}

export default ChartTwo

>>>>>>> 1e330dfb07b3c1100addbad2ac5c63be5485e4cf
