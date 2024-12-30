import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const allDataForm = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "ID não fornecido" },
        { status: 400 },
      );
    }

    const fieldsToRemove = [
      "bull",
      "offspringFromBull",
      "father",
      "offspringFromFather",
      "mother",
      "offspringFromMother",
      "owner",
      "dewormings",
      "diseases",
      "vaccines",
    ];
    fieldsToRemove.forEach((field) => delete allDataForm[field]);

    const { data, error } = await supabase
      .from("Animal")
      .update(allDataForm)
      .eq("id", id)
      .select("*");

    if (error) {
      console.error("Erro do Supabase:", error);
      return NextResponse.json(
        { message: "Erro ao atualizar animal", error },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Animal atualizado com sucesso",
      data,
    });
  } catch (error) {
    console.error("Erro no handler:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor", error },
      { status: 500 },
    );
  }
}
