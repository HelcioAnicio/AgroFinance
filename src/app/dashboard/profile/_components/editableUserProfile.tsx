'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signOut } from 'next-auth/react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Trash2 } from 'lucide-react';

type ProfileUser = {
  id: string;
  name: string;
  email: string;
  cnpj: string | null;
  image: string | null;
};

interface EditableUserProfileProps {
  user: ProfileUser;
}

const EditableUserProfile: React.FC<EditableUserProfileProps> = ({ user }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<ProfileUser>(user);
  const [initial, setInitial] = useState<ProfileUser>(user);

  const handleBack = () => router.back();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: form.name,
        cnpj: form.cnpj ?? '',
        image: form.image ?? '',
      };

      const res = await axios.put(
        '/api/updateUser',
        { updateUser: payload },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const updated = res.data?.user as ProfileUser | undefined;
      if (updated) {
        setForm(updated);
        setInitial(updated);
      }

      toast.success('Perfil atualizado com sucesso!');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error('Ocorreu um erro ao atualizar o perfil.');
    }
  };

  const handleCancel = () => {
    setForm(initial);
    setIsEditing(false);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir sua conta? Essa ação excluirá todos os seus animais e não pode ser desfeita.'
    );
    if (!confirmed) return;

    try {
      await axios.delete('/api/deleteAccount');
      toast.success('Conta excluída com sucesso.');
      await signOut({ callbackUrl: '/login' });
    } catch (err) {
      console.error(err);
      toast.error('Erro ao excluir a conta.');
    }
  };

  return (
    <div className="pb-14">
      <section className="sticky top-0 bg-background">
        <div className="flex items-center justify-between px-2 py-3">
          <button onClick={handleBack}>
            <ArrowLeft />
          </button>
          <h1 className="w-full max-w-32 text-center text-xl sm:max-w-none">
            Perfil
          </h1>
          <div className="flex items-center gap-4 lg:gap-10">
            {!isEditing ? (
              <>
                <button onClick={handleDeleteAccount} aria-label="Excluir conta">
                  <Trash2 className="text-red-500" />
                </button>
                <Button onClick={() => setIsEditing(true)}>Editar dados</Button>
              </>
            ) : (
              <div className="flex gap-5">
                <Button type="button" onClick={handleSave}>
                  Salvar
                </Button>
                <Button type="button" onClick={handleCancel} variant="ghost">
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>
        <Separator className="bg-foreground" />
      </section>

      <div className="m-auto flex w-full max-w-lg flex-col gap-6 pb-10 pt-5">
        <Card className="border-amber-500/40 bg-amber-500/5 px-2 py-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Aviso</CardTitle>
          </CardHeader>
          <CardContent className="px-1 text-sm text-muted-foreground">
            Sua conta será monitorada. Se você não fizer nenhuma alteração (em
            animais ou no seu perfil) dentro de 6 meses, a conta poderá ser
            excluída automaticamente. (Ainda não está ativo — apenas aviso.)
          </CardContent>
        </Card>

        {!isEditing ? (
          <Card className="px-2 py-5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Seus dados</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-1 text-sm">
              <div>
                <strong>Nome: </strong>
                <span>{form.name}</span>
              </div>
              <div>
                <strong>E-mail: </strong>
                <span>{form.email}</span>
              </div>
              <div>
                <strong>CNPJ/CPF: </strong>
                <span>{form.cnpj ?? '—'}</span>
              </div>
              <div>
                <strong>Imagem (URL): </strong>
                <span className="break-all">{form.image ?? '—'}</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <form className="flex flex-col gap-5 px-2">
            <Card className="px-2 py-5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Editar dados</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 px-1">
                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="name">
                    Nome:
                  </label>
                  <input
                    className="w-full border border-b border-b-primary bg-transparent outline-none"
                    id="name"
                    name="name"
                    value={form.name ?? ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="email">
                    E-mail:
                  </label>
                  <input
                    className="w-full border border-b border-b-primary bg-transparent outline-none opacity-70"
                    id="email"
                    name="email"
                    value={form.email ?? ''}
                    disabled
                    readOnly
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="cnpj">
                    CNPJ/CPF:
                  </label>
                  <input
                    className="w-full border border-b border-b-primary bg-transparent outline-none"
                    id="cnpj"
                    name="cnpj"
                    value={form.cnpj ?? ''}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-secondary" htmlFor="image">
                    Imagem (URL):
                  </label>
                  <input
                    className="w-full border border-b border-b-primary bg-transparent outline-none"
                    id="image"
                    name="image"
                    value={form.image ?? ''}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditableUserProfile;

