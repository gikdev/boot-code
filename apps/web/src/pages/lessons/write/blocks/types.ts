import { z } from "zod"

export const BlockTypes = {
  Text: "TEXT",
  Image: "IMAGE",
  Audio: "AUDIO",
  Video: "VIDEO",
  Separator: "SEPARATOR",
  Checklist: "CHECKLIST",
  SimpleTable: "SIMPLE_TABLE",
  LinkButton: "LINK_BUTTON",
  Code: "CODE",
  Quote: "QUOTE",
  SimpleList: "SIMPLE_LIST",
  Heading: "HEADING",
} as const

export const BlockTypeSchema = z.enum([
  BlockTypes.Text,
  BlockTypes.Image,
  BlockTypes.Audio,
  BlockTypes.Video,
  BlockTypes.Separator,
  BlockTypes.Checklist,
  BlockTypes.SimpleTable,
  BlockTypes.LinkButton,
  BlockTypes.Code,
  BlockTypes.Quote,
  BlockTypes.SimpleList,
  BlockTypes.Heading,
])

export type BlockType = z.infer<typeof BlockTypeSchema>
