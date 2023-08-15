import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/banner/banner11.jpg";
import banner2 from "../../../assets/banner/banner16.jpg";
import banner3 from "../../../assets/banner/banner13.jpg";
import banner4 from "../../../assets/banner/banner17.jpg";
import banner5 from "../../../assets/banner/banner19.jpg";
import banner6 from "../../../assets/banner/banner22.jpg";
import Container from "../../../Components/Container/Container";
// import Container from "../../../Components/Container/Container";

const Banner = () => {
  return (
    <Container>
      {" "}
      <Carousel
        showStatus={false}
        showThumbs={false}
        useKeyboardArrows={true}
        //   autoPlay={true}
        //   stopOnHover={false}
        //   renderIndicator={false}
      >
        <div>
          <img
            style={{ height: "600px" }}
            className="object-cover"
            src={banner1}
            alt=""
          />
          <div className="absolute z-10 top-72 bg-slate-800 bg-opacity-40  w-2/3  space-y-5 py-5  ml-28">
            <h2 className="text-lime-500 font-semibold text-5xl">
              A world of your own
            </h2>
            <p className="text-slate-200 text-xl font-semibold">
              Whether art is your passion or profession, you've come to the
              right place.
            </p>
            <button className="btn bg-lime-600 hover:text-slate-800 text-slate-200 border-lime-600">
              Discover
            </button>
          </div>
        </div>
        <div>
          <img
            style={{ height: "600px" }}
            className="object-cover"
            src={banner2}
            alt=""
          />
          <div className="absolute z-10 top-72 bg-slate-800 bg-opacity-40  w-2/3  space-y-5 py-5  ml-28">
            <h2 className="text-lime-200 font-semibold text-5xl">
              Crafted With Heart and Hands
            </h2>
            <p className="text-slate-200 text-xl font-semibold">
              Beyond the pixels and pixels, there's artistry that's felt.
              Explore a selection of crafts that reflect the dedication and
              expertise of artisans. With each piece, you're not just acquiring
              an object – you're embracing a piece of their craft and soul.
            </p>
            <button className="btn bg-lime-600 hover:text-slate-800 text-slate-200 border-lime-600">
              Discover
            </button>
          </div>
        </div>
        <div>
          <img
            style={{ height: "600px" }}
            className="object-cover"
            src={banner3}
            alt=""
          />
          <div className="absolute z-10 top-72 bg-slate-800 bg-opacity-40  w-2/3  space-y-5 py-5  ml-28">
            <h2 className="text-lime-400 font-semibold text-5xl">
              A world of your own
            </h2>
            <p className="text-slate-200 text-xl font-semibold">
              Dreaming of a collection inspired by your personal style?Explore
              your artistic universe and uncover the one made for you.
            </p>
            <button className="btn bg-lime-600 hover:text-slate-800 text-slate-200 border-lime-600">
              Discover
            </button>
          </div>
        </div>
        <div>
          <img
            style={{ height: "600px" }}
            className="object-cover"
            src={banner4}
            alt=""
          />
          <div className="absolute z-10 top-72 bg-slate-800 bg-opacity-40  w-2/3  space-y-5 py-5  ml-28">
            <h2 className="text-lime-400 font-semibold text-5xl">
              Artistry Beyond Boundaries
            </h2>
            <p className="text-slate-200 text-xl font-semibold">
              At the intersection of innovation and tradition lies a world of
              artistic marvels. Immerse yourself in a diverse tapestry of art
              and crafts that push the limits of imagination and craftsmanship,
              reflecting the essence of human ingenuity.
            </p>
            <button className="btn bg-lime-600 hover:text-slate-800 text-slate-200 border-lime-600">
              Discover
            </button>
          </div>
        </div>
        <div>
          <img
            style={{ height: "600px" }}
            className="object-cover"
            src={banner6}
            alt=""
          />
          <div className="absolute z-10 top-72 bg-slate-800 bg-opacity-40  w-2/3  space-y-5 py-5  ml-28">
            <h2 className="text-lime-400 font-semibold text-5xl">
              Artistry Beyond Boundaries
            </h2>
            <p className="text-slate-200 text-xl font-semibold">
              At the intersection of innovation and tradition lies a world of
              artistic marvels. Immerse yourself in a diverse tapestry of art
              and crafts that push the limits of imagination and craftsmanship,
              reflecting the essence of human ingenuity.
            </p>
            <button className="btn bg-lime-600 hover:text-slate-800 text-slate-200 border-lime-600">
              Discover
            </button>
          </div>
        </div>
        <div>
          <img
            style={{ height: "600px" }}
            className="object-cover"
            src={banner5}
            alt=""
          />
          <div className="absolute z-10 top-72 bg-slate-800 bg-opacity-40  w-2/3  space-y-5 py-5  ml-28">
            <h2 className="text-lime-200 font-semibold text-5xl">
              Elevate Your Space with Artistry
            </h2>
            <p className="text-slate-200 text-xl font-semibold">
              Transform your living spaces with the beauty of handcrafted art
              and crafts. From captivating paintings to intricate sculptures,
              our platform connects you with remarkable pieces that add a touch
              of elegance and uniqueness to your surroundings.
            </p>
            <button className="btn bg-lime-600 hover:text-slate-800 text-slate-200 border-lime-600">
              Discover
            </button>
          </div>
        </div>
      </Carousel>
    </Container>
  );
};

export default Banner;
