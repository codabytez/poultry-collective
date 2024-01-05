export const LoadingSkeleton = () => {
  return (
    <div className="w-96 p-6 space-y-4 animate-pulse backdrop-blur-lg">
      <div className="h-64 bg-gray-300 rounded"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  );
};
