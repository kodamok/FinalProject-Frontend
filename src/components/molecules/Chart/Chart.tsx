import React from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
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
  height: 300px;
  width: 100%;
  margin: 2rem auto;
`;

interface ChartTypes {
  data: any;
  options: any;
  type?: string;
}

function Chart({ data, options, type }: ChartTypes) {
  return (
    <ContainerDoughnut>
      {type === 'doughnut' && <Doughnut data={data} options={options} />}
    </ContainerDoughnut>
  );
}

Chart.defaultProps = {
  type: 'doughnut'
};

export default Chart;
