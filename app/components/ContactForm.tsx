"use client";

export default function ContactForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: integrate with email/CRM API (e.g. send form data to /api/contact)
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    console.log("Demo booking requested for:", email);
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        name="email"
        type="email"
        required
        placeholder="Work email address"
        className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
      />
      <button
        type="submit"
        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors whitespace-nowrap"
      >
        Book Demo
      </button>
    </form>
  );
}
