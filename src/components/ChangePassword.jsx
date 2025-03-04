import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useChangePasswordMutation } from '../store/slices/api/userApiSlice';
import { toast } from 'sonner';
import ModalWrapper from './ModalWrapper';
import { DialogTitle } from '@headlessui/react';
import TextBox from './TextBox';
import Loader from './Loader';
import Button from './Button';

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning('Password does not match');
      return;
    }

    try {
      const result = await changeUserPassword(data).unwrap();
      toast.success('New User added successfully');

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || error.message);
    }
  };

  return (
    <Fragment>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <DialogTitle
            as='h2'
            className={'text-base font-bold leading-6 text-gray-900 mb-4'}
          >
            Change Password
          </DialogTitle>
          <div className='mt-2 flex flex-col gap-6'>
            <TextBox
              placeholder='New Password'
              type='password'
              name='password'
              label='New Password'
              className='w-full rounded'
              register={register('password', {
                required: 'New Password is required',
              })}
              error={errors.password ? errors.password.message : ''}
            />
            <TextBox
              placeholder='Confirm New Password'
              type='password'
              name='cpass'
              label='Confirm New Password'
              className='w-full rounded'
              register={register('cpass', {
                required: 'Confirm New Password is required',
              })}
              error={errors.cpass ? errors.cpass.message : ''}
            />
          </div>
          {isLoading ? (
            <div className='py-5'>
              <Loader />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type={'submit'}
                className={
                  'bg-purple-600 px-8 text-sm font-semibold text-white hover:bg-purple-700'
                }
                label={'Save'}
              />

              <button
                type='submit'
                className={
                  'bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                }
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </ModalWrapper>
    </Fragment>
  );
};

export default ChangePassword;
