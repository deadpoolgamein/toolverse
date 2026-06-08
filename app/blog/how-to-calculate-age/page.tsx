export default function AgeArticle() {
  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-6 text-black">
          How to Calculate Age Online
        </h1>

        <p className="text-gray-700 mb-4">
          Calculating age manually can be confusing,
          especially when months and leap years are involved.
        </p>

        <p className="text-gray-700 mb-4">
          Online age calculators provide instant and
          accurate age calculations.
        </p>

        <p className="text-gray-700">
          ToolVerse Age Calculator helps users calculate
          their age quickly and easily.
        </p>

        <div className="mt-8">
          <a
            href="/tools/age-calculator"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Try Age Calculator →
          </a>
        </div>

      </div>
    </main>
  );
}