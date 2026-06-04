import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Top nav bar */}
      <header className="w-full flex items-center justify-between px-10 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {/* M logo mark */}
          <div className="h-9 w-9 rounded-xl bg-[#071739] flex items-center justify-center">
            <span className="text-white font-bold text-base tracking-tight">M</span>
          </div>
          <div className="leading-none">
            <p className="text-sm font-bold text-[#071739] tracking-wide">MedMarvel</p>
            <p className="text-[10px] text-gray-400 font-medium">Software Solutions</p>
          </div>
        </div>

        <Link
          href="/login"
          className="text-sm font-semibold text-[#071739] hover:text-blue-700 transition"
        >
          Login
        </Link>
      </header>

      {/* Hero — centred */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">

        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          Healthcare · Imaging · AI
        </span>

        {/* Brand mark */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-14 w-14 rounded-2xl bg-[#071739] shadow-lg flex items-center justify-center">
            <span className="text-white text-2xl font-black tracking-tight">M</span>
          </div>
          <div className="text-left leading-none">
            <h1 className="text-4xl font-black text-[#071739] tracking-tight leading-none">
              MedMarvel
            </h1>
            <p className="text-sm text-gray-400 font-semibold mt-0.5 tracking-wide">
              Software Solutions
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-[28px] font-bold text-[#071739] max-w-xl leading-snug mb-3">
          MedVirtuoso
        </p>
        <p className="text-base text-gray-500 max-w-md leading-relaxed mb-10 font-medium">
          Advanced Medical Imaging Platform — empowering radiologists, operators
          and care teams with intelligent diagnostic workflows.
        </p>

        {/* Single Login CTA */}
        <Link
          href="/login"
          className="inline-flex items-center justify-center gap-2 bg-[#071739] hover:bg-[#0b2559] text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
        >
          Login to Platform
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>

        {/* Trust / context line */}
        <p className="text-xs text-gray-400 mt-5 font-medium">
          Authorised access only. Contact your administrator for credentials.
        </p>
      </main>

      {/* Footer */}
      <footer className="w-full px-10 py-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>© {new Date().getFullYear()} MedMarvel Software Solutions. All rights reserved.</span>
        <span>MedVirtuoso · Advanced Medical Imaging Platform</span>
      </footer>
    </div>
  );
}
