import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
// import { toDate } from "date-fns-tz";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const { allDataForm } = json;
    console.log("Dados do formulário:", allDataForm);
    const { data, error } = await supabase.from("Animal").insert([allDataForm]);

    if (error) {
      console.error("Erro do Supabase:", error);
      return NextResponse.json(
        { message: "Erro ao cadastrar animal", error },
        { status: 500 },
      );
    }

    console.log("Dados retornados do Supabase:", data);

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
