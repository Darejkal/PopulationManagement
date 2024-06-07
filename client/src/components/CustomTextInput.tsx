export function CustomTextInput({
	label,
	inputProps,
	error,
	style
}: {
	label: string;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	error?: string;
	style?:React.CSSProperties
}) {
	return (
		<div className="mb-3" style={style}>
			<label className="form-label">{label}</label>
			<input className="form-control"  type="text" {...inputProps} />
			{error&&<div className="invalid-feedback">{error}</div>}
		</div>
	);
}
