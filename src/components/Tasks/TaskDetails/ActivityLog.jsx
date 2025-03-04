import { useState } from 'react';
import { act_types } from '../../../data/Tasks';
import Card from './Card';
import Button from '../../Button';
import Loader from '../../Loader';
import { usePostTaskActivityMutation } from '../../../store/slices/api/taskApiSlice';
import { toast } from 'sonner';

const ActivityLog = ({ id, activity, refetch }) => {
  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState('');
  const [postActivity, { isLoading }] = usePostTaskActivityMutation();

  const handleSubmit = async () => {
    const acitivityData = {
      type: selected?.toLowerCase(),
      activity: text,
    };
    try {
      const result = await postActivity({
        data: acitivityData,
        id,
      }).unwrap();

      setText('');
      toast.success(result.message);
      refetch();
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
      {/**Activities */}
      <div className='w-full md:w-1/2'>
        <h4 className='text-gray-600 font-semibold text-lg mb-5'>Activities</h4>

        <div className='w-full'>
          {activity.map((el, index) => (
            <Card
              key={index}
              item={el}
              isConnected={index < activity.length - 1}
            />
          ))}
        </div>
      </div>

      {/**Add Activity */}
      <div className='w-full md:1/3'>
        <h4 className='text-gray-600 font-semibold text-lg mb-5'>
          Add Activity
        </h4>
        <div className='w-full flex flex-wrap gap-5'>
          {act_types.map((item) => (
            <div key={item} className='flex gap-2 items-center'>
              <input
                type='checkbox'
                className='w-4 h-4'
                checked={selected === item ? true : false}
                onChange={() => setSelected(item)}
              />
              <p>{item}</p>
            </div>
          ))}
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type ......'
            className='bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500'
          ></textarea>
          {isLoading ? (
            <Loader />
          ) : (
            <Button
              type='button'
              label='Submit'
              onClick={handleSubmit}
              className='bg-purple-600 text-white rounded'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
