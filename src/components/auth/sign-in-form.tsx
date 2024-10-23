'use client';

import { useActionState } from 'react';
import { signInAction } from '@/lib/auth-actions';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function SignInForm() {
  const [errorMessage, formAction, isPending] = useActionState(signInAction, undefined);

  return (
    <form action={formAction}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Email</Label>
          <Input id="name" name="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Password</Label>
          <Input type="password" name="password" placeholder="Enter your password" />
        </div>
        {errorMessage && (
          <div aria-live="polite" aria-atomic="true">
            <p className="mb-2 text-sm text-red-500">{errorMessage}</p>
          </div>
        )}
        <Button type="submit" aria-disabled={isPending}>
          Sign In
        </Button>
      </div>
    </form>
  );
}
