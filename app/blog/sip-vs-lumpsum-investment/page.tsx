export default function SIPvsLumpsumArticle() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-red-800 p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-6 text-white border border-red-900 rounded-2xl p-6 bg-[#111111] shadow-lg">
          SIP vs Lumpsum Investment
        </h1>

        <p className="text-white mb-4">
          SIP (Systematic Investment Plan) and Lumpsum
          Investment are two popular ways to invest in mutual
          funds. Both methods have their own advantages and
          are suitable for different types of investors.
        </p>

        <p className="text-white mb-4">
          In a SIP, investors contribute a fixed amount
          regularly, such as monthly or weekly. This method
          helps build investment discipline and reduces the
          impact of market volatility through rupee cost
          averaging.
        </p>

        <p className="text-white mb-4">
          A Lumpsum Investment involves investing a large
          amount of money at one time. It can provide higher
          returns when markets perform well, but it also
          carries higher short-term market risk.
        </p>

        <p className="text-white mb-4">
          SIP is generally preferred by salaried individuals
          who want to invest regularly, while Lumpsum
          investments are often chosen by investors who have
          a significant amount of money available to invest.
        </p>

        <div className="mt-8 p-6 bg-[#111111] border border-red-900 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            SIP vs Lumpsum Comparison
          </h2>

          <ul className="list-disc pl-6 text-white space-y-2">
            <li>SIP requires regular small investments.</li>
            <li>Lumpsum requires a one-time investment.</li>
            <li>SIP reduces market timing risk.</li>
            <li>Lumpsum can benefit more from market rallies.</li>
            <li>SIP is ideal for long-term disciplined investing.</li>
          </ul>
        </div>

        <div className="mt-8 p-6 bg-[#111111] border border-red-900 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-3">
            Calculate Your SIP Returns
          </h2>

          <p className="text-white mb-4">
            Use the DRAKSYON SIP Calculator to estimate
            your future investment value and plan your
            financial goals more effectively.
          </p>

          <a
            href="/tools/sip-calculator"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg border border-green-900 shadow-lg hover:shadow-green-900/30 hover:border-green-700 transition block hover:-translate-y-1 transition block border"
          >
            Try SIP Calculator →
          </a>
        </div>

      </div>
    </main>
  );
}