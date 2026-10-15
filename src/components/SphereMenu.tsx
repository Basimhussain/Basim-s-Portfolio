import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Link } from "@/lib/router";

const InfiniteMenu = dynamic(() => import("./InfiniteMenu"), { ssr: false });

export interface SphereItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

// The sphere needs WebGL 2. Without it the page would crash, so fall back to a
// plain list of the same projects.
class Boundary extends Component<{ fallback: React.ReactNode; children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const List = ({ items }: { items: SphereItem[] }) => (
  <ul className="grid h-full grid-cols-2 gap-4 overflow-auto p-6 md:grid-cols-3">
    {items.map((i) => (
      <li key={i.link}>
        <Link to={i.link} className="group block">
          <img src={i.image} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
          <span className="mt-2 block font-display text-lg font-light text-soft-white group-hover:text-mustard">
            {i.title}
          </span>
        </Link>
      </li>
    ))}
  </ul>
);

const SphereMenu = ({ items }: { items: SphereItem[] }) => {
  const router = useRouter();
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setOk(!!document.createElement("canvas").getContext("webgl2"));
    } catch {
      setOk(false);
    }
  }, []);

  if (ok === null) return null;
  if (!ok) return <List items={items} />;
  return (
    <Boundary fallback={<List items={items} />}>
      <InfiniteMenu items={items} onItemClick={(item) => router.push(item.link)} />
    </Boundary>
  );
};

export default SphereMenu;
