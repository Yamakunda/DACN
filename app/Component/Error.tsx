import { FaExclamationCircle } from 'react-icons/fa';

const ErrorModal = ({ error, setError }: any) => {
  
  const handleClose = () => {
    if (error === "NOT_LOGGED_IN") {
      window.location.href = "/Login";
    } else {
      setError(null);
    }
  };

  if (!error) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        
        {error && (
          <div className="flex flex-col items-center justify-center h-64 w-80">
            <FaExclamationCircle className="text-red-500 text-6xl mb-4 h-32 w-32" />
            {/* Comment Errors */}
            {error == "EMPTY COMMENT" && <p>Comment không được phép rỗng</p>}
            {error == "EMPTY RATING" && <p>Đánh giá không được phép rỗng</p>}
            {error == "NOT_LOGGED_IN_COMMENT" && <p>Bạn phải đăng nhập để bình luận</p>}
            {/* Product Filter Error */}
            {error == "INVALID_PRICE_RANGE" && <p>Giá tối thiểu không thể lớn hơn giá tối đa</p>}
        
            {/* Cart Errors */}
            {error=="NOT_LOGGED_IN_CART"&& <p>Bạn cần đăng nhập để mua sản phẩm</p>}
            {/* Not log in errors */}
            {error=="NOT_LOGGED_IN"&& <p>Bạn cần đăng nhập xem trang này</p>}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleClose}
            >
              Hoàn tất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorModal;