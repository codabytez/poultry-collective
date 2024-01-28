export const LoadingSkeleton = () => {
  return (
    <div className="w-96 p-6 space-y-4 backdrop-blur-lg">
      <div className="h-64 bg-gray-300 animate-loading-pulse bg-gradient-animation bg-200"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 w-3/4 animate-loading-pulse bg-gradient-animation bg-200"></div>
        <div className="h-4 bg-gray-300 animate-loading-pulse bg-gradient-animation bg-200"></div>
      </div>
      <div className="h-10 bg-gray-300 animate-loading-pulse bg-gradient-animation bg-200"></div>
    </div>
  );
};
