function LoadingScreen({ t }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="flex gap-2">
        <span
          className="text-4xl animate-bounce"
          style={{ animationDelay: "0ms" }}
        >
          🍿
        </span>
        <span
          className="text-4xl animate-bounce"
          style={{ animationDelay: "150ms" }}
        >
          🍿
        </span>
        <span
          className="text-4xl animate-bounce"
          style={{ animationDelay: "300ms" }}
        >
          🍿
        </span>
      </div>
      <p className="mt-6 text-lg font-medium" style={{ color: "#3D2C2C" }}>
        {t.loading}
      </p>
    </div>
  );
}

export default LoadingScreen;
