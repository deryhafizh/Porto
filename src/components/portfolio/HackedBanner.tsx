export function HackedBanner() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[999] border-t-2 border-primary bg-black/90 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
        <div className="whitespace-nowrap animate-[mq_20s_linear_infinite]">
          {" HACKED BY mnabi // no database, no token, no problem // ".repeat(8)}
        </div>
      </div>
      <style>{`@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </>
  );
}
