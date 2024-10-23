import SignInForm from '@/components/auth/sign-in-form';
import { Metadata } from 'next';
import Link from 'next/link';
import AppIcon from '@/components/icons/app';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function SignInPage() {
  return (
    <Card className="w-full md:w-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <AppIcon height="28px" />
          <span className="text-[#1c3144]">Axiome</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">Sign in to continue</CardDescription>
        <SignInForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          type="button"
          href="/sign-up"
          className="text-sm font-medium text-primary hover:underline">
          Sign Up
        </Link>
      </CardFooter>
    </Card>
  );
}
