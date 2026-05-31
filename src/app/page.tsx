import { TRAITS, PORTFOLIO_HEADS } from "@/types";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Decorative circle */}
        <div className="absolute w-[500px] h-[500px] rounded-full border border-border opacity-30 pointer-events-none" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-accent/20 opacity-40 pointer-events-none" />

        <p className="text-muted text-sm tracking-[0.3em] uppercase mb-4 font-body">
          Professor of Practice in Design · IIT Gandhinagar
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6">
          <span className="gradient-text">Sameer</span>
          <br />
          <span className="text-foreground">Sahasrabudhe</span>
        </h1>

        <p className="text-lg md:text-xl text-muted max-w-2xl mb-8 font-body">
          10 traits · 1 digital identity · 100,000+ learners worldwide
        </p>

        {/* Traits ticker */}
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
          {TRAITS.map((trait) => (
            <span
              key={trait.id}
              className="px-4 py-2 text-sm font-body rounded-full border border-card-border bg-card-bg backdrop-blur-sm text-primary hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 cursor-default"
            >
              {trait.name}
            </span>
          ))}
        </div>
      </section>

      {/* Portfolio Heads Section */}
      <section className="py-24 px-6">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            Portfolio
          </h2>
          <p className="text-muted text-center mb-16 max-w-xl mx-auto font-body">
            Four dimensions of a multidisciplinary creative practice
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIO_HEADS.map((head) => (
              <a
                key={head.slug}
                href={`/${head.slug}`}
                className="glass-card p-8 group cursor-pointer"
              >
                <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-accent transition-colors">
                  {head.title}
                </h3>
                <p className="text-muted text-sm mb-4 font-body">
                  {head.subtitle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {head.traits.map((trait) => (
                    <span
                      key={trait}
                      className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-body"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 px-6 bg-surface-alt">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Learners Worldwide", value: "100,000+" },
              { label: "Blog Visits", value: "176,181" },
              { label: "Years Experience", value: "25+" },
              { label: "PhD Scholars", value: "3" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6">
                <p className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted font-body">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="section-container text-center">
          <p className="text-muted text-sm font-body">
            © {new Date().getFullYear()} Prof. Sameer Sahasrabudhe · 1000brains
          </p>
        </div>
      </footer>
    </main>
  );
}
