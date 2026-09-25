import { PRODUCT_ICONS } from "@/components/illustrations";
import { productImageSrc, type Product } from "@/lib/products";

type ImageableProduct = Pick<Product, "dbId" | "imageUrl" | "hasUploadedImage" | "imageVersion" | "icon" | "name">;

export default function ProductImage({
  product,
  className,
  iconClassName,
}: {
  product: ImageableProduct;
  className?: string;
  iconClassName?: string;
}) {
  const src = productImageSrc(product);

  if (src) {
    return (
      // Admin-provided photos can be any external URL or our own upload
      // route, so next/image's remote-pattern allowlist doesn't fit here.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={product.name} className={className ?? "size-full object-cover"} />
    );
  }

  const Icon = PRODUCT_ICONS[product.icon];
  return <Icon className={iconClassName ?? className ?? "h-[78%] w-[78%]"} />;
}
