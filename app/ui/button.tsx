import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 px-5 text-sm font-semibold text-slate-950 shadow-[0_10px_24px_rgba(56,189,248,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(56,189,248,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}
