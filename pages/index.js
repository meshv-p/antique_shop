import Category from "../compo/Category";
import Products from "../compo/Products";
import { Most_Popular } from "../compo/Most_Popular";
import { Footer } from "../compo/Footer";
import { useAuth, useBearStore } from "../store";
import { useEffect } from "react";
// import { StarIcon } from "@heroicons/react/solid";
// import { RadioGroup } from "@headlessui/react";
function BearCounter() {
  const bears = useBearStore((state) => state.bears);
  return <h1>{bears} around here ...</h1>;
}

function Controls() {
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}
export default function Home() {
  let auth = useAuth();

  useEffect(() => {
    // console.log(auth.isLoggedinUser(), "auth.isLoggedinUser()");
    console.log(auth.user, "auth.isLoggedinUser()");
  }, [auth]);

  return (
    // category
    // Product
    // Most Popular
    // Footer
    // Map
    <>
      {/* <BearCounter />
      <Controls /> */}

      <Category />
      <Products />
      <Most_Popular />
      <Footer />
    </>
  );
}
