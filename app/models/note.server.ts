import type { User, Note } from "@prisma/client";
import { AppLoadContext } from "@remix-run/cloudflare";

import { getClient } from "~/db.server";

export type { Note } from "@prisma/client";

export function getNote({
  id,
  userId,
}: Pick<Note, "id"> & {
  userId: User["id"];
}, context: AppLoadContext) {
  const { DATABASE_URL} = context;
  return getClient(DATABASE_URL).note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getNoteListItems({ userId }: { userId: User["id"] }, context: AppLoadContext) {
  const { DATABASE_URL} = context;

  return getClient(DATABASE_URL).note.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createNote({
  body,
  title,
  userId,
}: Pick<Note, "body" | "title"> & {
  userId: User["id"];
}, context: AppLoadContext) {
  const { DATABASE_URL} = context;
  return getClient(DATABASE_URL).note.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }, context: AppLoadContext) {
  const { DATABASE_URL} = context;
  return getClient(DATABASE_URL).note.deleteMany({
    where: { id, userId },
  });
}
