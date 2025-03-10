import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Chart = ({ data }) => {
  return (
    <ResponsiveContainer width={'100%'} height={500}>
      <BarChart width={150} height={40} data={data}>
        <XAxis dataKey={'name'} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar
          dataKey='total'
          fill='#8884d8'
          shape={<Rectangle radius={[5, 5, 0, 0]} />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
