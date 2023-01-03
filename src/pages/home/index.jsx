import Navbar from "../../components/Navbar";
import Filter from "./Filter";
import Products from "./Products";

const Home = () => {
  

  return (
    <div className="space-y-5 lg:space-y-10">
      <Navbar />
      <Filter />
      <Products />
    </div>
  );
};

export default Home;
