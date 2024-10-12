"use client";

import {FormEvent} from "react";
import {signIn, SignInResponse} from "next-auth/react";
import {useRouter} from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await signIn('credentials', {
      user: formData.get('user'),
      password: formData.get('password'),
      redirect: false,
    });
    // console.log('haidf');
    console.log({response});
    if(!response?.error) {
      router.push('/');
      router.refresh();
    }
    // console.log('response');
  };

  return (
    <form className="flex flex-col gap-2 mx-auto max-w-md mt-10" onSubmit={handleSubmit}>
      <input name="user" className="border border-black" type="text" />
      <input name="password" className="border border-black" type="password" />
      <button type="submit">Login</button>
    </form>
  )
}
