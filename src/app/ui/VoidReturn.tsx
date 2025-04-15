type Props = {
	message: string;
	customStyle?: string;
};

export default function VoidReturn({ message, customStyle }: Props) {
	return (
		<section className={customStyle}>
			<p>{message}</p>
		</section>
	);
}
