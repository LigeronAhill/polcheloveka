import Image from "next/image";
import Link from "next/link";

interface ProfileLinkProps {
	imgUrl: string;
	href?: string;
	title: string;
}

const ProfileLink = ({ imgUrl, href, title }: ProfileLinkProps) => {
	return (
		<div className="flex items-center justify-center gap-1">
			<Image src={imgUrl} alt="icon" width={20} height={20} />

			{href ? (
				<Link
					href={href}
					target="_blank"
					className="font-medium text-base text-blue-500"
				>
					{title}
				</Link>
			) : (
				<p className="font-medium text-base text-dark-400 dark:text-light-700">
					{title}
				</p>
			)}
		</div>
	);
};

export default ProfileLink;
