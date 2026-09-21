"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { loadIndex, type BibleIndex, type BookMeta, type VersionId } from "./bible";
import { getPref, setPref } from "./db";

type BibleContextValue = {
  index: BibleIndex | null;
  bySlug: Map<string, BookMeta>;
  version: VersionId;
  setVersion: (v: VersionId) => void;
  parallel: boolean;
  setParallel: (v: boolean) => void;
};

const BibleContext = createContext<BibleContextValue | null>(null);

export function BibleProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState<BibleIndex | null>(null);
  const [version, setVersionState] = useState<VersionId>("ara");
  const [parallel, setParallelState] = useState(false);

  useEffect(() => {
    loadIndex().then(setIndex).catch(console.error);
    getPref<VersionId>("version", "ara").then(setVersionState);
    getPref<boolean>("parallel", false).then(setParallelState);
  }, []);

  const setVersion = useCallback((v: VersionId) => {
    setVersionState(v);
    void setPref("version", v);
  }, []);

  const setParallel = useCallback((v: boolean) => {
    setParallelState(v);
    void setPref("parallel", v);
  }, []);

  const bySlug = useMemo(
    () => new Map((index?.books ?? []).map((b) => [b.slug, b])),
    [index],
  );

  const value = useMemo(
    () => ({ index, bySlug, version, setVersion, parallel, setParallel }),
    [index, bySlug, version, setVersion, parallel, setParallel],
  );

  return <BibleContext.Provider value={value}>{children}</BibleContext.Provider>;
}

export function useBible() {
  const ctx = useContext(BibleContext);
  if (!ctx) throw new Error("useBible precisa estar dentro de <BibleProvider>");
  return ctx;
}
