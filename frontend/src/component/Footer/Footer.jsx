const Footer = () => {
  return (
    <div className="bg-[rgb(6,12,24)] text-white w-full h-full">
     <div className="p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div>
            <h2 className="text-lg font-semibold mb-2">Giới thiệu</h2>
            <p className="text-sm leading-relaxed">
              Website xem phim miễn phí với chất lượng cao, cập nhật phim mới mỗi ngày.
              Xem không quảng cáo, tốc độ tải nhanh, hỗ trợ đa nền tảng.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Liên hệ</h2>
            <p className="text-sm">Email: hotro@phimhay.vn</p>
            <p className="text-sm">SĐT: 0123 456 789</p>
            <p className="text-sm">Địa chỉ: 123 Đường ABC, Quận Hải Châu, TP.Đà Nẵng</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Hỗ trợ</h2>
            <ul className="text-sm space-y-1">
              <li>FAQ - Câu hỏi thường gặp</li>
              <li>Chính sách bảo mật</li>
              <li>Điều khoản sử dụng</li>
              <li>Báo cáo vi phạm</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Theo dõi chúng tôi</h2>
            <div className="flex justify-center sm:justify-start space-x-4 mt-2">
              <a href="https://facebook.com" className="hover:opacity-80">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" className="hover:opacity-80">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="https://youTube.com" className="hover:opacity-80">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="YouTube" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs opacity-60">
          © 2025 PhimHay. Bản quyền thuộc về Thân Trọng Huy.
        </div>
      </div>
    </div>
  );
};

export default Footer;
