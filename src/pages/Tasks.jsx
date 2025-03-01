import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { MdGridView } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Title from '../components/Title.jsx';
import { IoMdAdd } from 'react-icons/io';
import Button from '../components/Button';
import Tabs from '../components/Tasks/Tabs';
import TaskTitle from '../components/Tasks/TaskTitle';
import BoardView from '../components/Tasks/BoardView';
import { tasks } from '../data/data.js';
import Table from '../components/Tasks/Table.jsx';
import AddTask from '../components/Tasks/AddTask.jsx';

const TABS = [
  { title: 'Board View', icon: <MdGridView /> },
  { title: 'List View', icon: <FaList /> },
];

const TASK_TYPE = {
  todo: 'bg-blue-600',
  'in progress': 'bg-yellow-600',
  completed: 'bg-green-600',
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params.status || '';

  return loading ? (
    <div className='py-2'>
      <Loader />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : 'Tasks'} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-purple-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>
      <div>
        <Tabs tabs={TABS} setSelected={setSelected}>
          {!status && (
            <div className='w-full flex justify-between gap-4 md:gap-x-4 py-4'>
              <TaskTitle label='To Do' className={TASK_TYPE.todo} />
              <TaskTitle
                label='In Progress'
                className={TASK_TYPE['in progress']}
              />
              <TaskTitle label='Completed' className={TASK_TYPE.completed} />
            </div>
          )}
          {/** 0 -> Board View || 1 -> List View */}
          {selected === 0 ? (
            <BoardView tasks={tasks} />
          ) : (
            <Table tasks={tasks} />
          )}
        </Tabs>
      </div>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
