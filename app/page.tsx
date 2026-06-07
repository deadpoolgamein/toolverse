import Image from "next/image";
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
  {
    name: "SIP Calculator",
    link: "/tools/sip-calculator",
  },
  {
    name: "Loan Calculator",
    link: "/tools/loan-calculator",
  },
  {
    name: "Character Counter",
    link: "/tools/character-counter",
  },
  {
    name: "Text Case Converter",
    link: "/tools/text-case-converter",
  },
  {
    name: "Image Resizer",
    link: "/tools/image-resizer",
  },
  {
    name: "JPG to PNG",
    link: "/tools/jpg-to-png",
  },
  ];
  const calculators = [
  "Age Calculator",
  "GST Calculator",
  "Percentage Calculator",
  "BMI Calculator",
  "EMI Calculator",
  "Discount Calculator",
  "SIP Calculator",
  "Loan Calculator",
];

const utilityTools = [
  "Word Counter",
  "Password Generator",
  "QR Generator",
  "Character Counter",
  "Text Case Converter",
  "Image Resizer",
  
];

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Image
              src="/logo.png"
              alt="ToolVerse Logo"
              width={80}
              height={80}
            />

            <h1 className="text-2xl font-bold text-blue-600">
              ToolVerse
            </h1>
          </div>

          <div className="flex gap-6">
            <a href="/" className="hover:text-blue-600">
              Home
            </a>

            <a href="/about" className="hover:text-blue-600">
              About
            </a>

            <a href="/contact" className="hover:text-blue-600">
              Contact
            </a>

            <a href="/privacy-policy" className="hover:text-blue-600">
              Privacy
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

      {/* Calculators */}
<section className="max-w-6xl mx-auto px-6 pb-10">
  <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
    Calculators
  </h2>

  <div className="grid md:grid-cols-3 gap-6">
    {tools
      .filter((tool) => calculators.includes(tool.name))
      .map((tool) => (
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

{/* Utility Tools */}
<section className="max-w-6xl mx-auto px-6 pb-20">
  <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
    Utility Tools
  </h2>

  <div className="grid md:grid-cols-3 gap-6">
    {tools
      .filter((tool) => utilityTools.includes(tool.name))
      .map((tool) => (
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
      <footer className="bg-blue-600 text-white mt-20">
  <div className="max-w-7xl mx-auto px-6 py-10">
    <div className="grid md:grid-cols-3 gap-8">

      <div>
        <h3 className="font-bold text-xl mb-3">
          ToolVerse
        </h3>

        <p>
          Free online tools for everyone.
        </p>
      </div>

      <div>
        <h3 className="font-bold mb-3">
          Quick Links
        </h3>

        <ul className="space-y-2">
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold mb-3">
          Contact
        </h3>

        <p>
          toolverse.support@gmail.com
        </p>
      </div>

    </div>

    <div className="border-t border-blue-400 mt-8 pt-4 text-center">
      © 2026 ToolVerse. All Rights Reserved.
    </div>
  </div>
</footer>
    </main>
  );
}