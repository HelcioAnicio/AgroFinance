import FormReproduction from "./formReproduction";
import FormAddKids from "./formAddKids";
import { useState, useRef, useEffect } from "react";

export default function CardFormReproduction() {
  const [statusComponentAddKids, setStatusComponentAddKids] =
    useState<boolean>(false);
  const formAddKidsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statusComponentAddKids && formAddKidsRef.current) {
      formAddKidsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [statusComponentAddKids]);

  return (
    <>
      <FormReproduction setStatusComponentAddKids={setStatusComponentAddKids} />
      {statusComponentAddKids && (
        <div ref={formAddKidsRef}>
          <FormAddKids setStatusComponentAddKids={setStatusComponentAddKids} />
        </div>
      )}
    </>
  );
}
