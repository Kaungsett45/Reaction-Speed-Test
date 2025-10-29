import React from 'react';
import ReactionTest from '../components/ReactionTest';

export default function TestPage({ onScoreSubmitted }) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <ReactionTest onFinish={onScoreSubmitted} />
    </div>
  );
}