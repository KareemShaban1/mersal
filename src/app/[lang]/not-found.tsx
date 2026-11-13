import Link from "next/link";
import { Smile } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-x grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <Smile className="mx-auto w-28 rotate-180 text-sun" />
        <h1 className="mt-6 text-4xl font-bold">الصفحة غير موجودة · Page not found</h1>
        <p className="mt-3 text-ink-soft">الرابط الذي فتحته غير متاح. · The link you followed is not available.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/ar" className="btn-teal">الرئيسية</Link>
          <Link href="/en" className="btn-ghost">Home</Link>
        </div>
      </div>
    </div>
  );
}
