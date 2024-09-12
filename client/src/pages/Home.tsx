import background from "../assets/images/landing-bg.avif";

export default function Home() {
  return (
    <div>
      <div
        className="w-full h-[45dvh] md:h-[65dvh]"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <section className="wrapper">
        <h1 className="mt-8 text-xl sm:text-2xl lg:max-w-[70%] mx-auto font-bold md:text-4xl">
          Découvrez + de 120 combinaisons possibles pour créer la salade qui
          vous correspond, grâce à notre large choix d’ingrédients.
        </h1>
      </section>
    </div>
  );
}
