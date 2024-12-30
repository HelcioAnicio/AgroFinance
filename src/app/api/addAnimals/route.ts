import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const { allDataForm } = json;
    const { data, error } = await supabase.from("Animal").insert([allDataForm]);

    if (error) {
      console.error("Erro do Supabase:", error);
      return NextResponse.json(
        { message: "Erro ao cadastrar animal", error },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Animal cadastrado com sucesso",
      data,
    });
  } catch (error) {
    console.error("Erro ao cadastrar animal:", error);
    return NextResponse.json(
      { message: "Erro ao cadastrar animal", error },
      { status: 500 },
    );
  }
}
