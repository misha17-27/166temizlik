export default function Loading() {
  return (
    <main className="min-h-screen bg-white">
      <div className="blue-band h-[110px] max-md:h-[72px]" />
      <section className="flex min-h-[calc(100vh-110px)] items-center justify-center px-5 max-md:min-h-[calc(100vh-72px)]">
        <div className="h-11 w-11 animate-spin rounded-full border-4 border-[#d8ecfb] border-t-brand-blue" aria-label="Loading" />
      </section>
    </main>
  );
}
