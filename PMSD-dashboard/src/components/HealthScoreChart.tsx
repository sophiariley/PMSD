import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import './Components.css';

ChartJS.register(ArcElement, Tooltip);

type HealthScoreChartProps = {
  score: number;
};

function HealthScoreChart({ score }: HealthScoreChartProps) {

    // The data for the donut chart. Currently, the chart displays solid green (the patient's "health score") and solid light gray (100 - the patient's "health score")
    // TODO: Define an algorithm that determines a patient's "health score." 
    // This algorithm will determine the patient's "health score" based off of their information (sleep, activity, labor, etc...)
    // TODO: Set chart as ombre instead of solid colors
    const data = {
        datasets: [
        {
            data: [score, 100 - score],
            backgroundColor: ["#93C572", "#F0EFEB"],
            borderWidth: 0,
            cutout: '70%',
        },
        ],
    };

    // Configuration options for the donut chart
    const options = {
        cutout: '70%',
        plugins: {
            tooltip: { enabled: false },
        },
    };

    return (
        <div className="healthScoreChart-container">
        <Doughnut data={data} options={options} />
        <div className="healthScoreChart-text">{score}%</div>
        </div>
    );
}

export default HealthScoreChart;