export const InboxContent: React.FC = ({ children }) => (
  <section
    aria-labelledby="primary-heading"
    className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"
  >
    <h1 id="primary-heading" className="sr-only">
      Home
    </h1>
    {children}
  </section>
);
