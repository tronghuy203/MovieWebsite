const LoadingOverlay = ({ isFetching }) => {
  if (!isFetching) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-blue-500"></div>
    </div>
  );
};

export default LoadingOverlay;
