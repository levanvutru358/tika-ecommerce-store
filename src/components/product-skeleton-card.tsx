import { Skeleton } from "./ui/skeleton";

export const ProductSkeletonCard = () => (
  <div className="w-full max-w-sm rounded-2xl border shadow-sm p-4 space-y-3">
    <Skeleton className="w-full h-56 rounded-lg" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-3 w-full" />
    <Skeleton className="h-3 w-2/3" />
    <div className="flex justify-between mt-2">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-20" />
    </div>
    <Skeleton className="h-10 w-full rounded-md" />
  </div>
);
