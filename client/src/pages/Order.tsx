import { TrashIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { useCartStore } from "../store";

export default function Order() {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const salads = useCartStore((s) => s.salads);
  const removeSalad = useCartStore((s) => s.removeSalad);

  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    const newTotal = salads.reduce((acc, salad) => acc + salad.totalPrice, 0);
    setTotalPrice(newTotal);
  }, [salads]);

  const handleSubmit = async (e: HTMLFormElement) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/order`,
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            phone,
            address,
            salads,
          }),
        },
      );
      if (response.status !== 201) {
        throw new Error("Error while ordering");
      }
      navigate("/commande-confirmee");
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
    }
  };

  return (
    <section className="page">
      <h1 className="title">Votre commande</h1>
      <div>
        {salads.length > 0 ? (
          <div className="mt-6 overflow-hidden border-2 rounded-lg border-zinc-400">
            {salads.map((salad) => (
              <article
                className="flex items-center justify-between p-4 bg-gray-200"
                key={salad.name}
              >
                <img
                  className="w-16 h-16 rounded-md"
                  src={salad.url}
                  alt="salad"
                />
                <p className="text-sm font-semibold">{salad.name}</p>
                <p className="text-sm font-semibold">{salad.totalPrice}</p>
                <button type="button" onClick={() => removeSalad(salad)}>
                  <TrashIcon className="size-4 hover:text-red-600" />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-6 font-semibold">
            Vous n'avez rien commandé pour le moment. N'hésitez pas à regarder
            nos délicieuses salades!
          </p>
        )}
        {salads.length ? (
          <p className="mt-6 font-semibold">Prix total: {totalPrice} €</p>
        ) : undefined}
      </div>
      <section className="mt-8">
        <h2 className="subtitle">Vos coordonnées</h2>
        <form
          className="flex flex-col gap-4 mt-8"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label
            className="flex flex-col gap-4 font-semibold"
            htmlFor="firstname"
          >
            Votre prénom*
            <input
              className="input-form"
              type="text"
              name="firstname"
              id="firstname"
              required
            />
          </label>
          <label
            className="flex flex-col gap-4 font-semibold"
            htmlFor="lastname"
          >
            Votre nom*
            <input
              className="input-form"
              type="text"
              name="lastname"
              id="lastname"
              required
            />
          </label>
          <label className="flex flex-col gap-4 font-semibold" htmlFor="email">
            Votre email*
            <input
              className="input-form"
              type="email"
              name="email"
              id="email"
              required
            />
          </label>
          <label className="flex flex-col gap-4 font-semibold" htmlFor="phone">
            Votre numéro de téléphone*
            <input
              className="input-form"
              type="tel"
              name="phone"
              id="phone"
              required
            />
          </label>
          <label
            className="flex flex-col gap-4 font-semibold"
            htmlFor="address"
          >
            Votre adresse complète*
            <input
              className="input-form"
              type="text"
              name="address"
              id="address"
              required
            />
          </label>
          <button
            className="text-white bg-secondary disabled:bg-gray-400"
            type="submit"
            disabled={isSubmitting}
          >
            Commander
          </button>
        </form>
      </section>
    </section>
  );
}
