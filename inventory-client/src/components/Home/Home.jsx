import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import "./Home.css";
import axios from "../../axios";

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getProducts() {
      await axios
        .get("/api/product/get-products")
        .then((res) => {
          setCategories(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getProducts();
  }, []);

  return (
    <div className="home">
      {categories?.map((categoryData) => (
        <div>
          <div style={{ marginLeft: "18px" }}>
            {/* category name */}
            <p className="product-categoryHeading">{categoryData?.name}</p>
          </div>
          <div>
            <Swiper
              slidesPerView={4}
              spaceBetween={0}
              slidesPerGroup={3}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {categoryData?.products?.map((product) => (
                <SwiperSlide>
                  <div className="product-div">
                    <Product
                      productId={product?._id}
                      name={product?.name}
                      description={product.description}
                      price={product.price}
                      categoryName={categoryData.name}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
