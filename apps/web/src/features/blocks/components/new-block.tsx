import {
  CodeIcon,
  FileArrowDownIcon,
  FileAudioIcon,
  FileImageIcon,
  FileVideoIcon,
  LinkIcon,
  MinusCircleIcon,
  MinusIcon,
  PlusIcon,
  QuotesIcon,
  TextAaIcon,
} from "@phosphor-icons/react"
import { TextHIcon } from "@phosphor-icons/react/dist/ssr"
import { useState } from "react"
import { Button, IconBtn } from "#/components/ui/button"
import { useAppDispatch } from "#/store"
import { writeLessonSlice } from "../slice"
import { BlockTypes } from "../types"

const GUID_LENGTH = 36

const { addBlock } = writeLessonSlice.actions

export function NewBlock() {
  const dispatch = useAppDispatch()
  const [isOpen, setOpen] = useState(false)

  if (!isOpen)
    return (
      <Button variant="primary" onClick={() => setOpen(true)}>
        <PlusIcon />
        <span>بلوک جدید</span>
      </Button>
    )

  return (
    <div className="flex flex-wrap:wrap gap:1x p:1x bg:grey-0 r:2x b:1|solid|grey-10 justify-between">
      <IconBtn variant="secondary" onClick={() => setOpen(false)}>
        <MinusCircleIcon weight="duotone" />
      </IconBtn>

      <IconBtn
        onClick={() =>
          dispatch(
            addBlock({
              type: BlockTypes.Text,
              content: "...",
            }),
          )
        }
      >
        <TextAaIcon />
      </IconBtn>

      <IconBtn
        onClick={() => {
          const fileGuid = window.prompt("Paste the image GUID:")
          if (!fileGuid) return
          if (fileGuid.length !== GUID_LENGTH) return

          dispatch(
            addBlock({
              type: BlockTypes.Image,
              fileGuid,
            }),
          )
        }}
      >
        <FileImageIcon />
      </IconBtn>

      <IconBtn
        onClick={() => {
          const fileGuid = window.prompt("Paste the audio GUID:")
          if (!fileGuid) return
          if (fileGuid.length !== GUID_LENGTH) return

          dispatch(
            addBlock({
              type: BlockTypes.Audio,
              fileGuid,
            }),
          )
        }}
      >
        <FileAudioIcon />
      </IconBtn>

      <IconBtn
        onClick={() => {
          const fileGuid = window.prompt("Paste the video GUID:")
          if (!fileGuid) return
          if (fileGuid.length !== GUID_LENGTH) return

          dispatch(
            addBlock({
              type: BlockTypes.Video,
              fileGuid,
            }),
          )
        }}
      >
        <FileVideoIcon />
      </IconBtn>

      <IconBtn
        onClick={() => {
          const fileGuid = window.prompt("Paste the file GUID:")
          if (!fileGuid) return
          if (fileGuid.length !== GUID_LENGTH) return

          const label = window.prompt("Label:")
          if (!label) return

          dispatch(
            addBlock({
              type: BlockTypes.FileDownload,
              fileGuid,
              label,
            }),
          )
        }}
      >
        <FileArrowDownIcon />
      </IconBtn>

      <IconBtn
        onClick={() =>
          dispatch(
            addBlock({
              type: BlockTypes.Separator,
            }),
          )
        }
      >
        <MinusIcon />
      </IconBtn>

      <IconBtn
        onClick={() => {
          const href = window.prompt("URL:")
          if (!href) return

          const label = window.prompt("Label:")
          if (!label) return

          let variant = window.prompt("Theme (primary OR secondary):") as
            | "primary"
            | "secondary"
            | null

          if (variant == null) return

          variant = ["primary", "secondary"].includes(variant)
            ? variant
            : "secondary"

          dispatch(
            addBlock({
              newTab: true,
              type: BlockTypes.LinkButton,
              href,
              label,
              variant,
            }),
          )
        }}
      >
        <LinkIcon />
      </IconBtn>

      <IconBtn
        onClick={() =>
          dispatch(
            addBlock({
              type: BlockTypes.Code,
              language: "text",
              content: `...`,
            }),
          )
        }
      >
        <CodeIcon />
      </IconBtn>

      <IconBtn
        onClick={() =>
          dispatch(
            addBlock({
              type: BlockTypes.Quote,
              content: "...",
              source: "...",
            }),
          )
        }
      >
        <QuotesIcon />
      </IconBtn>

      <IconBtn
        onClick={() =>
          dispatch(
            addBlock({
              type: BlockTypes.Heading,
              level: "2",
              content: "...",
            }),
          )
        }
      >
        <TextHIcon />
      </IconBtn>
    </div>
  )
}
