import React from "react";

type LogFileFormProps = {
  onSubmit: (f: File) => void;
};

export default function LogFileForm({ onSubmit }: LogFileFormProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const file = inputRef.current?.files?.[0];
    if (!file) return;

    onSubmit(file);
  };

  return (
    <form className="log-file-form" onSubmit={handleSubmit}>
      <label htmlFor="upload">
        Upload file: <input name="upload" ref={inputRef} type="file" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
