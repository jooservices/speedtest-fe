import { JSX, FC, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Flex } from "antd";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type DS = { label: string; data: number[]; backgroundColor?: string; stack?: string };

type Props = {
  labels: string[];
  datasets: DS[];
  stacked?: boolean;      // true = stacked bar
  horizontal?: boolean;   // true = horizontal bar
  height?: number | string;
  title?: string;
  displayUnit?: string;
  actionButton?: JSX.Element;
};

const BarBasic: FC<Props> = ({ labels, datasets, stacked = false, horizontal = false, height = 320, title, displayUnit, actionButton }) => {
  const data = useMemo<ChartData<"bar">>(() => ({
    labels,
    datasets: datasets.map(d => ({
      ...d,
      backgroundColor: d.backgroundColor ?? "#00bfff",
      borderRadius: 6,                 
      borderSkipped: stacked ? "start" : false, 
      barThickness: "flex",            
      maxBarThickness: 38,
    })),
  }), [labels, datasets, stacked]);

  const options = useMemo<ChartOptions<"bar">>(() => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: { position: "bottom" },
      title: { display: false, text: "" },
      tooltip: {
        callbacks: {
          title: () => '',
          label: (ctx) => {
            const v = (ctx.parsed as any)?.y ?? (ctx.parsed as any)?.x;
            return `${v}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked,
        grid: { display: true, color: "rgba(0,0,0,0.08)" },
        ticks: { maxRotation: 0,
          callback: function (val) {
            const label = this.getLabelForValue(Number(val));
            const [date, time] = label.split(',').map(s => s.trim());
            const now = new Date();
            const [day, month] = date.split('/');
            const [hour, minute] = time.split(':');
            const d = new Date(
              now.getFullYear(),
              Number(month) - 1,
              Number(day),
              Number(hour),
              Number(minute),
              0,
              0
            );

            const pad = (n: number, len = 2) => String(n).padStart(len, '0');
            return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ` +
                  `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
          },
        },
      },
      y: {
        stacked,
        beginAtZero: true,
        grid: { color: "rgba(0,0,0,0.08)" },
        ticks: {
          callback: (val) => Intl.NumberFormat().format(Number(val)),
        },
      },
    },
    animation: { duration: 600 },
  }), [stacked, horizontal]);

  return (
    <div className='mt-5'
      style={{
        height: height,
        background: '#111',
        padding: '20px',
        paddingBottom: '70px',
        borderRadius: '10px',
        marginTop: '20px',
      }}>
      <Flex style={{ justifyContent: 'space-between' }}>
        <h2 style={{ color: 'white' }}>{title} ({displayUnit})</h2>
        {actionButton ? actionButton : null}
      </Flex>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarBasic;