'use client';
import Header from "@/app/Component/Header/Header";
import Footer from "@/app/Component/Footer/Footer";
import StarRating from "./star_rating";
import ProductCard from "./ProductFrame_Main";
import Foto from "@/public/img/Product_Main/foto.png";
export default function Product(){
    const products = [
        {
          image: Foto,
          name: 'Product Name 1',
          brand: 'Brand Name 1',
          rating: 4,
          price: 99.99,
          prSalePrice: 99.99
        },
        
        {
            image: Foto,
            name: 'Product Name 2',
            brand: 'Brand Name 2',
            rating: 5,
            price: 79.99,
            prSalePrice: 99.99
          },
          {
            image: Foto,
            name: 'Product Name 2',
            brand: 'Brand Name 2',
            rating: 5,
            price: 79.99,
            prSalePrice: 99.99
          },
          {
            image: Foto,
            name: 'Product Name 2',
            brand: 'Brand Name 2',
            rating: 5,
            price: 79.99,
            prSalePrice: 99.99
          },
          {
            image: Foto,
            name: 'Product Name 2',
            brand: 'Brand Name 2',
            rating: 5,
            price: 79.99,
            prSalePrice: 99.99
          },
          {
            image: Foto,
            name: 'Product Name 2',
            brand: 'Brand Name 2',
            rating: 5,
            price: 79.99,
            prSalePrice: 99.99
          },
        // Add more products as needed
      ];
    return (

        <>
        <Header/>
        <div className="flex">
            {/* FilterSide */}
           <div className="w-1/6 font-k2d   flex flex-col items-center border-r-[1px] border-black ">
                {/* Bộ lọc */}
                <div>
                    <h1 className=" text-lg text-center">Bộ lọc tìm kiếm</h1>
                    {/* Theo loại */}
                    <div className="space-y-3 border-b-[1px] pb-2 ">
                        <div className="text-center">Theo danh mục</div>
                        <div>
                        <input type="checkbox" name="Shampoo" id="Shampoo" className="" />
                            <label htmlFor="Shampoo">Sữa tắm chó mèo</label>
                        </div>
                        <div>
                        <input type="checkbox" name="sand" id="sand" className="" />
                            <label htmlFor="sand">Cát vệ sinh</label>
                        </div>
                        <div>
                        <input type="checkbox" name="sand" id="sand" className="" />
                            <label htmlFor="sand">nước hoa thú cưng</label>
                        </div>
                    </div>
                    {/* Theo brand */}
                    <div className="space-y-3 border-b-[1px] pb-2 ">
                        <div className="text-center">Theo Thương Hiệu</div>
                        <div>
                        <input type="checkbox" name="brand1" id="brand1" className="" />
                            <label htmlFor="brand1">PETSOLA</label>
                        </div>
                        <div>
                        <input type="checkbox" name="brand2" id="brand2" className="" />
                            <label htmlFor="brand2">Calager</label>
                        </div>
                        <div>
                        <input type="checkbox" name="brand3" id="brand3" className="" />
                            <label htmlFor="brand3">Fay</label>
                        </div>
                    </div>
                    {/* Min and max price searching */}
                    <div className="space-y-3 border-b-[1px] pb-2 ">
                        <div className="text-center">Theo giá</div>
                        <div>
                            <input type="text" className="border-[1px] w-20" placeholder="Từ"/>
                            -
                            <input type="text" className="border-[1px] w-20" placeholder="Đến"/>
                        </div>
                        <button className="w-full rounded-md bg-search-button-orange py-2 px-6 font-kd2 text-xs font-bold 
                        uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 
                        focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none 
                        disabled:opacity-50 disabled:shadow-none" data-ripple-light="true" >
                                        Áp dụng
                        </button>
                    </div>
                    {/* rating by stars */}
                    <div className="text-center">Đánh Giá</div>
                    <StarRating/>
                    
                    

                </div>

          
           </div>
           {/* Product side*/}
            <div className="w-5/6  grid grid-cols-3 gap-14 ml-16">
            {products.map((product, index) => (<ProductCard key={index} product={product} />))}
            </div>

        </div>
        <Footer/>
        </>
    )
}