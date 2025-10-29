import React from 'react';
import { Button } from '@/components/ui/button';

export default function Navigation({ currentPage, setCurrentPage }) {
  return (
    <nav className="bg-blue-200  mb-6">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Reaction Speed Test</h1>
          <div className="flex gap-2">
            <Button
              variant={currentPage === 'test' ? 'default' : 'white'}
              onClick={() => setCurrentPage('test')}
            >
              Test
            </Button>
            <Button
              variant={currentPage === 'leaderboard' ? 'default' : 'white'}
              onClick={() => setCurrentPage('leaderboard')}
            >
              Leaderboard
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}