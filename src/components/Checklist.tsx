import { IconCheck } from "@/components/icons";

export default function Checklist({
  items,
  columns = 2,
}: {
  items: string[];
  columns?: 1 | 2;
}) {
  return (
    <ul className={`mt-6 grid gap-3.5 ${columns === 2 ? "grid-cols-1 sm:grid-cols-2 gap-x-6" : "grid-cols-1"}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-[0.96rem] font-semibold text-ink">
          <IconCheck className="mt-px size-[22px] flex-none" />
          {item}
        </li>
      ))}
    </ul>
  );
}
