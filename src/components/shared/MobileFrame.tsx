import React, { PropsWithChildren } from 'react';

const MobileFrame = ({ children }: PropsWithChildren) => {
  return (
    <main className="my-0 mx-auto max-w-xl border h-full min-h-[100vh] border-slate-600">
      <div className="h-full relative">{children}</div>
    </main>
  );
};

export default MobileFrame;
