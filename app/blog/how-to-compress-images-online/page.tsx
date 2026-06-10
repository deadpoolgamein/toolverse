export default function CompressImageArticle() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-red-800 p-6">
      <div className="max-w-3xl mx-auto border border-red-900 rounded-2xl p-8 bg-[#111111] shadow-lg">

        <h1 className="text-4xl font-bold mb-6 text-white">
          How to Compress Images Online
        </h1>

        <p className="text-white mb-4">
          Large image files can slow down websites,
          increase storage usage, and take longer to upload.
          Compressing images helps reduce file size while
          maintaining good image quality.
        </p>

        <p className="text-white mb-4">
          Online image compression tools make it easy to
          optimize photos, screenshots, and graphics without
          installing any software. Simply upload an image,
          choose a compression level, and download the
          optimized version.
        </p>

        <p className="text-white mb-4">
          Compressed images improve website performance,
          reduce bandwidth usage, and help pages load faster.
          This is especially important for blogs, online
          stores, and business websites.
        </p>

        <p className="text-white mb-4">
          DRAKSYON Image Compressor allows users to compress
          images quickly and download the optimized file
          directly in their browser.
        </p>

        <div className="mt-8 p-6 bg-[#111111] rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-3">
            Benefits of Image Compression
          </h2>

          <ul className="list-disc pl-6 text-white space-y-2">
            <li>Faster website loading speed</li>
            <li>Reduced file size</li>
            <li>Lower bandwidth usage</li>
            <li>Better user experience</li>
            <li>Improved SEO performance</li>
          </ul>
        </div>

        <div className="mt-8">
          <a
            href="/tools/image-compressor"
            className="inline-block text-white bg-[#111111] rounded-2xl p-6 border border-red-900 shadow-lg hover:shadow-red-900/30 hover:border-red-700 transition block hover:-translate-y-1 transition block border"
          >
            Try Image Compressor →
          </a>
        </div>

      </div>
    </main>
  );
}