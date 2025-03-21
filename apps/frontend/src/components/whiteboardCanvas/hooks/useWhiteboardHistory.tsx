import { useEffect, useState } from "react";

export const useWhiteboardHistory = (whiteboardId: string | null) => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!whiteboardId) return;

    const fetchHistory = async () => {
      try {
        const url = new URL(import.meta.env.VITE_BACKEND_BASE_URL);
        url.pathname = `/whiteboard/${whiteboardId}/history`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const historyResponse = await response.json();

        setHistory(
          historyResponse.map((whiteboardEvent: any) => whiteboardEvent.payload)
        );
      } catch (err: any) {
        console.error("Failed to fetch history:", err);
      }
    };

    fetchHistory();
  }, [whiteboardId]);

  return history;
};
