// 'use client'

import { Inter } from "next/font/google";
import 'tailwindcss/tailwind.css';
import "./globals.scss";
// import {useRouter} from "next/navigation";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export const publicRoutes = [
  '/',
  '/login',
  '/signup'
]

export const adminRoutes = [
  '/admin',
]

export default function RootLayout({ children }) {
  // const navigate = useNavigate();
  // const router = useRouter()

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const url = window.location.pathname;

  //   if (!user && !publicRoutes.includes(url)) {
  //     router.push('/login')
  //     return;
  //   }

  //   const is_locked = user?.is_locked === 'false' ? false : user?.is_locked || false;
  //   if (is_locked && url !== '/banned') {
  //     router.push('/banned')
  //     return;
  //   }

  //   if (user && user.role && publicRoutes.includes(url)) {
  //     router.push('/home')
  //     return;
  //   }x

  //   if(!user && adminRoutes.includes(url)) {
  //     router.push('/home')
  //     return;
  //   }

  // }, [window.location.pathname])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
