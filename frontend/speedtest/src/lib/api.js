const BASE_URL = "http://localhost:3001";

export const postScore = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/api/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
    const response = await fetch(`${BASE_URL}/api/scores`);
    
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