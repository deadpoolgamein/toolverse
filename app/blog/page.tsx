export default function BlogPage() {
  const posts = [
    {
      title: "What is a GST Calculator?",
      description: "Learn how GST calculators help calculate tax quickly and accurately.",
      link: "/blog/what-is-gst-calculator",
    },
    {
      title: "How to Calculate Age Online",
      description: "Calculate your exact age in years, months and days instantly.",
      link: "/blog/how-to-calculate-age",
    },
    {
      title: "SIP vs Lumpsum Investment",
      description: "Compare SIP and lumpsum investments and choose the right strategy.",
      link: "/blog/sip-vs-lumpsum-investment",
    },
    {
      title: "How to Compress Images Online",
      description: "Reduce image size and improve website performance easily.",
      link: "/blog/how-to-compress-images-online",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-black">
          DRAKSYON Blog
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a
              key={post.title}
              href={post.link}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition block border"
            >
              <div>
                <h2 className="text-xl font-semibold text-black mb-3">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4">
                  {post.description}
                </p>

                <span className="text-blue-600 font-semibold">
                  Read Article →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}