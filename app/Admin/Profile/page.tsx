'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Admin/sidebar';
import Header from '@/app/Admin/Header';
import axios from '@/api/axios';
import getInfo from '@/hooks/getInfo';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function Profile() {
    const [data, setData] = useState<any>({
        avatar: {
            public_id: '',
            url: ''
        },
        _id: '',
        userName: null,
        email: '',
        password: '',
        phone: null,
        address: null,
        gender: null,
        birthday: null,
        token: [],
        role: 'user',
    });

    const fetchData = async () => {
        const Data = await getInfo();
        setData(Data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = () => {
        const updateProfile = async () => {
            try {
                const response = await axios.put(`/account`, data);
                alert('Cập nhật thông tin thành công');
                window.location.reload();
            } catch (error) {
                console.error('Error update account data:', error);
            }
        };
        updateProfile();
    };

    const handleImage = (e: any) => {
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    };

    const setFileToBase = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setData({ ...data, avatar: { public_id: "null", url: reader.result as string } });
        };
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput')?.click();
    };

    return (
        <div className='flex flex-col w-full justify-center items-center'>
{
    data.avatar.url ? (
        <Header avatar={data.avatar.url} />
    ) : (
        <Header />
    )
}
            <div className='flex w-full'>
                <Sidebar />
                <div className='w-3/4 border-l-2 border-gray-200'>
                    <div className='flex flex-col ml-8'>
                        <div className={'flex font-nunito text-xl font-bold w-full justify-center'}>
                            Hồ sơ nhân viên
                        </div>
                        <div className="flex py-2">
                            {/* Left */}
                            <div className="flex-grow flex-col mr-8">

                                <div className="flex items-center my-4">
                                    <div className="font-nunito w-1/4">Tên hiển thị</div>
                                    <input type="text" value={data.userName ? data.userName : ""} className="p-2 pl-4 font-nunito 
                                rounded border border-gray-300 w-full text-lg" onChange={e => setData({ ...data, userName: e.target.value })} placeholder="Chưa có" />
                                </div>
                                <div className="flex items-center my-4">
                                    <div className="font-nunito w-1/4">Email</div>
                                    <input type="text" defaultValue={data.email ? data.email : ""} className="p-2 pl-4 font-nunito 
                                rounded border border-gray-300 w-full text-lg"
                                        // onChange={e => setData({ ...data, email: e.target.value })} 
                                        placeholder="Chưa có" />
                                </div>
                                <div className="flex items-center my-4">
                                    <div className="font-nunito w-1/4">Address</div>
                                    <input type="text" defaultValue={data.address ? data.address : ""} className="p-2 pl-4 font-nunito 
                                rounded border border-gray-300 w-full text-lg"
                                        onChange={e => setData({ ...data, address: e.target.value })}
                                        placeholder="Chưa có" />
                                </div>
                                <div className="flex items-center my-4">
                                    <div className="font-nunito w-1/4">Số điện thoại</div>
                                    <input type="text" value={data.phone ? data.phone : ""} className="p-2 pl-4 font-nunito 
                                rounded border border-gray-300 w-full text-lg" onChange={e => setData({ ...data, phone: e.target.value })} placeholder="Chưa có" />
                                </div>
                                <div className="flex items-center my-4">
                                    <div className="font-nunito w-1/4">Giới tính</div>
                                    <div className="flex items-center">
                                        <input type="radio" id="male" name="gender" value="male" checked={data.gender === "male"}
                                            onChange={e => setData({ ...data, gender: e.target.value })}
                                        />
                                        <label htmlFor="male" className="ml-2">Nam</label>
                                    </div>
                                    <div className="flex items-center ml-8">
                                        <input type="radio" id="female" name="gender" value="female" checked={data.gender === "female"}
                                            onChange={e => setData({ ...data, gender: e.target.value })}
                                        />
                                        <label htmlFor="female" className="ml-2">Nữ</label>
                                    </div>
                                    <div className="flex items-center ml-8">
                                        <input type="radio" id="other" name="gender" value="other" checked={data.gender === "other"}
                                            onChange={e => setData({ ...data, gender: e.target.value })}
                                        />
                                        <label htmlFor="other" className="ml-2">Khác</label>
                                    </div>
                                </div>
                                <div className="flex items-center my-4">
                                    <div className="font-nunito w-1/4">Ngày sinh</div>
                                    <DatePicker
                                        selected={data.birthday ? new Date(data.birthday) : new Date()}
                                        onChange={(birthday: Date) => {
                                            setData({ ...data, birthday: birthday });
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        className="p-2 pl-4 font-nunito rounded border border-gray-300 text-lg w-full"
                                    />
                                </div>
                                <div className="flex flex-col items-center mt-8">
                                    <button type="submit" className="bg-[#EDB24E] text-white font-nunito p-2 text-xl rounded w-1/3" onClick={handleSave}>Lưu</button>
                                </div>
                            </div>
                            {/* Line */}
                            <div className="border-l-2 border-gray-300 mx-4 my-8"></div>
                            {/* Right */}
                            <div className="flex flex-col w-1/3 items-center justify-center">
                                <div className="flex flex-col items-center mt-8 w-full">
                                    <img loading="lazy" src={data.avatar.url ? data.avatar.url : "https://res.cloudinary.com/dzm879qpm/image/upload/v1724509562/defautProduct_mlmwsw.png"}
                                        alt='Avatar' className="w-24 h-24 rounded-full mr-4 mb-4" />
                                    <input type="file" id="fileInput" accept="image/*" onChange={handleImage} className="mb-4 hidden" />
                                    <button type="submit" className="bg-[#EDB24E] text-white font-nunito p-1 text-lg rounded w-1/2" onClick={triggerFileInput}>Thay đổi Avatar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile