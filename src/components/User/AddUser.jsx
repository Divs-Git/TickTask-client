import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextBox from './../TextBox';
import { useForm } from 'react-hook-form';
import ModalWrapper from './../ModalWrapper';
import { DialogTitle } from '@headlessui/react';
import Loader from './../Loader';
import Button from '../Button';
import { useRegisterMutation } from '../../store/slices/api/authApiSlice';
import { toast } from 'sonner';
import {
  useGetTeamListQuery,
  useUpdateUserMutation,
} from '../../store/slices/api/userApiSlice';
import { setCredentials } from '../../store/slices/authSlice';

const AddUser = ({ open, setOpen, userData }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let defaultValues = userData || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const { refetch } = useGetTeamListQuery();

  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap();

        toast.success('Profile updated successfully');

        if (userData._id === user._id) {
          dispatch(setCredentials({ ...result.user }));
        }
        refetch();
      } else {
        const result = await addNewUser({
          ...data,
          password: data.email,
        }).unwrap();

        toast.success('New user added successful');
      }

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  return (
    <Fragment>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <DialogTitle
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {userData ? 'UPDATE PROFILE' : 'ADD NEW USER'}
          </DialogTitle>
          <div className='mt-2 flex flex-col gap-6'>
            <TextBox
              placeholder='Full name'
              type='text'
              name='name'
              label='Full Name'
              className='w-full rounded'
              register={register('name', {
                required: 'Full name is required!',
              })}
              error={errors.name ? errors.name.message : ''}
            />
            <TextBox
              placeholder='Title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register('title', {
                required: 'Title is required!',
              })}
              error={errors.title ? errors.title.message : ''}
            />
            <TextBox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded'
              register={register('email', {
                required: 'Email Address is required!',
              })}
              error={errors.email ? errors.email.message : ''}
            />

            <TextBox
              placeholder='Role'
              type='text'
              name='role'
              label='Role'
              className='w-full rounded'
              register={register('role', {
                required: 'User role is required!',
              })}
              error={errors.role ? errors.role.message : ''}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loader />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                label='Submit'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </Fragment>
  );
};

export default AddUser;
