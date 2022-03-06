import { Icon } from "@iconify/react";
import homeFill from "@iconify/icons-eva/home-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import bookOpenFill from "@iconify/icons-eva/book-open-fill";
import phoneCallFill from "@iconify/icons-eva/phone-call-fill";
import messageCircleFill from "@iconify/icons-eva/message-circle-fill";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

export const sidebarConfigTeacher = [
  {
    title: "dashboard",
    path: "/app/dashboard",
    icon: getIcon(homeFill),
  },
  {
    title: "user",
    path: "/app/user",
    icon: getIcon(peopleFill),
  },
  {
    title: "materi",
    path: "/app/materi",
    icon: getIcon(bookOpenFill),
  },
  {
    title: "kontak",
    path: "/app/kontak",
    icon: getIcon(phoneCallFill),
  },
  {
    title: "forum",
    path: "/app/forum",
    icon: getIcon(messageCircleFill),
  },
  {
    title: "tes",
    path: "/app/tes",
    icon: getIcon(fileTextFill),
  },
];

export const sidebarConfigStudent = [
  {
    title: "beranda",
    path: "/app/beranda",
    icon: getIcon(homeFill),
  },
  {
    title: "materi",
    path: "/app/materi_siswa",
    icon: getIcon(bookOpenFill),
  },
  {
    title: "forum",
    path: "/app/forum",
    icon: getIcon(messageCircleFill),
  },
  {
    title: "kontak",
    path: "/app/kontak_siswa",
    icon: getIcon(phoneCallFill),
  },
  {
    title: "tes",
    path: "/app/tes_category",
    icon: getIcon(fileTextFill),
  },
];
