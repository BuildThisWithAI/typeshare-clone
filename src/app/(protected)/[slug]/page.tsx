export default function Page({ params }: { params: { slug: string } }) {
  return <div>Hello {params.slug}</div>;
}
