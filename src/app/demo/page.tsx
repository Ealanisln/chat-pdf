'use client'

import React from "react";
import { AlertDialogDemo } from "../../components/Dialog";
import { useAlertDialog } from "../../../hooks/use-alert-dialog"; // Import the custom hook

export default function App() {

  return (
    <div>
      <AlertDialogDemo />
    </div>
  );
}

