'use client';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm text-secondary">
              © {new Date().getFullYear()} VBB. Crafted for excellence.
            </p>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-xs text-secondary/60 uppercase tracking-[0.15em]">
              School Exhibition 2026<br/>
              <br/>
                By Raunak Kushwaha
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
