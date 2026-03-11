'use client';

import { useEffect, useMemo, useState } from 'react';
import { ExternalBull } from '@/types/externalBull';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InputForm } from '@/components/ui/inputForm';
import { toast } from 'sonner';

type ExternalBullForm = {
  id: string | null;
  name: string;
  breed: string;
  batches: string;
  sourceCompany: string;
  dosesAvailable: string;
};

const initialForm: ExternalBullForm = {
  id: null,
  name: '',
  breed: '',
  batches: '',
  sourceCompany: '',
  dosesAvailable: '',
};

function validateFormInPortuguese(form: ExternalBullForm) {
  const errors: Partial<Record<keyof ExternalBullForm, string>> = {};

  if (!form.name.trim()) errors.name = 'Nome do touro é obrigatório.';
  if (!form.breed.trim()) errors.breed = 'Raça é obrigatória.';
  if (!form.sourceCompany.trim()) {
    errors.sourceCompany = 'Empresa de origem é obrigatória.';
  }
  if (!form.batches.trim()) {
    errors.batches = 'Informe ao menos uma partida.';
  }

  const doses = Number(form.dosesAvailable);
  if (!Number.isInteger(doses) || doses < 0) {
    errors.dosesAvailable =
      'Quantidade de doses deve ser um número inteiro maior ou igual a zero.';
  }

  return errors;
}

export function ExternalBullsTable() {
  const [externalBulls, setExternalBulls] = useState<ExternalBull[]>([]);
  const [form, setForm] = useState<ExternalBullForm>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ExternalBullForm, string>>
  >({});
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = useMemo(() => Boolean(form.id), [form.id]);

  const loadExternalBulls = async () => {
    const res = await fetch('/api/external-bulls', { cache: 'no-store' });
    const data = await res.json();
    setExternalBulls(data.externalBulls ?? []);
  };

  useEffect(() => {
    loadExternalBulls();
  }, []);

  const handleInputChange = (name: keyof ExternalBullForm, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
  };

  const handleSubmit = async () => {
    const validationErrors = validateFormInPortuguese(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Revise os campos obrigatórios.');
      return;
    }

    setIsSaving(true);

    const payload = {
      id: form.id,
      name: form.name.trim(),
      breed: form.breed.trim(),
      batches: form.batches.trim(),
      sourceCompany: form.sourceCompany.trim(),
      dosesAvailable: Number(form.dosesAvailable),
    };

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch('/api/external-bulls', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.errors?.[0] ?? data?.error ?? 'Erro ao salvar.');
        return;
      }

      toast.success(
        isEditing
          ? 'Touro externo atualizado com sucesso.'
          : 'Touro externo cadastrado com sucesso.'
      );
      resetForm();
      await loadExternalBulls();
    } catch {
      toast.error('Erro ao salvar touro externo.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (externalBull: ExternalBull) => {
    setForm({
      id: externalBull.id,
      name: externalBull.name,
      breed: externalBull.breed,
      batches: externalBull.batches.join(', '),
      sourceCompany: externalBull.sourceCompany,
      dosesAvailable: String(externalBull.dosesAvailable),
    });
    setErrors({});
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/external-bulls?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.error ?? 'Erro ao remover.');
        return;
      }

      toast.success('Touro externo removido com sucesso.');
      if (form.id === id) resetForm();
      await loadExternalBulls();
    } catch {
      toast.error('Erro ao remover touro externo.');
    }
  };

  return (
    <main className="m-auto flex w-full max-w-6xl flex-col gap-6 p-3 pb-20">
      <h1 className="text-lg font-semibold">Touros externos</h1>

      <Card className="rounded-sm p-3">
        <div className="grid gap-3 md:grid-cols-2">
          <InputForm
            htmlFor="name"
            label="Nome do touro"
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={(event) => handleInputChange('name', event.target.value)}
          />
          <InputForm
            htmlFor="breed"
            label="Raça"
            type="text"
            name="breed"
            id="breed"
            value={form.breed}
            onChange={(event) =>
              handleInputChange('breed', event.target.value)
            }
          />
          <InputForm
            htmlFor="batches"
            label="Partida(s)"
            type="text"
            name="batches"
            id="batches"
            value={form.batches}
            onChange={(event) =>
              handleInputChange('batches', event.target.value)
            }
          />
          <InputForm
            htmlFor="sourceCompany"
            label="Empresa de origem"
            type="text"
            name="sourceCompany"
            id="sourceCompany"
            value={form.sourceCompany}
            onChange={(event) =>
              handleInputChange('sourceCompany', event.target.value)
            }
          />
          <InputForm
            htmlFor="dosesAvailable"
            label="Quantidade de doses"
            type="number"
            name="dosesAvailable"
            id="dosesAvailable"
            value={form.dosesAvailable}
            onChange={(event) =>
              handleInputChange('dosesAvailable', event.target.value)
            }
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs text-red-500">
          {Object.values(errors)
            .filter(Boolean)
            .map((error, index) => (
              <p key={`${error}-${index}`}>{error}</p>
            ))}
        </div>

        <div className="mt-3 flex justify-end gap-2">
          {isEditing && (
            <Button
              type="button"
              variant="outline"
              className="rounded-sm"
              onClick={resetForm}
            >
              Cancelar edição
            </Button>
          )}
          <Button
            type="button"
            className="rounded-sm"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isEditing ? 'Salvar alterações' : 'Cadastrar touro externo'}
          </Button>
        </div>
      </Card>

      <Card className="overflow-hidden rounded-sm">
        <div className="overflow-auto">
          <table className="w-full min-w-[900px] text-left text-xs">
            <thead className="bg-primary text-background">
              <tr>
                <th className="px-2 py-2">Nome</th>
                <th className="px-2 py-2">Raça</th>
                <th className="px-2 py-2">Partidas</th>
                <th className="px-2 py-2">Empresa de origem</th>
                <th className="px-2 py-2">Doses disponíveis</th>
                <th className="px-2 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {externalBulls.map((externalBull, index) => (
                <tr
                  key={externalBull.id}
                  className={index % 2 === 0 ? 'bg-muted/50' : 'bg-background'}
                >
                  <td className="px-2 py-2">{externalBull.name}</td>
                  <td className="px-2 py-2">{externalBull.breed}</td>
                  <td className="px-2 py-2">{externalBull.batches.join(', ')}</td>
                  <td className="px-2 py-2">{externalBull.sourceCompany}</td>
                  <td className="px-2 py-2">{externalBull.dosesAvailable}</td>
                  <td className="px-2 py-2">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-7 rounded-sm px-2 text-xs"
                        onClick={() => handleEdit(externalBull)}
                      >
                        Editar
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        className="h-7 rounded-sm px-2 text-xs"
                        onClick={() => handleDelete(externalBull.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {externalBulls.length === 0 && (
                <tr>
                  <td className="px-2 py-4 text-center" colSpan={6}>
                    Nenhum touro externo cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}
