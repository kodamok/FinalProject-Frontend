import React from 'react';
import styled from 'styled-components';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const ContainerDoughnut = styled.div`
  height: 350px;
  width: 100%;
  max-width: 1440px;
  margin: 2rem auto;
  box-shadow: ${({ theme }) => theme.boxShadow.mainShadow};
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.color.main2};
  ${({ theme }) => theme.up(theme.breakpoint.sm)} {
    width: 90%;
  }
`;

interface ChartTypes {
  data?: any;
  options?: any;
  type?: string;
  type2?: string;
}

// const config: any = {
//   type: 'line',
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//       {
//         label: 'APAC RE Index',
//         backgroundColor: 'blue',
//         borderColor: 'blue',
//         fill: false,
//         data: [
//           10, 20, 30, 40, 100, 50, 150
//           /* randomScalingFactor(),
//         randomScalingFactor(),
//         randomScalingFactor(),
//         randomScalingFactor(),
//         randomScalingFactor(),
//         randomScalingFactor(),
//         randomScalingFactor() */
//         ]
//       }
//       // {
//       //   label: 'APAC PME',
//       //   backgroundColor: window.chartColors.blue,
//       //   borderColor: window.chartColors.blue,
//       //   fill: false,
//       //   data: [50, 300, 100, 450, 150, 200, 300]
//       // }
//     ]
//   }
// };

const config: any = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
  datasets: [
    {
      label: 'Finished Projects',
      data: [3, 5, 8, 6, 10, 12, 16, 20, 22],
      backgroundColor: ['rgba(54, 162, 235, 1)'],
      borderColor: ['rgba(54, 162, 235, 1)'],
      borderWidth: 1
    },
    {
      label: 'New Clients',
      data: [7, 4, 2, 1, 8, 11, 14, 16, 12],
      backgroundColor: ['rgb(241,21,50)'],
      borderColor: ['rgb(241,21,50)'],
      borderWidth: 1
    }
  ]
};

// const myOptions: any = {
//   maintainAspectRatio: false,
//   title: {
//     display: true,
//     text: 'Number Of Projects - Last 12 Months'
//   },
//   scales: {
//     xAxes: [
//       {
//         display: true,
//         scaleLabel: {
//           display: true,
//           labelString: 'Date'
//         }
//       }
//     ],
//     yAxes: [
//       {
//         display: true,
//         // type: 'logarithmic',
//         scaleLabel: {
//           display: true,
//           labelString: 'Index Returns'
//         },
//         ticks: {
//           min: 0,
//           max: 20,
//
//           // forces step size to be 5 units
//           stepSize: 2
//         }
//       }
//     ]
//   }
// };

const myOptions: any = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

function Chart({ data, options, type, type2 }: ChartTypes) {
  return (
    <>
      <ContainerDoughnut>
        {type === 'doughnut' && <Line data={config || data} options={myOptions || options} />}
      </ContainerDoughnut>
      {type2 === 'statistics' && (
        <ContainerDoughnut>
          <Doughnut data={config || data} options={myOptions || options} />
        </ContainerDoughnut>
      )}
      {type2 === 'statistics' && (
        <ContainerDoughnut>
          <Bar data={config || data} options={myOptions || options} />
        </ContainerDoughnut>
      )}
    </>
  );
}

Chart.defaultProps = {
  data: undefined,
  options: undefined,
  type: 'doughnut',
  type2: undefined
};

export default Chart;
