import z from "zod"

export const BlockTypes = {
  Text: "TEXT",
  Image: "IMAGE",
  Audio: "AUDIO",
  Video: "VIDEO",
  Separator: "SEPARATOR",
  LinkButton: "LINK_BUTTON",
  Code: "CODE",
  Quote: "QUOTE",
  Heading: "HEADING",
  FileDownload: "FILE_DOWNLOAD",
} as const
export const BlockTypeSchema = z.enum([
  BlockTypes.Text,
  BlockTypes.Image,
  BlockTypes.Audio,
  BlockTypes.Video,
  BlockTypes.Separator,
  BlockTypes.LinkButton,
  BlockTypes.Code,
  BlockTypes.Quote,
  BlockTypes.Heading,
  BlockTypes.FileDownload,
])
export type BlockType = z.infer<typeof BlockTypeSchema>

export const BlockBaseV1Schema = z.object({
  id: z.string().uuid(),
  position: z.number(),
  baseVersion: z.literal(1),
})
export type BlockBaseV1 = z.infer<typeof BlockBaseV1Schema>

export const BlockTextV1Schema = BlockBaseV1Schema.extend({
  type: z.literal(BlockTypes.Text),
  content: z.string(),
  version: z.literal(1),
})
export type BlockTextV1 = z.infer<typeof BlockTextV1Schema>
export type BlockTextV1Input = Pick<BlockTextV1, "content" | "type">

export const BlockImageV1Schema = BlockBaseV1Schema.extend({
  type: z.literal(BlockTypes.Image),
  fileGuid: z.string(),
  version: z.literal(1),
})
export type BlockImageV1 = z.infer<typeof BlockImageV1Schema>
export type BlockImageV1Input = Pick<BlockImageV1, "fileGuid" | "type">

export const BlockAudioV1Schema = BlockBaseV1Schema.extend({
  type: z.literal(BlockTypes.Audio),
  fileGuid: z.string(),
  version: z.literal(1),
})
export type BlockAudioV1 = z.infer<typeof BlockAudioV1Schema>
export type BlockAudioV1Input = Pick<BlockAudioV1, "fileGuid" | "type">

export const BlockVideoV1Schema = BlockBaseV1Schema.extend({
  type: z.literal(BlockTypes.Video),
  fileGuid: z.string(),
  version: z.literal(1),
})
export type BlockVideoV1 = z.infer<typeof BlockVideoV1Schema>
export type BlockVideoV1Input = Pick<BlockVideoV1, "fileGuid" | "type">

export const BlockSeparatorV1Schema = BlockBaseV1Schema.extend({
  type: z.literal(BlockTypes.Separator),
  version: z.literal(1),
})
export type BlockSeparatorV1 = z.infer<typeof BlockSeparatorV1Schema>
export type BlockSeparatorV1Input = Pick<BlockSeparatorV1, "type">

export const BlockLinkButtonV1Schema = BlockBaseV1Schema.extend({
  type: z.literal(BlockTypes.LinkButton),
  href: z.string().url(),
  label: z.string(),
  variant: z.enum(["primary", "secondary"]).optional(),
  newTab: z.boolean(),
  version: z.literal(1),
})
export type BlockLinkButtonV1 = z.infer<typeof BlockLinkButtonV1Schema>
export type BlockLinkButtonV1Input = Pick<
  BlockLinkButtonV1,
  "type" | "href" | "label" | "variant" | "newTab"
>

export const BlockCodeV1Schema = BlockBaseV1Schema.extend({
  type: z.literal(BlockTypes.Code),
  language: z.string(),
  content: z.string(),
  version: z.literal(1),
})
export type BlockCodeV1 = z.infer<typeof BlockCodeV1Schema>
export type BlockCodeV1Input = Pick<
  BlockCodeV1,
  "type" | "content" | "language"
>

export const BlockQuoteV1Schema = BlockBaseV1Schema.extend({
  type: z.literal(BlockTypes.Quote),
  content: z.string(),
  source: z.string(),
  version: z.literal(1),
})
export type BlockQuoteV1 = z.infer<typeof BlockQuoteV1Schema>
export type BlockQuoteV1Input = Pick<
  BlockQuoteV1,
  "type" | "content" | "source"
>

export const BlockHeadingV1Schema = BlockBaseV1Schema.extend({
  type: z.literal(BlockTypes.Heading),
  level: z.enum(["2", "3", "4"]),
  content: z.string(),
  version: z.literal(1),
})
export type BlockHeadingV1 = z.infer<typeof BlockHeadingV1Schema>
export type BlockHeadingV1Input = Pick<
  BlockHeadingV1,
  "type" | "content" | "level"
>

export const BlockFileDownloadV1Schema = BlockBaseV1Schema.extend({
  type: z.literal(BlockTypes.FileDownload),
  label: z.string(),
  fileGuid: z.string(),
  version: z.literal(1),
})
export type BlockFileDownloadV1 = z.infer<typeof BlockFileDownloadV1Schema>
export type BlockFileDownloadV1Input = Pick<
  BlockFileDownloadV1,
  "fileGuid" | "type" | "label"
>

export const BlockSchema = z.discriminatedUnion("type", [
  BlockTextV1Schema,
  BlockImageV1Schema,
  BlockAudioV1Schema,
  BlockVideoV1Schema,
  BlockSeparatorV1Schema,
  BlockLinkButtonV1Schema,
  BlockCodeV1Schema,
  BlockQuoteV1Schema,
  BlockHeadingV1Schema,
  BlockFileDownloadV1Schema,
])
export type Block = z.infer<typeof BlockSchema>

export type BlockInput =
  | BlockAudioV1Input
  | BlockCodeV1Input
  | BlockHeadingV1Input
  | BlockImageV1Input
  | BlockLinkButtonV1Input
  | BlockQuoteV1Input
  | BlockSeparatorV1Input
  | BlockTextV1Input
  | BlockVideoV1Input
  | BlockFileDownloadV1Input
