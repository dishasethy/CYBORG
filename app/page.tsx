'use client';

import { useState } from 'react';
import App from "@/src/App";
import Loader from "./loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} durationMs={5000} />;
  }

  return <App />;
}
