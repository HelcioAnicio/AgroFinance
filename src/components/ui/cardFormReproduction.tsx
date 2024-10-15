import FormMain from "./formMain";
import FormAddKids from "./formAddKids";
import { useState } from "react";

export default function CardFormReproduction() {
  const [statusComponentAddKids, setStatusComponentAddKids] =
    useState<boolean>(false);

  return (
    <>
      <FormMain setStatusComponentAddKids={setStatusComponentAddKids} />
      {statusComponentAddKids && (
        <FormAddKids setStatusComponentAddKids={setStatusComponentAddKids} />
      )}
    </>
  );
}
