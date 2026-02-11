type HeaderProps = {
	pageName: string;
};

export default function Header(props: HeaderProps) {
	return (
		<header className="flex items-center justify-between h-15 w-full border-b px-6">
			<p className="font-medium text-xl">{props.pageName}</p>
		</header>
	);
}
