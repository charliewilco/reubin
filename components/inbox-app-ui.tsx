interface IInboxLayout {
  header: React.ReactNode;
  sidebar: React.ReactNode;
}

export const InboxAppLayout: React.FC<IInboxLayout> = ({
  children,
  header,
  sidebar,
}) => {
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {header}
      <div className="min-h-0 flex-1 flex overflow-hidden">
        {sidebar}
        <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
          {children}
        </main>
      </div>
    </div>
  );
};
