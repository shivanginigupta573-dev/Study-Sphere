import React from "react";
import { Settings as SettingsIcon } from "lucide-react";
import EmptyState from "../Components/EmptyState";

export default function Settings() {
  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pb-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400 tracking-tight">
          Settings
        </h1>
      </header>

      <EmptyState
        icon={<SettingsIcon className="w-10 h-10 text-primary-500 dark:text-primary-400 opacity-80" />}
        title="Preferences & Account"
        description="Edit your profile details using the bottom left sidebar menu. More advanced settings will appear here soon."
      />
    </div>
  );
}
