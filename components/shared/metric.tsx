import Image from "next/image";
import Link from "next/link";

export default function Metric({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: {
  imgUrl?: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}): React.JSX.Element {
  var className = "object-contain";
  if (imgUrl === "/assets/icons/avatar.svg") {
    className = `${className} invert dark:invert-0`;
  }
  return (
    <div className="relative isolate flex flex-wrap items-center gap-2">
      {imgUrl && (
        <Image
          src={imgUrl}
          alt={alt}
          width={16}
          height={16}
          className={`${className} ${href ? "rounded-full" : ""}`}
        />
      )}
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`line-clamp-1 font-normal text-xs ${isAuthor ? "max-sm:hidden" : ""}`}
        ></span>
        {title}
      </p>
      {href && (
        <Link href={href}>
          <span className="absolute inset-0 z-10"></span>
        </Link>
      )}
    </div>
  );
}
