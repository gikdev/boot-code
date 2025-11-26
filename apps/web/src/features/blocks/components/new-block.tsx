import {
  CodeIcon,
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
        onClick={() => dispatch(addBlock({
          type: BlockTypes.Text,
          content: "lajksdlkfj",
        }))}
      >
        <TextAaIcon />
      </IconBtn>

      <IconBtn
        onClick={() => dispatch(addBlock({
          type: BlockTypes.Image,
          fileGuid: window.prompt("Paste the image GUID:") || "",
        }))}
      >
        <FileImageIcon />
      </IconBtn>

      <IconBtn
        onClick={() => dispatch(addBlock({
          type: BlockTypes.Audio,
          fileGuid: window.prompt("Paste the audio GUID:") || "",
        }))}
      >
        <FileAudioIcon />
      </IconBtn>

      <IconBtn
        onClick={() => dispatch(addBlock({
          type: BlockTypes.Video,
          fileGuid: window.prompt("Paste the video GUID:") || "",
        }))}
      >
        <FileVideoIcon />
      </IconBtn>

      <IconBtn
        onClick={() => dispatch(addBlock({
          type: BlockTypes.Separator,
        }))}
      >
        <MinusIcon />
      </IconBtn>

      <IconBtn
        onClick={() => dispatch(addBlock({
          type: BlockTypes.LinkButton,
          href: "https://google.com/",
          label: "گوگل",
          variant: "primary",
        }))}
      >
        <LinkIcon />
      </IconBtn>

      <IconBtn
        onClick={() => dispatch(addBlock({
          type: BlockTypes.Code,
          language: "rust",
          content: `fn main() {
  println!("Hello!");
}
`,
        }))}
      >
        <CodeIcon />
      </IconBtn>

      <IconBtn
        onClick={() => dispatch(addBlock({
          type: BlockTypes.Quote,
          content: "فقط انسان‌های ضعیف به اندازه امکاناتشان کار می‌کنند.",
          source: "شهید طهرانی مقدم",
        }))}
      >
        <QuotesIcon />
      </IconBtn>

      <IconBtn
        onClick={() => dispatch(addBlock({
          type: BlockTypes.Heading,
          level: "2",
          content: "قبل اینکه شروع کنیم...",
        }))}
      >
        <TextHIcon />
      </IconBtn>
    </div>
  )
}
