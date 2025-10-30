const BASE_URL = "https://reaction-speed-test.onrender.com";

export const postScore = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/leaderboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: data.name, score: data.time }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Backend not available, score not saved');
    // Don't throw error, just log it
    return { success: false, error: 'Backend unavailable' };
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await fetch(`${BASE_URL}/leaderboard`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Backend not available, using empty leaderboard');
    // Return empty array when backend is down
    return [];
  }
};