export default function AgeArticle() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-red-800 p-6">
      <div className="max-w-3xl mx-auto border border-red-900 rounded-2xl p-8 bg-[#111111] shadow-lg">

        <h1 className="text-4xl font-bold mb-6 text-white">
          How to Calculate Age Online
        </h1>

        <p className="text-white mb-4">
          Calculating age manually can be confusing,
          especially when months and leap years are involved.
        </p>

        <p className="text-white mb-4">
          Online age calculators provide instant and
          accurate age calculations.
        </p>

        <p className="text-white">
          DRAKSYON Age Calculator helps users calculate
          their age quickly and easily.
        </p>

        <div className="mt-8">
          <a
            href="/tools/age-calculator"
            className="inline-block text-white bg-[#111111] rounded-2xl p-6 border border-red-900 shadow-lg hover:shadow-red-900/30 hover:border-red-700 transition block hover:-translate-y-1 transition block border"
          >
            Try Age Calculator →
          </a>
        </div>

      </div>
    </main>
  );
}