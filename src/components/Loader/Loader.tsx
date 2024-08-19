interface LoaderInterface {
  size?: "sm" | "md" | "lg" | "xl";
}

const Loader = ({ size = "sm" }: LoaderInterface) => {
  const baseClasses =
    "border-gray-300 aspect-square animate-spin rounded-full border-t-mainColor";
  const sizeClasses = {
    sm: "h-6 h-6 border-4",
    md: "h-8 h-8 border-6",
    lg: "h-12 w-12 border-8",
    xl: "h-16 w-16 border-8",
  };

  const combinedClasses = [baseClasses, sizeClasses[size]].join(" ");

  return (
    <div className="w-full h-full grid  place-items-center">
      <span className={combinedClasses}></span>
    </div>
  );
};

export default Loader;
