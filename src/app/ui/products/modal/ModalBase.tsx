import React from "react";
import "./modal.css";

interface ModalBaseProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  onSubmit: () => void;
  submitText?: string;
  showDelete?: boolean;
  onDelete?: () => void;
}

export default function ModalBase({
  title,
  onClose,
  children,
  onSubmit,
  submitText = "Guardar",
  showDelete = false,
  onDelete,
}: ModalBaseProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          X
        </button>
        <h2>{title}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="modal-form"
        >
          {children}
          <div className="buttons-container">
            <button type="submit">{submitText="Save Changes"}</button>
            {showDelete && onDelete && (
              <button
                type="button"
                className="delete-button"
                onClick={onDelete}
              >
                Delete Product{" "}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
