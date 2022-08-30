const Loader = () => {
  return (
    <div className="flex relative top-0 left-0 justify-center items-center w-full h-screen bg-gray-300">
      <div className="w-[80px] h-[80px] relative">
        <span className="w-full h-full rounded-full bg-[#081828] block absolute top-0 left-0 animate-pingFast"></span>
        <span className="w-full h-full rounded-full bg-[#0167f3] block absolute top-0 left-0 animate-pingSlow"></span>
      </div>
    </div>
  );
};
export default Loader;
