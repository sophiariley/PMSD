import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import './Components.css';

ChartJS.register(ArcElement, Tooltip);

type HealthScoreChartProps = {
  score: number;
};

function HealthScoreChart({ score }: HealthScoreChartProps) {
  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ['#4CAF50', '#E0E0E0'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="healthScoreChart-container">
      <Doughnut data={data} options={options} />
      <div className="healthScoreChart-centerText">{score}%</div>
    </div>
  );
}

export default HealthScoreChart;