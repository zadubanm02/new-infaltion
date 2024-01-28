import { CrossIcon, XCircle } from "lucide-react";
import React from "react";

type BadgeProps = {
  label: string;
  onDelete: (id: string) => void;
};

const ProductBadge = ({ label, onDelete }: BadgeProps) => {
  return (
    <span className="flex-1 flex-row inline-flex items-center p-1 m-1 bg-secondary rounded-lg w-auto">
      {label}
      <XCircle
        className="ml-1 cursor-pointer"
        size={20}
        onClick={() => onDelete(label)}
      />
    </span>
  );
};

export default ProductBadge;
