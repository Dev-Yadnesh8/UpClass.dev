import { Controller } from "react-hook-form";
import JoditEditor from "jodit-react";

function RTE({ name, control, label, defaultValue = "" }) {
  const config = {
    theme: "dark",
    readonly: false,
    toolbarAdaptive: false,
    height: 300,
    style: {
      background: "#00040f",
      color: "#fff",
    },
  };

  return (
    <div className="space-y-1">
      {label && <label className="block font-medium">{label}</label>}

      <Controller
        name={name}
        control={control}
        rules={{ required: "This field is required" }}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <JoditEditor
            config={config}
            value={value}
            onChange={(content) => onChange(content)}
          />
        )}
      />
    </div>
  );
}

export default RTE;
