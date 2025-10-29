
import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await getLeaderboard();
      setPlayers(data || []);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto mt-6 p-4 shadow">
      <CardContent>
        <h2 className="text-xl font-semibold text-center mb-4">🏁 Leaderboard</h2>
        <div className="space-y-2">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading leaderboard...</p>
            </div>
          ) : players.length === 0 ? (
            <p className="text-center text-gray-500">No scores yet.</p>
          ) : (
            players.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={p.image} />
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {i + 1}. {p.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Tests: {p.testCount}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-blue-600">{p.bestTime} ms</p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
