import React, { useState } from "react";
import useUser from "../../lib/useUser";
import fetchJson from "../../lib/fetchJson";

export default function Sair() {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  })

  return (
    <>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Carregando...</span>
      </div>
    </>
  )
}