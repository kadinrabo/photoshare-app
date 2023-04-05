import ReactDOM from "react-dom";

function Popup({ children, onClose, isOpen }) {
	const handleClose = () => {
		onClose && onClose();
	};

	return ReactDOM.createPortal(
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: "rgba(0, 0, 0, 0.3)",
				display: isOpen ? "flex" : "none",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 1000,
				backdropFilter: "blur(1px)",
			}}
			onClick={handleClose}
		>
			<div
				style={{
					position: "absolute",
					background: "white",
					padding: "20px",
					borderRadius: "5px",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					maxWidth: "90vw",
					maxHeight: "90vh",
					overflow: "auto",
				}}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		document.body
	);
}

export default Popup;
