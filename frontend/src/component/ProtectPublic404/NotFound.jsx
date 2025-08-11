const NotFound=()=> {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#191b24] px-4">
      <h1 className="text-9xl font-extrabold text-white">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-white">
        Oops! Trang bạn tìm không tồn tại.
      </h2>
      <p className="mt-2 text-white text-center max-w-md">
        Có thể bạn đã nhập sai địa chỉ hoặc trang này đã bị gỡ bỏ.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Quay về trang chủ
      </a>
    </div>
  );
};

export default NotFound;
