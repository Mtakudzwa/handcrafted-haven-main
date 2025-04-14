import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Artisan's Touch",
    description: "Skilled hands weave intricate patterns with indigo threads, blending tradition and modern minimalism in a serene studio. Every thread tells a story of dedication and artistry.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Masterful Craftsmanship",
    description: "Discover the beauty of tradition through skilled hands weaving intricate designs on a wooden loom, where natural fibers and indigo threads come together to create timeless artistry.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Timeless Craft",
    description: "Sunlight illuminates the art of pottery as a skilled potter shapes wet clay on a wooden wheel. Surrounded by finished vessels, the workshop captures the essence of craftsmanship and tradition.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Featured Products</p>
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <div className="w-28 h-0.5 bg-teal-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {products.map(({ id, image, title, description }) => (
          <div key={id} className="relative group">
            <Image
              src={image}
              alt={title}
              className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            />
            <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
              <p className="font-medium text-xl lg:text-2xl">{title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60">
                {description}
              </p>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button className="flex items-center gap-1.5 bg-teal-600 px-4 py-2 rounded">
                Buy now <Image className="h-3 w-3" src={assets.redirect_icon} alt="Redirect Icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
