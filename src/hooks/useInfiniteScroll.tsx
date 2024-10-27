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
  const [{ data, offset }, setData] = useState({
    data: initialData,
    offset: limit,
  });
  const [hasMoreData, setHasMoreData] = useState(true);

  const handleIntersection = useCallback((): void => {
    fetchDataAction({ offset, limit }).then(newData => {
      if (newData.length === 0) {
        setHasMoreData(false);
        return;
      }

      setData(prev => ({
        data: [...prev.data, ...newData],
        offset: prev.offset + limit,
      }));
    });
  }, [fetchDataAction, limit, offset]);

  useEffect(() => {
    if (!hasMoreData) {
      return undefined;
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
  }, [refToObserve, handleIntersection, hasMoreData]);

  return data;
}
