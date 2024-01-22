// import { ChildAnalytic2, ChildGoal2 } from '@/store/types/user';
// import { MenuItem, Select, Typography } from '@mui/material';
// import dynamic from 'next/dynamic';
// import './style.scss';
// import React, { useState } from 'react';

// const ReactApexChart = dynamic(() => import('react-apexcharts'), {
//   ssr: false
// });
// interface IProps {
//   childGoals: ChildGoal2[];
// }
// type MetricType = 'activityEachWeek' | 'shotEachWeek' | 'percentageShot';
// const MonthlyPerformanceChart = (props: ChildAnalytic2[]) => {
//   const [currentMetric, setMetric] = useState<MetricType>('percentageShot');
//   const childGoals = props.map((childAnalytic) => ({
//     ...childAnalytic.goalId,
//     createdAt: childAnalytic.goalCreatedAt
//   }));
//   const getMetricDisplayName = (metric: MetricType) => {
//     switch (metric) {
//       case 'activityEachWeek':
//         return 'Activity ';
//       case 'shotEachWeek':
//         return 'Shots';
//       case 'percentageShot':
//         return 'Accuracy';
//       default:
//         return 'Activity';
//     }
//   };
//   const labels = childGoals.map((goal) =>
//     new Date(goal.createdAt).toDateString()
//   );
//   const data = childGoals.map((goal) => {
//     if (currentMetric === 'percentageShot') {
//       return parseFloat(goal.percentageShot.replaceAll('%', ''));
//     }
//     return goal[currentMetric];
//   });

//   const chartOptions: ApexCharts.ApexOptions = {
//     chart: {
//       id: 'line-chart',
//       toolbar: {
//         show: false
//       }
//     },
//     legend: {
//       show: false
//     },
//     xaxis: {
//       categories: labels
//     },
//     yaxis: {
//       title: {
//         text: getMetricDisplayName(currentMetric)
//       }
//     }
//   };

//   const chartSeries: ApexAxisChartSeries = [
//     {
//       name: 'Monthly Performance',
//       data
//     }
//   ];

//   return (
//     <div>
//       <div className="chart-header">
//         <Typography
//           variant="h4"
//           className="Over All Performance"
//           textAlign={'center'}
//           marginBottom={'1.5rem'}
//           marginTop={'1rem'}
//         >
//           Over All Performance
//         </Typography>
//         <Select
//           value={currentMetric}
//           onChange={(e) => {
//             console.log(e.target.value);
//             setMetric(e.target.value as MetricType);
//           }}
//           className="chart-select"
//         >
//           <MenuItem value="activityEachWeek">Activity</MenuItem>
//           <MenuItem value="shotEachWeek">Shots</MenuItem>
//           <MenuItem value="percentageShot">Accuracy</MenuItem>
//         </Select>
//       </div>
//       <ReactApexChart
//         options={chartOptions}
//         series={chartSeries}
//         type="line"
//         height={350}
//       />
//     </div>
//   );
// };

// export default MonthlyPerformanceChart;
