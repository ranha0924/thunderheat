"use client";
import { usePathname } from "next/navigation";
import BottomTabBar from "./BottomTabBar";

const HIDE_ON = ["/", "/upload/analyzing"];

export default function BottomTabBarConditional() {
  const pathname = usePathname();
  if (HIDE_ON.includes(pathname || "")) return null;
  return <BottomTabBar />;
}
