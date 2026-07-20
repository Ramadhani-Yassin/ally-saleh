"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { ArchiveWork } from "@/lib/archive-data";
import {
  getServerWorksSnapshotJSON,
  getWorksSnapshotJSON,
  persistWorks,
  subscribeWorks,
} from "@/lib/archive-data";

export function useArchiveWorks() {
  const json = useSyncExternalStore(
    subscribeWorks,
    getWorksSnapshotJSON,
    getServerWorksSnapshotJSON
  );
  const works = useMemo(() => JSON.parse(json) as ArchiveWork[], [json]);

  const persist = useCallback((next: ArchiveWork[]) => {
    persistWorks(next);
  }, []);

  return { works, persist };
}
