const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Bảng điều khiển</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Người dùng</h2>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Phim đã đăng</h2>
          <p className="text-3xl font-bold text-green-600">45</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Lượt xem hôm nay</h2>
          <p className="text-3xl font-bold text-purple-600">789</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Hoạt động gần đây</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-700">Phim "Avengers" được thêm</span>
            <span className="text-sm text-gray-500">2 giờ trước</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-700">User mới đăng ký</span>
            <span className="text-sm text-gray-500">4 giờ trước</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-700">Cập nhật hệ thống</span>
            <span className="text-sm text-gray-500">1 ngày trước</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;