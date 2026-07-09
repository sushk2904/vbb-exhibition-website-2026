import { allProducts } from '@/data/products';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = allProducts.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
