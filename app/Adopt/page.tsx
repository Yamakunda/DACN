"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import Pet_Frame from "../Component/Adopt/Pet_Frame";
import axios from "@/api/axios";
import Paw from "@/public/img/Pet/paw.png";



export default function Product_Main() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [species, setSpecies] = useState(""); // State for species filter
  const [adoptStatus, setAdoptStatus] = useState(""); // State for adoptStatus filter

  interface Pet {
    _id: string;
    image: { url: string[] };
    petName: string;
    gender: string;
    age: string;
    race: string;
    species: string; // Added species field
    vaccinated: boolean;
    adoptStatus: string;
  }

  const [shownProducts, setShownProducts] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`${baseURL}/pet/list`);
        console.log(response.data);
        setShownProducts(response.data.pets);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, []);

  const filteredProducts = shownProducts.filter((pet) => {
    // const status = pet.adoptStatus === "Chưa có chủ";
    const matchesSpecies =
      species === "" || pet.species.toLowerCase() === species.toLowerCase();
    const matchesGender = gender === "" || pet.gender === gender;
    const matchesAge =
      age === "" ||
      (age === "light" && Number(pet.age) < 1) ||
      (age === "medium" && Number(pet.age) >= 1 && Number(pet.age) <= 2) ||
      (age === "heavy" && Number(pet.age) > 2);
    const matchesStatus = adoptStatus === "" || pet.adoptStatus === adoptStatus;
    return matchesSpecies && matchesGender && matchesAge && matchesStatus;
  });

  const AdoptedPet = shownProducts.filter((pet) => {
    const status = pet.adoptStatus === "Đã có chủ";
    // const matchesSpecies = species === "" || pet.species.toLowerCase() === species.toLowerCase();
    return status;
  });

  const RequestedPet = shownProducts.filter((pet) => {
    const status = pet.adoptStatus === "Đang được yêu cầu";
    // const matchesSpecies = species === "" || pet.species.toLowerCase() === species.toLowerCase();
    return status;
  });

  return (
    <>
      <Header></Header>
      <div className="flex flex-col font-montserrat">
        <div className="text-center my-3 font-bold">
          Nhắc nhỏ trước khi nhận nuôi thú cưng
        </div>
        <div className="flex mx-24">
          <div className="mx-auto w-[70%] mr-5">
            Trước khi quyết định nhận nuôi bé chó hay mèo nào, bạn hãy tự hỏi
            bản thân rằng mình đã sẵn sàng để chịu trách nhiệm cả đời cho bé
            chưa, cả về tài chính, nơi ở cũng như tinh thần. Việc nhận nuôi cần
            được sự đồng thuận lớn từ bản thân bạn cũng như gia đình và những
            người liên quan. Xin cân nhắc kỹ trước khi liên hệ với chúng tôi về
            việc nhận nuôi.
            <div className="text-center font-semibold mt-3 text-xl">
              Xem quy trình nhận nuôi tại{" "}
              <span className="text-red-500">đây</span>
            </div>
          </div>
          <div className="mx-auto w-[30%] bg-gray-300 border rounded-xl border-solid border-gray-300">
            <div className="text-center my-3 font-bold">
              Điều kiện nhận nuôi thú cưng
            </div>
            <div className="flex mb-3">
              <img src={Paw.src} alt="" className="mx-2" />
              Có khả năng nuôi dưỡng thú cưng
            </div>
            <div className="flex mb-3">
              <img
                src={Paw.src}
                alt=""
                className="mx-2"
                style={{ width: "25px", height: "25px" }}
              />
              Không sử dụng thú cưng mục đích thương mại
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-7">
          <div className="border-b border-gray-500 w-[80%] my-2 "></div>{" "}
          {/* Horizontal line */}
        </div>

        <div className="mx-auto">
          <div className="text-center text-3xl font-semibold my-5 font-k2d">
            Tìm thú cưng
          </div>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => setSpecies("")}
              className={`transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-full md:w-auto flex justify-center items-center p-3 space-x-4 font-sans font-bold text-white rounded-full shadow-lg bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 ${
                species === "" ? "bg-indigo-500" : ""
              }`}
            >
              <span className="font-montserrat">Tất cả</span>
            </button>

            <button
              onClick={() => setSpecies("Chó")}
              className={`transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-full md:w-auto flex justify-center items-center p-3 space-x-4 font-sans font-bold text-white rounded-full shadow-lg bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 ${
                species === "Chó" ? "bg-indigo-500" : ""
              }`}
            >
              <span className="font-montserrat">Chó</span>
            </button>

            <button
              onClick={() => setSpecies("Mèo")}
              className={`transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 w-full md:w-auto flex justify-center items-center p-3 space-x-4 font-sans font-bold text-white rounded-full shadow-lg bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 ${
                species === "Mèo" ? "bg-indigo-500" : ""
              }`}
            >
              <span className="font-montserrat">Mèo</span>
            </button>
          </div>

          {/* filter */}
          <div className="flex flex-wrap justify-between mt-3 space-x-9">
            <div className="flex space-x-4 items-center">
              <label className="">Giới tính</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              >
                <option value="">Tất cả</option>
                <option value="Đực">Đực</option>
                <option value="Cái">Cái</option>
              </select>
            </div>
            <div className="flex space-x-4 items-center">
              <label className="">Độ tuổi</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              >
                <option value="">Tất cả</option>
                <option value="light">Dưới 1 tuổi</option>
                <option value="medium">1 tuổi-2 tuổi</option>
                <option value="heavy">Trên 2 tuổi</option>
              </select>
            </div>
            <div className="flex space-x-4 items-center">
              <label className="">Trạng thái</label>
              <select
                value={adoptStatus}
                onChange={(e) => setAdoptStatus(e.target.value)}
                className="block w-full mt-2 p-2 border rounded ml-2 flex-[4]"
              >
                <option value="">Tất cả</option>
                <option value="Chưa có chủ">Chưa có chủ</option>
                <option value="Đang được yêu cầu">Đang được yêu cầu</option>
                <option value="Đã có chủ">Đã có chủ</option>
              </select>
            </div>
          </div>
        </div>
        {/* Featured Pet */}
        <div className="mx-40">
          <div className="font-montserrat text-2xl font-semibold my-10 ">
            {/* Các bé thú cưng của cửa hàng */}
            {adoptStatus === "Đã có chủ"
              ? "Các bé đã có chủ"
              : adoptStatus === "Đang được yêu cầu"
              ? "Đang được yêu cầu"
              : adoptStatus === "Chưa có chủ"
              ? "Các bé thú cưng chưa có chủ"
              : "Các bé thú cưng của cửa hàng"}
          </div>
          <div className="flex flex-wrap justify-center mx-auto">
            {filteredProducts.map((pet) => (
              <div
                className="w-1/2 p-4 flex items-center justify-center space-x-4"
                key={pet._id}
              >
                <Pet_Frame
                  pet={pet}
                  // onClick={() => handleChangeClick(pet._id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center mt-7">
          <div className="border-b border-gray-500 w-[80%] my-2 "></div>{" "}
          {/* Horizontal line */}
        </div>

        <div className="">
          <div className="text-center font-semibold mt-3 text-xl">
            Quy trình nhận nuôi thú cưng{" "}
          </div>

          <div className="flex justify-center items-center">
            <ul className="flex flex-col">
              <li>
                1. Tìm hiểu về thú cưng bạn muốn nhận nuôi trên trang web
                BKPetCare
              </li>
              <li>
                2. Điền form thông tin nhận nuôi và chờ nhân viên liên lạc
              </li>
              <li>
                3. Tham gia phỏng vấn nhận nuôi (Online hoặc tại cửa hàng)
              </li>
              <li>
                4. Chuẩn bị cơ sở vật chất, ký giấy tờ nhận nuôi và đóng tiền
                vía để đón bé về.
              </li>
            </ul>
          </div>

          <div className="text-center font-semibold mt-3 text-xl">
            <span className="text-red-500">Lưu ý</span>
          </div>

          <div className="flex justify-center items-center mx-80">
            <ul>
              <li>
                1. Tiền vía mỗi bé sẽ khác nhau tùy thuộc vào tình trạng của bé
                khi cứu cũng như các dịch vụ y tế (tiêm phòng, triệt sản) đã
                thực hiện.
              </li>
              <li>
                2. Tiền vía dùng để trả các khoản chi về y tế trước đây cho bé,
                cũng như để hỗ trợ chi phí chăm sóc, nuôi dưỡng các bé khác tại
                nhà chung.
              </li>
              <li>
                3. Trường hợp không nuôi được tiếp cần trả lại cho Nhóm, không
                tự ý đem cho người khác.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
