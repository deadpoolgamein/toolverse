export default function GSTArticle() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-red-800 p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-6 text-white border border-red-900 rounded-2xl p-6 bg-[#111111] shadow-lg">
          What is a GST Calculator?
        </h1>

        <p className="text-white mb-4">
          A GST Calculator is an online tool that helps users
          calculate Goods and Services Tax quickly and accurately.
        </p>

        <p className="text-white mb-4">
          It is useful for business owners, freelancers,
          shopkeepers and customers who want to know the GST
          amount included in a price.
        </p>

        <p className="text-white">
          You can use DRAKSYON GST Calculator to calculate
          GST instantly without any manual calculations.
        </p>


        <div className="mt-8">
          <a
            href="/tools/gst-calculator"
            className="inline-block text-white bg-[#111111] rounded-2xl p-6 border border-red-900 shadow-lg hover:shadow-red-900/30 hover:border-red-700 transition block hover:-translate-y-1 transition block border"
          >
            Try GST Calculator →
          </a>
        </div>

      </div>
    </main>
  );
}