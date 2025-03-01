import moment from 'moment';
import { TASKTYPEICON } from '../../../data/Tasks';

const Card = ({ item }) => {
  return (
    <div className='flex space-x-4'>
      <div className='flex flex-col items-center flex-shrink-0'>
        <div className='w-10 h-10 flex items-center justify-center'>
          {TASKTYPEICON[item.type]}
        </div>
        <div className='w-full flex items-center justify-center min-h-[40px] flex-1'>
          <div className='w-px bg-gray-300 h-full flex-shrink-0' />
        </div>
      </div>

      <div className='flex flex-col gap-y-1 mb-8'>
        <p className='font-semibold'>{item.by.name}</p>

        <div className='text-gray-500 space-y-2'>
          <span className='capitalize'>{item.type}</span>
          <span className='text-sm'>{moment(item.date).fromNow()}</span>
        </div>

        <div className='text-gray-700'>{item.activity}</div>
      </div>
    </div>
  );
};

export default Card;
