import DataLoader from "dataloader";

export function createDataloader<K, V>(
  batchFn: (keys: readonly K[]) => Promise<V[]> | V[],
  options?: { cache?: boolean }
): DataLoader<K, V> {
  return new DataLoader<K, V>(async (keys) => batchFn(keys), {
    cache: options?.cache ?? true,
    maxBatchSize: 100,
  });
}
