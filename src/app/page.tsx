
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import WorkoutList from "@/components/WorkoutList";
import Library from "@/components/Library"


export default function Home() {
  return (
    <div>
    <Navbar></Navbar>
    <Hero></Hero>
    <Library></Library>
    <WorkoutList></WorkoutList>
    <Footer></Footer>
    </div>
  );
}
