import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  Coins,
  HeartPulse,
  LineChart,
  ShieldCheck,
  Sprout,
} from 'lucide-react';
import { HeaderSimple } from '@/components/ui/headerSimple';
import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';

const modules = [
  {
    eyebrow: 'Modulo reprodutivo',
    title: 'Modulo Reprodutivo',
    description:
      'Organize cio, prenhez, genealogia e historico do rebanho em um fluxo claro para a equipe.',
    icon: Sprout,
    accent: 'bg-[#dbe9b3] text-[#476126]',
    border: 'border-[#7a963f]',
    items: [
      'Rastreabilidade genealogica',
      'Alertas de manejo',
      'Diagnostico de prenhez',
    ],
  },
  {
    eyebrow: 'Modulo de manejo',
    title: 'Modulo de Manejo',
    description:
      'Acompanhe peso, protocolos sanitarios e indicadores operacionais com menos retrabalho.',
    icon: HeartPulse,
    accent: 'bg-[#d8efcf] text-[#2f6a33]',
    border: 'border-[#5a8b47]',
    items: [
      'Curva de ganho de peso',
      'Vacinas e ocorrencias',
      'Historico individual',
    ],
  },
] as const;

const metrics = [
  { value: '98%', label: 'Acuracia no registro de dados' },
  { value: '+25%', label: 'Eficiencia operacional percebida' },
];

const highlights = [
  {
    title: 'ROI em tempo real',
    description:
      'Cruze custo, desempenho e valor de mercado por animal ou lote.',
    icon: LineChart,
  },
  {
    title: 'Custo por animal',
    description:
      'Visualize despesas de manejo, alimentacao e sanidade com rapidez.',
    icon: Coins,
  },
] as const;

const techStack = ['Next.js', 'Tailwind CSS', 'Supabase'];

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <>
      <HeaderSimple />

      <main id="conteudo" className="mx-auto w-full max-w-5xl">
        <section className="min-h-dvh w-full px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="max-w-2xl">
              <p className="mb-5 inline-flex rounded-full bg-[#d8e6aa] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[#587625]">
                Tecnologia no campo
              </p>
              <h1 className="max-w-xl text-3xl font-black leading-none tracking-tight text-[#385320] sm:text-4xl lg:text-5xl">
                Gestão Pecuaria Inteligente:
                <span className="mt-2 block text-[#7a9d33]">
                  Do Pasto ao Lucro.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Centralize o ciclo produtivo e os indicadores financeiros do
                rebanho em uma plataforma mais clara, acessivel e pronta para
                crescer com a sua fazenda.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  // className="inline-flex items-center justify-center rounded-full bg-[#476126] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#355019] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355019] focus-visible:ring-offset-2"
                >
                  <Button>Começar agora</Button>
                </Link>
                {/* <Link
                  href="#inteligencia"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                >
                  Ver demonstracao
                </Link> */}
              </div>
            </div>
            <Image
              src="/logo.png"
              alt="AgroFinance"
              width={1000}
              height={1000}
              priority
              className="w-full rounded-full object-cover"
            />
          </div>
        </section>

        <section
          id="funcionalidades"
          aria-labelledby="funcionalidades-title"
          className="bg-[#f1efea] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="mx-auto w-full max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2
                id="funcionalidades-title"
                className="text-3xl font-black tracking-tight text-[#385320] sm:text-4xl"
              >
                O Ciclo de Vida Digital
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Modulos especializados para acompanhar as rotinas mais
                importantes da operacao com contexto compartilhado entre
                equipes.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <article
                    key={module.title}
                    className={`rounded-[1.75rem] border ${module.border} bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-8`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`inline-flex rounded-2xl p-3 ${module.accent}`}
                        aria-hidden="true"
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="pt-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                        {module.eyebrow}
                      </p>
                    </div>

                    <h3 className="mt-8 text-2xl font-bold text-slate-900">
                      {module.title}
                    </h3>
                    <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
                      {module.description}
                    </p>

                    <ul className="mt-8 space-y-3 text-sm text-slate-700">
                      {module.items.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <ShieldCheck
                            className="h-5 w-5 shrink-0 text-[#587625]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="inteligencia"
          aria-labelledby="inteligencia-title"
          className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div className="order-2 rounded-[1.8rem] border border-black/5 bg-[#e8e6e0] p-5 shadow-sm lg:order-1">
              <div className="overflow-hidden rounded-[1.35rem] border border-[#1e242a] bg-[#11161c] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff7a59]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f2c14b]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#52c15a]" />
                </div>
                <div className="grid gap-4 p-4 sm:p-6">
                  <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                        <span>Indicadores do rebanho</span>
                        <BarChart3 className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="mt-4 space-y-3">
                        {[78, 56, 92, 68, 85].map((height, index) => (
                          <div key={height} className="flex items-end gap-2">
                            <span className="w-6 text-[11px] text-slate-500">
                              {index + 1}
                            </span>
                            <div className="h-2 w-full rounded-full bg-white/5">
                              <div
                                className="h-2 rounded-full bg-[#96c24e]"
                                style={{ width: `${height}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                        <span>Tarefas criticas</span>
                        <ClipboardList className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <ul className="mt-4 space-y-3 text-sm text-slate-200">
                        <li className="rounded-xl bg-white/5 px-3 py-2">
                          Revisar lote de vacinacao
                        </li>
                        <li className="rounded-xl bg-white/5 px-3 py-2">
                          Conferir protocolo reprodutivo
                        </li>
                        <li className="rounded-xl bg-white/5 px-3 py-2">
                          Atualizar custo alimentar
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                          Tendencia mensal
                        </p>
                        <p className="mt-2 text-lg font-semibold text-white">
                          Crescimento consistente da produtividade
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-[#96c24e]">
                        +12,8%
                      </p>
                    </div>
                    <div className="mt-6 flex h-28 items-end gap-3">
                      {[42, 59, 51, 68, 80, 76, 91].map((value) => (
                        <div
                          key={value}
                          className="flex-1 rounded-t-2xl bg-[#284a21]/60"
                        >
                          <div
                            className="w-full rounded-t-2xl bg-[#f2c14b]"
                            style={{ height: `${value}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2
                id="inteligencia-title"
                className="max-w-lg text-3xl font-black leading-tight tracking-tight text-[#2f4f1d] sm:text-4xl lg:text-5xl"
              >
                O que nao é medido, nao é gerenciado.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                A plataforma organiza dados zootecnicos e financeiros em uma
                leitura simples para tomada de decisao. Isso reduz friccao
                operacional, facilita auditoria e melhora a confianca da equipe
                no dia a dia.
              </p>

              <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.5rem] border border-[#d6d1c5] bg-white p-5 shadow-sm"
                  >
                    <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                      {metric.label}
                    </dt>
                    <dd className="mt-3 text-4xl font-black tracking-tight text-[#587625]">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section
          id="rentabilidade"
          aria-labelledby="rentabilidade-title"
          className="overflow-hidden bg-[#3f5f17] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <h2
                id="rentabilidade-title"
                className="max-w-lg text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
              >
                O Futuro e a Rentabilidade de Precisao
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#dae5c8] sm:text-lg">
                Entenda quanto cada decisao custa, quanto cada animal retorna e
                onde sua operacao ganha margem. Tudo em uma visao objetiva, sem
                planilhas espalhadas.
              </p>

              <div className="mt-8 space-y-4">
                {highlights.map((highlight) => {
                  const Icon = highlight.icon;

                  return (
                    <article
                      key={highlight.title}
                      className="rounded-[1.4rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-[#86ae35] p-3 text-[#1f3814]">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">
                            {highlight.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[#dae5c8]">
                            {highlight.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <aside
              aria-label="Visual financeiro ilustrativo"
              className="justify-self-center rounded-[2rem] border border-white/10 bg-[#213217] p-4 shadow-[0_28px_80px_rgba(0,0,0,0.24)]"
            >
              <div className="w-full max-w-[28rem] rotate-2 rounded-[1.6rem] border border-white/10 bg-[#111923] p-6 transition duration-300 hover:rotate-0">
                <svg
                  viewBox="0 0 420 260"
                  role="img"
                  aria-label="Ilustracao de fluxo financeiro digital"
                  className="h-auto w-full"
                >
                  <rect
                    x="1"
                    y="1"
                    width="418"
                    height="258"
                    rx="28"
                    fill="#111923"
                  />
                  <path
                    d="M145 36h128c18 0 32 14 32 32v38"
                    fill="none"
                    stroke="#f2c14b"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M271 66l34 40-34 40"
                    fill="none"
                    stroke="#f2c14b"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M118 174h172c18 0 32 14 32 32v14H86v-14c0-18 14-32 32-32z"
                    fill="none"
                    stroke="#7bbcc2"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="176"
                    y="112"
                    width="68"
                    height="48"
                    rx="14"
                    fill="none"
                    stroke="#f2c14b"
                    strokeWidth="8"
                  />
                  <path
                    d="M210 125v22"
                    fill="none"
                    stroke="#f2c14b"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <circle cx="210" cy="152" r="6" fill="#f2c14b" />
                </svg>
              </div>
            </aside>
          </div>
        </section>

        <section
          aria-labelledby="robustez-title"
          className="border-y border-black/5 bg-white px-4 py-10 sm:px-6 lg:px-8"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8">
            <h2
              id="robustez-title"
              className="text-xs font-bold uppercase tracking-[0.28em] text-slate-400"
            >
              Robustez Tecnica
            </h2>
            <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-lg font-semibold text-slate-500 sm:text-xl">
              {techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="cta-title"
          className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2
              id="cta-title"
              className="text-3xl font-black tracking-tight text-[#385320] sm:text-4xl lg:text-5xl"
            >
              Pronto para profissionalizar sua fazenda?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Junte dados, processos e resultados em uma experiencia mais
              organizada para quem decide no campo e no escritorio.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-[#476126] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#355019] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355019] focus-visible:ring-offset-2"
              >
                Comecar Agora
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-[#355019]/20 bg-white px-6 py-3 text-sm font-semibold text-[#355019] transition hover:border-[#355019]/35 hover:bg-[#f7f7f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355019] focus-visible:ring-offset-2"
              >
                Falar com Consultor
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 bg-[#f3f1ea] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-[#284a21]">AgroFinance</p>
            <p className="mt-2">
              Gestao de precisao para uma pecuaria mais rentavel.
            </p>
          </div>

          <nav
            aria-label="Links secundarios"
            className="flex flex-wrap items-center gap-5 text-sm"
          >
            <Link
              href="#funcionalidades"
              className="transition hover:text-[#2f5b25]"
            >
              Funcionalidades
            </Link>
            <Link
              href="#inteligencia"
              className="transition hover:text-[#2f5b25]"
            >
              Inteligencia
            </Link>
            <Link href="/login" className="transition hover:text-[#2f5b25]">
              Login
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1 transition hover:text-[#2f5b25]"
            >
              Cadastre-se
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
