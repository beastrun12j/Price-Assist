import bannerImg from "../assets/banner.png";

const Banner = () => {
  return (
    <img
      src={bannerImg}
      style={{ width: "100%", height: "auto" }}
      alt="banner"
    />
  );
};

export default Banner;
