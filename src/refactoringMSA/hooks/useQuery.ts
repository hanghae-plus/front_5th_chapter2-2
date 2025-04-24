import { useEffect, useState, useSyncExternalStore } from 'react';

const cache = new Map<string, { data: any; time: number }>();
let listeners: (() => void)[] = [];

const subscribe = (listener: () => void) => {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};

const notify = () => {
  listeners.forEach((listener) => listener());
};

export type queryOptions = {
  cacheTime?: number;
};

export function useCustomQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  options?: queryOptions,
) {
  const cacheTime = options?.cacheTime || 1000 * 60 * 5;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const cachedData = cache.get(key);
    if (cachedData && Date.now() - cachedData.time < cacheTime) {
      setData(cachedData.data);
      return;
    }

    setLoading(true);
    try {
      const result = await queryFn();
      cache.set(key, { data: result, time: Date.now() });
      setData(result);
      setError(null);
      notify();
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const invalidate = (key: string) => {
    cache.delete(key);
    notify();
  };

  useEffect(() => {
    fetchData();
  }, [key]);

  const refetch = () => {
    fetchData();
  };

  const snapshot = useSyncExternalStore(
    subscribe,
    () => data,
    () => null,
  );

  return {
    data: snapshot,
    refetch,
    error,
    loading,
    invalidate,
  };
}
