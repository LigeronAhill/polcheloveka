export default async function EditDeleteAction({
	type,
	itemId,
}: Props): Promise<React.JSX.Element> {
	return (
		<div>Actions</div>
	);
}

interface Props {
	type: "question" | "answer";
	itemId: string;
}
