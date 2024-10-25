import AppIcon from './icons/app-icon';

export function AppLogo() {
  return (
    <div className="flex items-center justify-center gap-2">
      <AppIcon height="28px" />
      <span className="text-app-logo-color">Axiome</span>
    </div>
  );
}
