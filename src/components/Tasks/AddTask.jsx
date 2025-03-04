import { DialogTitle } from '@headlessui/react';
import ModalWrapper from '../ModalWrapper';
import TextBox from '../TextBox';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import UserList from './UserList';
import SelectList from './SelectList';
import Button from '../Button';
import { BiImages } from 'react-icons/bi';
import {
  useCreateTaskMutation,
  useGetAllTaskQuery,
} from '../../store/slices/api/taskApiSlice';
import { toast } from 'sonner';
import { dateFormatter } from '../../utils';

const LISTS = ['TODO', 'IN PROGRESS', 'COMPLETED'];
const PRIORITY = ['HIGH', 'MEDIUM', 'NORMAL', 'LOW'];

const AddTask = ({ open, setOpen, task }) => {
  const defaultValues = {
    title: task?.title || '',
    date: dateFormatter(task?.date || new Date()),
    team: [],
    stage: '',
    priority: '',
    assets: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORITY[2]
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useCreateTaskMutation();

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  const submitHandler = async (data) => {
    try {
      const newData = {
        ...data,
        assets,
        team,
        stage,
        priority,
      };

      const res = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();

      toast.success(res.message);

      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle
          as='h2'
          className='text-base font-bold leading-6 text-gray-900 mb-4'
        >
          {task ? 'UPDATE TASK' : 'ADD TASK'}
        </DialogTitle>

        <div className='mt-2 flex flex-col gap-6'>
          <TextBox
            placeholder='Task Title'
            type='text'
            name='title'
            label='Task Title'
            className='w-full rounded'
            register={register('title', { required: 'Title is required' })}
            error={errors.title ? errors.title.message : ''}
          />

          <UserList team={team} setTeam={setTeam} />

          <div className='flex gap-4'>
            <SelectList
              label='Task Stage'
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />

            <div className='w-full'>
              <TextBox
                placeholder='Date'
                type='date'
                name='date'
                label='Task Date'
                className='w-full rounded'
                register={register('date', {
                  required: 'Date is required!',
                })}
                error={errors.date ? errors.date.message : ''}
              />
            </div>
          </div>

          <div className='flex gap-4'>
            <SelectList
              label='Priority Level'
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />

            <div className='w-full flex items-center justify-center mt-4'>
              <label
                className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                htmlFor='imgUpload'
              >
                <input
                  type='file'
                  className='hidden'
                  id='imgUpload'
                  onChange={(e) => handleSelect(e)}
                  accept='.jpg, .png, .jpeg'
                  multiple={true}
                />
                <BiImages />
                <span>Add Assets</span>
              </label>
            </div>
          </div>

          <div className='bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4'>
            {uploading ? (
              <span className='text-sm py-2 text-red-500'>
                Uploading assets
              </span>
            ) : (
              <Button
                label='Submit'
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
              />
            )}

            <Button
              type='button'
              className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddTask;
