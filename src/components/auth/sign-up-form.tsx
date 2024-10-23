'use client';

import { signUpAction } from '@/lib/auth-actions';
import { useState, useActionState } from 'react';
import { SignUpState } from '@/types/app-types';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export default function SignUpForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isGeneratedUser, setIsGeneratedUser] = useState(false);
  const initialState: SignUpState = { message: null };
  const [state, formAction, isPending] = useActionState(signUpAction, initialState);

  const TOTAL_POKEMONS = 600;

  const generateRandomUser = async () => {
    const randomId = Math.floor(Math.random() * TOTAL_POKEMONS) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const pokemon = await response.json();
    const { name } = pokemon;

    setUser({
      name,
      email: `${name}@gmail.com`,
      password: Math.floor(100000 + Math.random() * 900000).toString(),
    });
    setIsGeneratedUser(true);
  };

  const formErrors = state.errors ? Object.values(state.errors).flat() : [];

  return (
    <>
      <form action={formAction}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={user.name}
              onChange={e => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type={isGeneratedUser ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={e => {
                setUser({ ...user, password: e.target.value });
                setIsGeneratedUser(false);
              }}
            />
          </div>
          {state.message && (
            <div aria-live="polite" aria-atomic="true">
              <p className="mb-2 text-sm text-red-500">{state.message}</p>
              {formErrors.map((error: string) => (
                <p className="mb-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          )}
          <Button type="submit" disabled={isPending}>
            Sign Up
          </Button>
        </div>
      </form>
      <Button variant="outline" className="mt-4 w-full" onClick={generateRandomUser}>
        Generate random user
      </Button>
    </>
  );
}
