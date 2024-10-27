'use client';

import { useCallback, useEffect, useState } from 'react';

export default function useInfiniteScroll<T>({
  fetchDataAction,
  initialData,
  limit,
  refToObserve,
}: {
  fetchDataAction: (params: { offset: number; limit: number }) => Promise<T[]>;
  initialData: T[];
  limit: number;
  refToObserve: React.RefObject<HTMLElement | null>;
}) {
  const [{ data, offset }, setData] = useState<{
    data: T[];
    offset: number;
  }>({
    data: initialData,
    offset: limit,
  });
  const [hasMoreData, setHasMoreData] = useState(true);

  const handleIntersection = useCallback((): void => {
    fetchDataAction({ offset, limit })
      .then(newData => {
        if (newData.length === 0) {
          setHasMoreData(false);
          return;
        }

        setData(prev => ({
          data: [...prev.data, ...newData],
          offset: prev.offset + limit,
        }));
      })
      .catch(error => {
        setHasMoreData(false);
        throw error;
      });
  }, [fetchDataAction, limit, offset]);

  useEffect(() => {
    if (!hasMoreData) {
      return undefined;
    }

    if (limit <= 0) {
      throw new Error('limit should be greater than 0');
    }

    const intersectionCallback = (entries: IntersectionObserverEntry[]): void => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          handleIntersection();
        }
      });
    };

    const observer = new IntersectionObserver(intersectionCallback, {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 1,
    });

    if (refToObserve.current) {
      observer.observe(refToObserve.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [refToObserve, limit, handleIntersection, hasMoreData]);

  return [data, hasMoreData] as const;
}
