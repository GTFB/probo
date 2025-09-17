import { getTranslations } from "next-intl/server";

export default async function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pre-load translations for this layout
  await getTranslations();
  
  return <>{children}</>;
}
