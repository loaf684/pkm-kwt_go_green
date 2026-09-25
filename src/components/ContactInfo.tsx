import { IconMail, IconPin, IconWhatsApp } from "@/components/icons";
import { WA_GENERAL_LINK } from "@/lib/products";

export default function ContactInfo({
  eyebrow,
  text,
}: {
  eyebrow?: string;
  text: string;
}) {
  return (
    <div>
      {eyebrow ? (
        <div className="mb-2 font-bold text-accent-600">{eyebrow}</div>
      ) : (
        <div className="mb-2 invisible">-</div>
      )}
      <h2 className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-extrabold leading-tight tracking-tight">
        Pesan Sayur Segar Langsung dari Kebun.
      </h2>
      <p className="mt-3 max-w-lg text-[1.05rem] text-muted">{text}</p>

      <a
        href={WA_GENERAL_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-fit items-center gap-3 rounded-2xl bg-whatsapp px-5 py-4 text-white transition hover:bg-whatsapp-600"
      >
        <IconWhatsApp className="size-[26px] flex-none" />
        <span>
          <small className="block text-xs font-semibold opacity-85">WhatsApp</small>
          <strong className="text-[1.05rem]">0858-8372-9767</strong>
        </span>
      </a>

      <div className="mt-4 flex items-start gap-3">
        <span className="flex size-11 flex-none items-center justify-center rounded-xl bg-primary-50 text-primary">
          <IconPin className="size-[21px]" />
        </span>
        <div>
          <strong className="block text-xs font-bold text-muted">Alamat</strong>
          <span className="font-bold">Jl. Perumahan Griya Asri</span>
          <span className="block text-sm text-muted">Jelupang, Kec. Serpong Utara, Kota Tangerang Selatan, Banten 15323</span>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <span className="flex size-11 flex-none items-center justify-center rounded-xl bg-primary-50 text-primary">
          <IconMail className="size-[21px]" />
        </span>
        <div>
          <strong className="block text-xs font-bold text-muted">Email</strong>
          <span className="font-bold">dummy@example.com</span>
        </div>
      </div>
    </div>
  );
}
