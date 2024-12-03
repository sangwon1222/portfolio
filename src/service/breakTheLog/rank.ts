async function apiRequest(url: string, options: RequestInit): Promise<any> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return { ok: false, msg: error instanceof Error ? error.message : String(error) };
  }
}

export const getRankApi = () => apiRequest('/api/rank/breakTheLog', { method: 'GET' });

export const registerRankApi = (gamename: string, nickname: string, score: number) =>
  apiRequest('/api/rank', {
    method: 'POST',
    body: JSON.stringify({ gamename, nickname, score }),
  });
