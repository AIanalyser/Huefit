export default function LoadingState({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="relative w-10 h-10">
        <span
          className="absolute inset-0 rounded-full border-2 animate-spin"
          style={{ borderColor: "rgba(120,100,80,0.15)", borderTopColor: "#7C6A5A" }}
        />
      </div>
      {message && (
        <p className="text-xs font-medium" style={{ color: "#8A837C" }}>
          {message}
        </p>
      )}
    </div>
  );
}
