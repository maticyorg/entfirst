"use client";

export default function ContactForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
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
