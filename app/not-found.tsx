export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4 text-black">
          Page Not Found
        </h2>

        <p className="text-gray-600 mt-4">
          Sorry, the page you are looking for does not exist.
        </p>

        <a
          href="/"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Go Back Home
        </a>
      </div>
    </main>
  );
}