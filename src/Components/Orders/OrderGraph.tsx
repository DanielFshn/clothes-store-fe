import { useEffect, useState } from "react";
import { urlGetStatistics } from "../../Config/endpoinst";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import LoadingSpinner from "../../Uitls/LoadSpinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Orders Statistics',
    },
  },
  maintainAspectRatio: false, // Add this line to allow resizing
};


export default function OrderGraph() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Order Count',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlGetStatistics);
        const formattedData = response.data;

        setChartData({
          labels: formattedData.map((entry: any) => entry.orderDate.substring(0, 10)),
          datasets: [
            {
              label: 'Order Count',
              data: formattedData.map((entry: any) => entry.orderCount),
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
  }, []);
  return (
    <>
    {loading ? ( // Render the LoadingSpinner when loading is true
        <LoadingSpinner />
      ) : (
    <div style={{ width: '1000px', height: '600px' }}>
      {chartData.labels && chartData.datasets ? (
        <Bar data={chartData} options={{ ...options}} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
      )}
</>
  )
}
