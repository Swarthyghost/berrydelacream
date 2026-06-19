"use client";

import { useRouter } from 'next/navigation';
import Login from '../../../../components/Login';

export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <Login onBackToStore={() => router.push('/')} />
  );
}
