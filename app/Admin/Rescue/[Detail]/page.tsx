'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import axios from '@/api/axios';
import { useRouter } from 'next/navigation';
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function RescueDetail({ params }: { params: { Detail: string } }) {
  const rescueId = params.Detail;
  const [data, setData] = useState<any>({});
  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchRescueData = async (id: any) => {
      try {
        const response = await axios.get(`/rescueRequest/${rescueId}`);
        const rescueData = response.data;
        setData(rescueData.rescue);
        // const log = await axios.post(`/test`, rescueData.rescue);
      } catch (error) {
        console.error('Error fetching rescue data:', error);
      }
    };
    if (rescueId) {
      fetchRescueData(rescueId);
    }
  }, [rescueId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleImage = (e: any) =>{
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
}

const setFileToBase = (file: any) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
        setData( {...data, image: reader.result as string});
    }
}
  const handleSaveClick = () => {
    const updateRescueData = async (id: any) => {
      try {
        const response = await axios.put(`/rescueRequest/${rescueId}`,data);
      } catch (error) {
        console.error('Error fetching rescue data:', error);
      }
    };
      updateRescueData(data);
    
    router.push('/Admin/Rescue');
  };

  const handleChangeClick = async () => {
    setIsEditable(true);
    // const log = await axios.post(`/test`, data);
  };

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <Header />
      <div className='flex w-full'>
        <Sidebar />
        <div className='w-3/4 border-l-2 border-gray-200'>
          <div className={'flex font-nunito text-xl font-bold w-full justify-center'}>
            Thông tin cứu hộ
          </div>
          <form className="w-full mx-4" key={data._id}>
          {/* <form className="w-full mx-4" > */}
            <div className="flex flex-wrap -mx-3 mb-6 space-y-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <label className="text-xs font-bold mb-2" htmlFor="user_name">
                  Tên người gửi
                </label>
                <input
                  className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="user_name"
                  type="text"
                  value={data.user_name}
                  // onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>

              <div className='flex w-full'>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="location">
                    Địa điểm cứu hộ
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="location"
                    type="text"
                    value={data.location}
                    // onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
                <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="contactPhone">
                    SĐT liên lạc
                  </label>
                  <input
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="contactPhone"
                    type="text"
                    value={data.contactPhone}
                    // onChange={handleInputChange}
                    disabled={!isEditable}
                  />
                </div>
              </div>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="image">
                  Hình ảnh
                </label>
                
                {data.image && (
                  <img
                    className="mt-4"
                    src={data.image}
                    alt="Database Image"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                )}

              </div>
              <div className='flex w-full'>
              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="message">
                  Lời nhắn
                </label>
                <textarea
                  className="block w-full h-24 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="message"
                  value={data.message}
                  // onChange={handleInputChange}
                  disabled={!isEditable}
                ></textarea>
              </div>
               
 

              </div>


              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="RequestTime">
                  Ngày yêu cầu
                </label>
                <div className="block w-1/2 border border-gray-200 rounded-lg py-2 px-4">
                    {formatDate(data.RequestTime)}
                </div>
              </div>

              <div className="w-full px-3">
                <label className="text-xs font-bold mb-2" htmlFor="employeeName">
                  Nhân viên xử lý
                </label>
                <input
                  className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                  id="employeeName"
                  type="text"
                  value={data.employeeName}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="w-full px-3">
                  <label className="text-xs font-bold mb-2" htmlFor="requestStatus">
                    Trạng thái
                  </label>
                  <select
                    className="block w-6/12 border border-gray-200 rounded-lg py-2 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
                    id="requestStatus"
                    value={data.requestStatus}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="Chưa xử lý">Chưa xử lý</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã xử lý">Đã xử lý</option>

                  </select>
                </div>
              
                


            </div>
          </form>
          <div className='flex items-center justify-center w-full space-x-4'>
            <button onClick={handleChangeClick} className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Cập nhật trạng thái
            </button>
            <button onClick={handleSaveClick} className="bg-[#1286CE] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Lưu
            </button>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default RescueDetail;

