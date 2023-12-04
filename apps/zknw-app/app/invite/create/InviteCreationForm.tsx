'use client';

import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export const InviteCreationForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const skillsRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);

  const [creating, setCreating] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event);
    const name = nameRef.current?.value;
    const age = ageRef.current?.value
      ? Number(ageRef.current?.value)
      : undefined;
    const skills = skillsRef.current?.value;
    const bio = bioRef.current?.value;

    setCreating(true);

    setTimeout(() => setCreating(false), 2000);
    event.preventDefault();
  };
  return (
    <div className='relative'>
      {creating && <div className='absolute w-full h-full flex items-center justify-center'>
          <div className='w-8 h-8 neon-fuchsia rounded-full animate-ping'></div>
        </div>}
      <form
        className={twMerge(
          'flex flex-col gap-8 py-16 transition-all duration-[350ms]',
          creating ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        )}
        onSubmit={handleSubmit}
      >
        <input
          disabled={creating}
          ref={nameRef}
          className="bg-transparent border-b border-slate-800 placeholder:text-slate-600 outline-none focus:border-slate-300 p-4 text-lg"
          placeholder="Real name?"
        />
        <input
          disabled={creating}
          ref={ageRef}
          type="number"
          className="bg-transparent border-b border-slate-800 placeholder:text-slate-600 outline-none focus:border-slate-300 p-4 text-lg"
          placeholder="Age?"
        />

        <input
          disabled={creating}
          ref={skillsRef}
          className="bg-transparent border-b border-slate-800 placeholder:text-slate-600 outline-none focus:border-slate-300 p-4 text-lg"
          placeholder="Skills?"
        />
        <textarea
          disabled={creating}
          ref={bioRef}
          className="bg-transparent border-b border-slate-800 placeholder:text-slate-600 outline-none focus:border-slate-300 p-4 text-lg"
          placeholder="Bio?"
        />
        <button
          disabled={creating}
          type="submit"
          className="bg-fuchsia-500 shadow-none hover:bg-fuchsia-400 hover:neon-fuchsia hover:scale-105 transition-all text-white font-bold py-4 px-8 text-2xl rounded-xl"
        >
          Invite
        </button>
      </form>
    </div>
  );
};
