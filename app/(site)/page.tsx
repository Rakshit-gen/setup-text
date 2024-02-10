import Image from 'next/image'
import AuthForm from './components/AuthForm';


export default function Home() {
    return (
      <div className='flex min-h-full flex-col justify-center py-12 lg:px-8 sm:px-6 bg-gray-200'>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image alt='logo' height='56' width='56'
        className='mx-auto w-auto' src='/images/logo.png' />
        <h2 className='mt-2 text-center text-3xl font-bold tracking-light text-sky-700'>
            Sign In to your account
        </h2>
      </div>
      <AuthForm></AuthForm>
      </div>
    );
  }
  