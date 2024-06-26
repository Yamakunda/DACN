import { FaStar } from 'react-icons/fa';

const ProductCard = (props: any) => {
  return (
    <div className="flex flex-col border rounded-lg overflow-hidden w-60 transform transition-transform duration-500 hover:scale-110 hover:shadow-lg">      
        {/* Product Image */}
        <div className="w-full flex justify-center items-center">
          <img src={props.product.image.src} alt={props.product.name} className="object-cover w-full " />
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          {/* Product Name */}
          <h2 className="font-semibold font-montserrat">{props.product.name}</h2>

          {/* Brand and Rating */}
          <div className="flex justify-between items-center mt-2">
            <span className="font-extralight text-sm underline italic">{props.product.brand}</span>
            <div className="flex">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <FaStar
                    key={i}
                    color={ratingValue <= props.product.rating ? 'yellow' : 'gray'}
                    size={20}
                  />
                );
              })}
            </div>
          </div>

          {/* Price */}
          <div className="mt-2 flex justify-between">
            <span className="text-lg font-semibold">${props.product.price}</span>
            <span className="text-lg font-semibold text-red-500 line-through ml-2">${props.product.prSalePrice}</span>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;