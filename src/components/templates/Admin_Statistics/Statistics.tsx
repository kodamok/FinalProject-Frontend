import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Chart from '../../molecules/Chart/Chart';
import { backgroundColorSchema, optionsDoughnut } from '../../../helpers/chartSettings';
import CardStatistic from '../../molecules/CardStatistic/CardStatistic';
import useError from '../../../hooks/useError';
import { Context } from '../../../providers/GeneralProvider';
import { LoadingSpin } from '../../atoms/LoadingSpin/LoadingSpin';

const Container = styled.div`
  padding: 1rem;
`;

const ContainerCardStatistics = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-flow: row wrap;
  justify-content: center;
  > div {
    min-width: 200px;
  }
`;

function Statistics() {
  const [statistics, setStatistics]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { handleError } = useError();
  const { userData } = useContext(Context);
  const fetchStatistics = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/statistics`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      });
      const resJSON = await res.json();
      console.log(resJSON);
      if (res.status === 200) {
        setStatistics(resJSON);
      } else {
        handleError(resJSON.message);
      }
    } catch (error: any) {
      console.log('FETCHING ERROR', error);
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  const dataStats = {
    labels: ['Clients', 'Projects'],
    datasets: [
      {
        label: 'Service',
        data: [statistics.projects, statistics.clients],
        backgroundColor: backgroundColorSchema,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 3
      }
    ]
  };

  if (isLoading) return <LoadingSpin />;
  return (
    <Container>
      <h4>Statistics</h4>
      {statistics && statistics.clients && <Chart data={dataStats} options={optionsDoughnut} />}
      <ContainerCardStatistics>
        {Object.entries(statistics).map((item: [string, any], i) => (
          // eslint-disable-next-line react/no-array-index-key
          <CardStatistic item={item} key={i} />
        ))}
      </ContainerCardStatistics>
    </Container>
  );
}

export default Statistics;
