import Link from "next/link";
import ContactForm from "./components/ContactForm";

const navigation = [
  { name: "Solutions", href: "#solutions" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const solutions = [
  {
    icon: "🤖",
    title: "AI Automation",
    description:
      "Automate complex enterprise workflows with intelligent AI agents that learn and adapt to your business processes.",
  },
  {
    icon: "📊",
    title: "Data Intelligence",
    description:
      "Transform raw data into actionable insights with our enterprise-grade analytics and machine learning platform.",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    description:
      "AI-powered threat detection and compliance management built to meet the highest enterprise security standards.",
  },
  {
    icon: "🚀",
    title: "Scalable Infrastructure",
    description:
      "Cloud-native AI infrastructure that scales seamlessly with your business, from startup to global enterprise.",
  },
  {
    icon: "🤝",
    title: "Integration Platform",
    description:
      "Connect your existing enterprise systems with our AI layer through pre-built connectors and open APIs.",
  },
  {
    icon: "📈",
    title: "Performance Analytics",
    description:
      "Real-time KPI monitoring and predictive analytics to keep your enterprise ahead of the curve.",
  },
];

const services = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description:
      "We assess your current systems and define a tailored AI roadmap aligned with your business goals.",
  },
  {
    step: "02",
    title: "Design & Development",
    description:
      "Our engineers build custom AI solutions integrated seamlessly into your existing infrastructure.",
  },
  {
    step: "03",
    title: "Deploy & Scale",
    description:
      "We deploy with zero disruption and provide ongoing support as you scale across your organisation.",
  },
];

const stats = [
  { value: "200+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "10×", label: "Avg. Productivity Gain" },
  { value: "24/7", label: "Expert Support" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              enterprise<span className="text-blue-600">first</span>
            </span>
            <span className="hidden sm:inline-block text-xs font-medium text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">
              .ai
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#contact"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="pt-32 pb-24 px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide uppercase">
              AI for Enterprise
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
              Enterprise intelligence,{" "}
              <span className="text-blue-600">built to scale</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Enterprise First AB delivers AI solutions engineered for
              real-world enterprise challenges — secure, scalable, and ready to
              transform how your business operates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-blue-600 text-white text-base font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Book a Demo
              </Link>
              <Link
                href="#solutions"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-gray-200 text-gray-700 text-base font-semibold hover:bg-gray-50 transition-colors"
              >
                Explore Solutions →
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-y border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-4xl font-extrabold text-blue-600 mb-1">
                    {stat.value}
                  </dt>
                  <dd className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">
                Enterprise-grade AI solutions
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                A complete suite of AI capabilities designed for the demands of
                modern enterprise.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <div
                  key={solution.title}
                  className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50 transition-all"
                >
                  <div className="text-4xl mb-4">{solution.icon}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services / How it works */}
        <section
          id="services"
          className="py-24 px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">
                How we work
              </h2>
              <p className="text-lg text-blue-100 max-w-xl mx-auto">
                A proven process to take your enterprise from AI-curious to
                AI-powered.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.step}
                  className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <div className="text-5xl font-black text-white/20 mb-4">
                    {service.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-blue-100 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                About Enterprise First AB
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight mb-6 leading-tight">
                We put enterprise needs first, always
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Enterprise First AB was founded with a single mission: make
                enterprise-grade AI accessible, practical, and trustworthy for
                organisations of every size. We combine deep enterprise
                expertise with cutting-edge AI research to deliver solutions
                that create real, measurable business value.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Headquartered in Sweden and serving clients across Europe and
                beyond, we are committed to responsible AI development with
                transparency, security, and compliance at the core of everything
                we build.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  emoji: "🇸🇪",
                  label: "Founded in Sweden",
                  sublabel: "European HQ",
                },
                {
                  emoji: "🔐",
                  label: "GDPR Compliant",
                  sublabel: "Data privacy first",
                },
                {
                  emoji: "🌍",
                  label: "Global Reach",
                  sublabel: "20+ countries",
                },
                {
                  emoji: "🏆",
                  label: "Award-Winning",
                  sublabel: "Industry recognition",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center"
                >
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <div className="font-bold text-sm">{item.label}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Contact */}
        <section
          id="contact"
          className="py-24 px-6 lg:px-8 bg-gray-950 text-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-extrabold tracking-tight mb-6">
              Ready to put enterprise first?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Book a discovery call with our team and find out how Enterprise
              First AI can accelerate your digital transformation.
            </p>
            <ContactForm />
            <p className="text-xs text-gray-600 mt-4">
              No spam. We respect your privacy. GDPR compliant.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-white/5 py-12 px-6 lg:px-8 text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="font-bold text-white text-lg">
              enterprise<span className="text-blue-500">first</span>
              <span className="text-gray-500 font-normal">.ai</span>
            </p>
            <p className="text-sm mt-1">Enterprise First AB — Stockholm, Sweden</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Enterprise First AB. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
