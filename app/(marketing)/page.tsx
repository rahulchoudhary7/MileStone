import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MarketingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 px-4 py-8">
      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-center bg-white/5 backdrop-blur-sm p-4 rounded-full mb-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 mr-2 text-white"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
          <span className="text-white font-medium text-sm md:text-base">No. 1 Task Management</span>
        </div>

        <h1 className="text-white text-center text-5xl md:text-8xl font-bold mb-6 tracking-tight">
          Empower Your Team with MileStone
        </h1>

        <p className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text text-transparent text-5xl md:text-8xl font-bold text-center mb-12">
          Elevate Productivity
        </p>

        <p className="text-gray-300 text-center text-base md:text-xl max-w-2xl mx-auto mb-16">
          Collaborate seamlessly, manage projects effortlessly, and reach new
          heights of productivity with MileStone - the ultimate project management
          solution for modern teams.
        </p>

        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white hover:from-fuchsia-600 hover:to-indigo-600 transition-colors"
          >
            <Link href={'/sign-up'}>Get MileStone for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;