export default function Layout({ children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-fit h-fit "
      style={{
        '--bg-color': 'offblack-100',
        '--bg-color2': 'offblack-100',
        '--mainHeading-color': '#1E1E1E',
        '--subHeading-color': '#4C855A',
        '--InputBorder-color': '#4C855A',
        '--InputPlaceholder-color': '#4C855A',
        '--error-color': '#4C855A',
        '--signup-color': '#4C855A',
        '--forgotPassword-color': '#4C855A',
        '--hover-color': '#4C855A',
      } as React.CSSProperties}>
        {children}
        <div
          id="entry-radial"
          className="top-0 w-full h-full absolute -z-10"
        />
      </main>
    </>
  )
}