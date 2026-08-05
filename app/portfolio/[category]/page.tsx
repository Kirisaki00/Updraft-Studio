import { notFound } from "next/navigation";
import { portfolioCategories, getCategoryBySlug } from "@/lib/portfolioData";
import CategoryPageClient from "./CategoryPageClient";

export async function generateStaticParams() {
  return portfolioCategories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: `${cat.label} — Updraft Portfolio`,
    description: cat.longDescription,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  return <CategoryPageClient category={category} />;
}
