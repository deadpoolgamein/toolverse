export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-red-800 p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4 text-white">
          Page Not Found
        </h2>

        <p className="text-white mt-4">
          Sorry, the page you are looking for does not exist.
        </p>

        <a
          href="/"
          className="inline-block mt-6 text-white bg-[#111111] rounded-2xl p-6 border border-red-900 shadow-lg hover:shadow-red-900/30 hover:border-red-700 transition block hover:-translate-y-1 transition block border"
        >
          Go Back Home
        </a>
      </div>
    </main>
  );
}