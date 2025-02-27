import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import TextBox from '../components/TextBox';
import Button from '../components/Button';
import { useSelector } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    console.log('submit');
  };

  useEffect(() => {
    user && navigate('/dashboard');
  }, [user]);

  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-gradient-to-br from-gray-100 to-gray-300'>
      <div className='w-full md:w-auto flex gap-0 md:gap-32 flex-col md:flex-row items-center justify-center'>
        {/* Animation Section */}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-6 md:gap-y-12 2xl:-mt-16'>
            <span className='flex gap-2 py-2 px-4 border rounded-full text-sm md:text-base border-gray-400 text-gray-700'>
              Manage all your tasks effortlessly!
            </span>
            <p className='flex flex-col gap-2 text-4xl md:text-6xl 2xl:text-7xl font-extrabold text-center text-purple-700'>
              <span>Cloud-Powered</span>
              <span>Task Organizer</span>
            </p>

            <div>
              <div className='circle rotate-in-up-left'></div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className='w-full md:w-1/3 p-6 flex flex-col justify-center items-center'>
          <form
            onSubmit={submitHandler}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white shadow-lg rounded-xl px-12 pt-16 pb-16'
          >
            <div className=''>
              <p className='text-purple-700 text-3xl font-bold text-center'>
                Welcome Back!
              </p>
              <p className='text-center text-base text-gray-600'>
                Keep all your credentials secure.
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
              <TextBox
                placeholder='abc@example.com'
                type='email'
                name='email'
                label='Email Address'
                className='w-full rounded-lg'
                register={register('email', {
                  required: 'Email address is required!',
                })}
                error={errors.email ? errors.email.message : ''}
              />

              <TextBox
                placeholder='Your Password'
                type='password'
                name='password'
                label='Password'
                className='w-full rounded-lg'
                register={register('password', {
                  required: 'Password is required!',
                })}
                error={errors.password ? errors.password.message : ''}
              />
              <span className='text-sm hover:underline cursor-pointer hover:text-purple-600'>
                Forgot Password?
              </span>

              <Button
                type='submit'
                label='Login'
                className='w-full h-12 bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition-all'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
