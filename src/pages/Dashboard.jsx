import { MdAdminPanelSettings } from 'react-icons/md';
import { FaNewspaper } from 'react-icons/fa';
import { GrInProgress } from 'react-icons/gr';
import { FaArrowsToDot } from 'react-icons/fa6';
import { summary } from '../data/data';
import Chart from '../components/Chart';
import TaskTable from '../components/Dashboard/TaskTable';
import UserTable from '../components/Dashboard/UserTable';
import Card from '../components/Dashboard/Card';
import { useGetDashboardStatsQuery } from '../store/slices/api/taskApiSlice';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { data, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className='py-10'>
        <Loader />
      </div>
    );
  }
  console.log(data);

  const totals = data?.tasks;

  const stats = [
    {
      _id: '1',
      label: 'TOTAL TASK',
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: 'bg-[#1d4ed8]',
    },
    {
      _id: '2',
      label: 'COMPLTED TASK',
      total: totals['completed'] || 0,
      icon: <MdAdminPanelSettings />,
      bg: 'bg-[#0f766e]',
    },
    {
      _id: '3',
      label: 'TASK IN PROGRESS ',
      total: totals['in progress'] || 0,
      icon: <GrInProgress />,
      bg: 'bg-[#f59e0b]',
    },
    {
      _id: '4',
      label: 'TODOS',
      total: totals['todo'] || 0,
      icon: <FaArrowsToDot />,
      bg: 'bg-[#be185d]',
    },
  ];
  return (
    <div className='h-full py-4'>
      {/* Dashboard Header */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ label, total, icon, bg }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      {/* Chart*/}
      <div className='bg-white w-full my-16 p-4 rounded shadow-sm'>
        <h4 className='text-xl text-gray-600 font-semibold'>
          Chart By Priority
        </h4>

        <Chart data={data.graphData} />
      </div>

      {/* Task List */}
      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        {/*left */}

        <TaskTable tasks={data.last10Task} />

        {/*right */}
        <UserTable users={data.users} />
      </div>
    </div>
  );
};

export default Dashboard;
