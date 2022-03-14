export const backgroundColorSchema = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)'
];

export const renderData = (clients: any, projects: any) => {
  return {
    labels: ['Clients', 'Projects'],
    datasets: [
      {
        label: 'Service',
        data: [clients.length, projects.length],
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
};

export const optionsDoughnut = {
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
        drawTicks: false
      },
      ticks: {
        display: false
      }
    },
    y: {
      grid: {
        display: false,
        drawBorder: false,
        drawTicks: false
      },
      ticks: {
        display: false
      }
      // beginAtZero: true,
    }
  },
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
};
export const dataStats = {
  labels: ['something', 'yey', 'yey2'],
  datasets: [
    {
      label: 'Service',
      data: [5, 10, 15],
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
