function Loader({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center mt-16 flex-col gap-4">
      <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white text-lg">{message}</p>
    </div>
  );
}

export default Loader;
