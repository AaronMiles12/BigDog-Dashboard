// import { ChildAnalytic2 } from '@/store/types/user';
// import ReactApexChart from 'react-apexcharts';
// import React from 'react';

// const LastTwoWeeksPerformanceChart = (props: ChildAnalytic2[]) => {
//   // Assuming lastTwoWeeksData is an array of performance data for the last two weeks
//   // You may need to extract and format the data accordingly
//   const lastTwoWeeksData = props.map((childAnalytic) => ({
//     ...childAnalytic.goalId,
//     createdAt: childAnalytic.goalCreatedAt
//   }));
//   const chartOptions: ApexCharts.ApexOptions = {
//     chart: {
//       id: 'circular-chart',
//       type: 'radialBar'
//     },
//     plotOptions: {
//       radialBar: {
//         dataLabels: {
//           total: {
//             show: true,
//             label: 'Performance',
//             formatter: function (w) {
//               return w.globals.seriesTotals[0] + '%';
//             }
//           }
//         }
//       }
//     }
//   };

//   const chartSeries: ApexAxisChartSeries = [
//     {
//       name: 'Last Two Weeks Performance',
//       data: lastTwoWeeksData.map((data) => data.activityEachWeek)
//     },
//     {
//       name: 'Last Two Weeks Performance',
//       data: lastTwoWeeksData.map((data) => data.activityEachWeek)
//     }
//   ];

//   return (
//     <div>
//       <ReactApexChart
//         options={chartOptions}
//         series={chartSeries}
//         type="radialBar"
//         height={350}
//       />
//     </div>
//   );
// };

// export default LastTwoWeeksPerformanceChart;
