import SignUpForm from '@/components/auth/sign-up-form';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AppLogo } from '@/components/app-logo';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <Card className="w-full md:w-[400px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <AppLogo />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="pb-2 text-center">Sign up to continue</CardDescription>
        <SignUpForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          type="button"
          href="/sign-in"
          className="text-sm font-medium text-primary hover:underline">
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
