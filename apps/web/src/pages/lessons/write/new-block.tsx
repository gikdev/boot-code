import {
  CodeIcon,
  FileAudioIcon,
  ImageIcon,
  LinkIcon,
  ListChecksIcon,
  ListIcon,
  MinusIcon,
  QuotesIcon,
  TableIcon,
  TextAaIcon,
  VideoIcon,
} from "@phosphor-icons/react"
import { TextHIcon } from "@phosphor-icons/react/dist/ssr"
import { iconBtn } from "#/lib/skins"
import { useAppDispatch } from "#/store"
import { type BlockInput, BlockTypes } from "./blocks"
import { writeLessonSlice } from "./slice"

const { addBlock } = writeLessonSlice.actions

export function NewBlock() {
  const dispatch = useAppDispatch()

  const handleCreate = (input: BlockInput) => () => dispatch(addBlock(input))

  return (
    <div className="flex flex-wrap:wrap gap:1x p:1x bg:grey-0 r:2x b:1|solid|grey-10 justify-between">
      <button
        type="button"
        className={iconBtn()}
        onClick={handleCreate({
          type: BlockTypes.Text,
          content: "...",
        })}
      >
        <TextAaIcon />
      </button>

      <button
        type="button"
        className={iconBtn()}
        onClick={handleCreate({
          type: BlockTypes.Image,
          fileGuid: "",
        })}
      >
        <ImageIcon />
      </button>

      <button
        type="button"
        className={iconBtn()}
        onClick={handleCreate({
          type: BlockTypes.Audio,
          fileGuid: "",
        })}
      >
        <FileAudioIcon />
      </button>

      <button
        type="button"
        className={iconBtn()}
        onClick={handleCreate({
          type: BlockTypes.Video,
          fileGuid: "",
        })}
      >
        <VideoIcon />
      </button>

      <button
        type="button"
        className={iconBtn()}
        onClick={handleCreate({
          type: BlockTypes.Separator,
        })}
      >
        <MinusIcon />
      </button>

      <button
        type="button"
        className={iconBtn()}
        onClick={handleCreate({
          type: BlockTypes.Checklist,
          items: [
            {
              checked: false,
              label: "یه چیزی...",
            },
          ],
        })}
      >
        <ListChecksIcon />
      </button>

      <button
        type="button"
        className={iconBtn()}
        onClick={handleCreate({
          type: BlockTypes.SimpleTable,
          rows: [
            ["نام", "سن"],
            ["ممد", "18"],
            ["علی", "۱۲"],
          ],
        })}
      >
        <TableIcon />
      </button>

      <button
        type="button"
        className={iconBtn()}
        onClick={handleCreate({
          type: BlockTypes.LinkButton,
          href: "https://google.com/",
          label: "گوگل",
          variant: "primary",
        })}
      >
        <LinkIcon />
      </button>

      <button
        type="button"
        className={iconBtn()}
        onClick={handleCreate({
          type: BlockTypes.Code,
          language: "js",
          content: `console.log("Hello World!");`,
        })}
      >
        <CodeIcon />
      </button>

      <button
        type="button"
        className={iconBtn()}
        onClick={handleCreate({
          type: BlockTypes.Quote,
          content: "فقط انسان‌های ضعیف به اندازه امکاناتشان کار می‌کنند.",
          source: "شهید طهرانی مقدم",
        })}
      >
        <QuotesIcon />
      </button>

      <button
        type="button"
        className={iconBtn()}
        onClick={handleCreate({
          type: BlockTypes.SimpleList,
          items: ["آیتم ۱", "آیتم ۲", "آیتم ۳"],
        })}
      >
        <ListIcon />
      </button>

      <button
        type="button"
        className={iconBtn()}
        onClick={handleCreate({
          type: BlockTypes.Heading,
          level: "2",
          content: "قبل اینکه شروع کنیم...",
        })}
      >
        <TextHIcon />
      </button>
    </div>
  )
}
