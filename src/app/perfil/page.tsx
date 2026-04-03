/**
 * Pagina inicial da secao de Perfil.
 */
export default function PerfilPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">Perfil</h1>
      <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-300">
        Esta area sera usada para dados do usuario, preferencias e configuracoes da conta.
      </p>
    </section>
  );
}
