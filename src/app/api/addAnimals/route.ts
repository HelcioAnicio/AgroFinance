import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { format } from "date-fns";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    console.log("Dados recebidos:", json);

    const { allDataForm } = json;
    console.log("Dados do formulário:", allDataForm);

    // Converter campos de data para o formato yyyy-MM-dd HH:mm:ss.SSS
    const formattedData = {
      ...allDataForm,
      birthDate: format(
        new Date(allDataForm.birthDate),
        "yyyy-MM-dd HH:mm:ss.SSS",
      ),
      expectedDueDate: format(
        new Date(allDataForm.expectedDueDate),
        "yyyy-MM-dd HH:mm:ss.SSS",
      ),
      bodyConditionScore: parseFloat(allDataForm.bodyConditionScore),
    };

    console.log("Dados formatados:", formattedData);

    const { data, error } = await supabase
      .from("Animal")
      .insert([formattedData]);

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
