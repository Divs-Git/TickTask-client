import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from 'react-icons/md';
import { FaNewspaper, FaUsers } from 'react-icons/fa';
import { GrInProgress } from 'react-icons/gr';
import { FaArrowsToDot } from 'react-icons/fa6';
import moment from 'moment';
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from '../utils';
import { summary } from '../data/data';
import clsx from 'clsx';

const Card = ({ icon, bg, label, count }) => {
  return (
    <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
      {/* Card Record label */}
      <div className='h-full flex flex-1 flex-col justify-between'>
        <p className='text-base text-gray-600'>{label}</p>
        <span className='text-2xl font-semibold'>{count}</span>
        <span className='text-sm text-gray-400'>{'110 last month'}</span>
      </div>

      <div
        className={clsx(
          'w-10 h-10 rounded-full flex items-center justify-center text-white',
          bg
        )}
      >
        {icon}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const totals = summary.tasks;

  const stats = [
    {
      _id: '1',
      label: 'TOTAL TASK',
      total: summary?.totalTasks || 0,
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
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ label, total, icon, bg }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
