export default function Home() {
  const tools = [
    {
    name: "Age Calculator",
    link: "/tools/age-calculator",
  },
  {
    name: "GST Calculator",
    link: "/tools/gst-calculator",
  },
  {
    name: "Percentage Calculator",
    link: "/tools/percentage-calculator",
  },
  {
    name: "BMI Calculator",
    link: "/tools/bmi-calculator",
  },
  {
    name: "EMI Calculator",
    link: "/tools/emi-calculator",
  },
  {
    name: "QR Generator",
    link: "/tools/qr-generator",
  },
  {
    name: "Word Counter",
    link: "/tools/word-counter",
  },
  {
    name: "Password Generator",
    link: "/tools/password-generator",
  },
  {
    name: "Discount Calculator",
    link: "/tools/discount-calculator",
  },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">
            ToolVerse
          </h1>

          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#" className="hover:text-blue-600">
              Tools
            </a>
            <a href="#" className="hover:text-blue-600">
              About
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">
          100+ Free Online Tools
        </h1>

        <p className="text-xl text-gray-600 mb-10">
          Fast, Free and Easy-to-Use Tools for Everyone.
        </p>

        <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition">
          Explore Tools
        </button>
      </section>

      {/* Popular Tools */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Popular Tools
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool) => (
  <a
    key={tool.name}
    href={tool.link}
    className="bg-white border rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:border-blue-500 transition block"
  >
    <h3 className="text-lg font-semibold text-gray-900">
      {tool.name}
    </h3>
  </a>
))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-6">
        © 2026 ToolVerse. All Rights Reserved.
      </footer>
    </main>
  );
}