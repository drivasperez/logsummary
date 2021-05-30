import React from "react";
import confetti from "canvas-confetti";

type ConfettiProps = {
  status: "initial" | "updating" | "done" | "error";
};

export default function Confetti({ status }: ConfettiProps) {
  const [ref, setRef] = React.useState<HTMLCanvasElement | null>(null);
  const confettiRef = React.useRef<confetti.CreateTypes | null>();

  React.useEffect(() => {
    if (ref && !confettiRef.current) {
      confettiRef.current = confetti.create(ref, {
        resize: true,
        useWorker: true,
      });
    }
  }, [ref]);

  React.useEffect(() => {
    if (status === "done") {
      confettiRef.current?.({ particleCount: 150, spread: 160 });
    }
  }, [status]);
  return <canvas className="confetti" ref={setRef} />;
}
