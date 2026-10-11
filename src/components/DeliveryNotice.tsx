import { IconPin } from "@/components/icons";

export default function DeliveryNotice() {
  return (
    <aside className="mb-6 flex items-start gap-3 rounded-2xl border border-primary-100 bg-primary-50 p-4 sm:p-5">
      <IconPin className="mt-0.5 size-5 flex-none text-primary" />
      <div>
        <h2 className="font-bold text-ink">Jangkauan pemesanan</h2>
        <p className="mt-1 text-sm leading-6 text-muted">
          Saat ini kami melayani pemesanan untuk alamat dalam jarak maksimal 5 km dari KWT. Hubungi kami lewat WhatsApp
          untuk memastikan alamat Anda masuk jangkauan.
        </p>
      </div>
    </aside>
  );
}
