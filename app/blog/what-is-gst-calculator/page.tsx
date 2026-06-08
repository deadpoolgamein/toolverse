export default function GSTArticle() {
  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-6 text-black">
          What is a GST Calculator?
        </h1>

        <p className="text-gray-700 mb-4">
          A GST Calculator is an online tool that helps users
          calculate Goods and Services Tax quickly and accurately.
        </p>

        <p className="text-gray-700 mb-4">
          It is useful for business owners, freelancers,
          shopkeepers and customers who want to know the GST
          amount included in a price.
        </p>

        <p className="text-gray-700">
          You can use ToolVerse GST Calculator to calculate
          GST instantly without any manual calculations.
        </p>


        <div className="mt-8">
          <a
            href="/tools/gst-calculator"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Try GST Calculator →
          </a>
        </div>

      </div>
    </main>
  );
}