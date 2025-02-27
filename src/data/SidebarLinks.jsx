import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from 'react-icons/md';
import { FaTasks, FaTrashAlt, FaUsers } from 'react-icons/fa';

const linkData = [
  {
    label: 'Dashboard',
    link: 'dashboard',
    icon: <MdDashboard />,
  },
  {
    label: 'Tasks',
    link: 'tasks',
    icon: <FaTasks />,
  },
  {
    label: 'Completed',
    link: 'completed/completed',
    icon: <MdTaskAlt />,
  },
  {
    label: 'In Progress',
    link: 'in-progress/in progress',
    icon: <MdOutlinePendingActions />,
  },
  {
    label: 'To Do',
    link: 'todo/todo',
    icon: <MdOutlinePendingActions />,
  },
  {
    label: 'Team',
    link: 'team',
    icon: <FaUsers />,
  },
  {
    label: 'Trash',
    link: 'trashed',
    icon: <FaTrashAlt />,
  },
];

export { linkData };
