'use server';

import { SignUpUser } from '@/schemas/auth-schemas';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { db } from './kysely';

export type SignUpState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message: string | null;
};

export async function signInAction(
  prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    return await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }

    throw error;
  }
}

export async function signUpAction(
  prevState: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  const validatedFields = SignUpUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to sign up.',
    };
  }

  const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10);
  const data = {
    email: validatedFields.data.email,
    password: hashedPassword,
    name: validatedFields.data.name,
  };

  try {
    await db.insertInto('users').values(data).execute();

    return await signIn('credentials', {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirectTo: '/dashboard',
    });
  } catch (error: any) {
    if (error.message === 'duplicate key value violates unique constraint "users_email_key"') {
      return {
        message: 'Email already exists.',
      };
    }

    throw error;
  }
}
