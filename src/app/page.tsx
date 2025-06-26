import Banner from "@/components/banner";
import Card from "@/components/productCard";
import NavBar from "@/components/navBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full w-full mt-18 md:mt-20">
      <Banner />

      <Card />
    </div>
  );
}
