import { useEffect, useState } from "react";
import { TCarFormRow } from "../types";

export function useWebWorker(data: TCarFormRow[]) {
  const [result, setResult] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const worker = new Worker(
      new URL("../carsPriceWorker.ts", import.meta.url),
      {
        type: "module",
      }
    );

    worker.postMessage(data);

    worker.onmessage = (e) => {
      setResult(e.data);
      setLoading(false);
      worker.terminate();
    };

    worker.onerror = (error) => {
      console.error("Worker error:", error);
      setLoading(false);
      worker.terminate();
    };

    return () => {
      worker.terminate();
    };
  }, [data]);

  return { result, loading };
}
