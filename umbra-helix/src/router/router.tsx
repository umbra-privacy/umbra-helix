import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import { WalletInteractions } from "../components/WalletInteractions.js";
import { ErrorView } from "../error-renderer/views/error.js";
import { CreateWallet } from "../components/create-wallet.js";
import { PXE } from "@aztec/aztec.js";

const Loading = () => <h1>Hello</h1>;

export const Router = ({
  isLoading,
  pxe,
}: {
  isLoading: boolean;
  pxe: PXE;
}) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <div className="flex flex-1 pointer">
        <div>{isLoading && "loading"}</div>
        <Toaster theme="dark" />
        <BrowserRouter>
          {" "}
          {/* Change this to BrowserRouter */}
          <Routes>
            {!isLoading && (
              <Route path="/" element={<WalletInteractions pxe={pxe} />} />
            )}
          </Routes>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
};
