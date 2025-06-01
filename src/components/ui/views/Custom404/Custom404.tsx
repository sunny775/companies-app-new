"use client";

import Button from "@/components/ui/atoms/Button";
import { ArrowLeft, Home, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface Custom404Props {
  errorMessage?: string;
}

export function Custom404({ errorMessage }: Custom404Props) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const router = useRouter();

  useEffect(() => {
    /* Random background particles */
    const newParticles: Particle[] = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 4,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const handleGoHome = () => {
    router.push("/companies");
  };

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div
      className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4 transition-colors duration-300"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full bg-purple-600 dark:bg-neon opacity-20 animate-ping`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-200/60 to-purple-300/60 dark:from-gray-800/40 dark:to-gray-700/40 blur-3xl transition-all duration-1000 ease-out" />
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-purple-100/50 to-purple-200/50  dark:from-gray-700/30 dark:to-gray-600/30 blur-3xl transition-all duration-1000 ease-out" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-black to-gray-700 dark:from-gray-200 dark:via-white dark:to-gray-300 animate-pulse">
            404
          </h1>
        </div>

        <div className="absolute -top-12 left-1/4 animate-bounce delay-500">
          <Star className={`w-6 h-6 dark:text-gray-400 text-gray-600`} />
        </div>
        <div className="absolute -top-8 right-1/3 animate-bounce delay-1000">
          <Zap className={`w-8 h-8 dark:text-gray-300 text-gray-700`} />
        </div>

        <div className="mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Oops! Page Not Found</h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {errorMessage ||
              "The page youre looking for seems to have vanished into the digital void. Dont worry though – even the best explorers sometimes take a wrong turn."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button onClick={handleGoHome} size="lg" className="flex items-center justify-center rounded-full">
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Go Home
            <div className="absolute inset-0 rounded-full bg-surfaceopacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>

          <Button
            onClick={handleGoBack}
            variant="outlined"
            size="lg"
            className="flex items-center justify-center rounded-full"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </Button>
        </div>

        <div className="mt-12 text-muted text-sm">Error Code: 404 | Page Not Found</div>
      </div>
    </div>
  );
}
