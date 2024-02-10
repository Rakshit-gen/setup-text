"use client";

import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/app/components/Input/Input'
import Button from '@/app/components/Button'
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle  } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    if(session?.status === 'authenticated'){
      console.log('Authenticated')
      router.push('/users')
    }
  }, [session?.status, router])


  const toggleVariant = useCallback(()=>{
    if(variant === 'LOGIN'){
        setVariant('REGISTER')

    } else{
        setVariant('LOGIN')
    }
  },[variant]);
  const {
    register,
    handleSubmit,
    formState:{
        errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
        name:'',
        email:'',
        password:''    
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
  setLoading(true);

  if(variant === 'REGISTER'){
    axios.post('/api/register',data)
    .catch(()=>toast.error('You got an error'))
    .finally(()=>setLoading(false))
  }
  if(variant === 'LOGIN'){
    signIn('credentials',{...data, redirect:false})
    .then(()=>signIn('credentials',data))
    .then((callback)=>{
      if (callback?.error){
        toast.error('Invalid Credentials')
        setLoading(false)
      }
      if(callback?.ok && !callback?.error){
        toast.success('Logged In')
        setLoading(false)
        router.push('/users')
      }

    })
  }
  }
  const socialAction = (action:string)=>{
    setLoading(true)
    signIn(action, { redirect:false })
    .then((callback)=>{
      if (callback?.error){
        toast.error('Invalid Credentials')
      }
      if(callback?.ok && !callback?.error){
        toast.success('Logged In!')
      }
    })
    .finally(()=>setLoading(true))
  }
  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-sky-100 px-4 py-8 shadow sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                {variant === 'REGISTER' && (
                <Input id="name" label='Name' register={register} errors={errors} disabled={loading} />
                )}
                 <Input id="email" label='Email Address' type='email' register={register} errors={errors} disabled={loading} />
                 <Input id="password" label='Password' type='password' register={register} errors={errors} disabled={loading} />
            <div>
                <Button disabled={loading}
                fullWidth type='submit'>{variant === 'REGISTER' ? 'Register' : 'Sign In'}</Button>
            </div>
            </form>
            <div className='mt-6'>
                <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300' />

                    </div>
                    <div className='relative flex justify-center text-sm'>
                        <span className='bg-white px-2 text-gray-600'>
                            or continue with
                        </span>
                    </div>
                </div>
                    <div className='mt-6 flex gap-2'>
                    <AuthSocialButton 
                    icon={BsGithub} 
                    onClick={() => socialAction('github')} 
            />
                    <AuthSocialButton 
                    icon={BsGoogle} 
                    onClick={() => socialAction('google')} 
            />
            
                    </div>

            </div>
            <div 
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'} 
          </div>
          <div 
            onClick={toggleVariant} 
            className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
          </div>
        </div>
    </div>
  )
}

export default AuthForm