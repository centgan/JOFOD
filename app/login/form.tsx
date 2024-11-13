"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type SignInResult = {
  error?: string;
  status?: number;
  ok?: boolean;
};

export default function LoginForm() {
  const [error, setError] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response: SignInResult = (await signIn('credentials', {
      user: formData.get('user'),
      password: formData.get('password'),
      redirect: false,
    })) as SignInResult;

    // console.log({ response });
    // if invalid response then don't go anywhere and just show errors to user
    if (!response.ok) {
      setError(response.error || '');
    } else {
      // push to first dashboard/add-info and then once completed can then push to home page
      router.push('/dashboard/add-info');
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <button onClick={toggleTheme} className="absolute top-4 right-4 p-2 rounded-md text-red-500">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <form className="flex flex-col gap-2 mx-auto max-w-md mt-10 p-5 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <input name="user" className={`border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-black bg-white text-black'} p-2 rounded`} type="text" placeholder="Username" />
        <input name="password" className={`border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-black bg-white text-black'} p-2 rounded`} type="password" placeholder="Password" />
        {error && (
          <p className={`text-red-500`}>{error}</p>
        )}
        <button type="submit" className={`p-2 rounded-md ${isDarkMode ? 'bg-teal-500 text-white' : 'bg-[#023e34] text-white'} hover:opacity-80`}>
          Login
        </button>
      </form>
    </div>
  );
}
