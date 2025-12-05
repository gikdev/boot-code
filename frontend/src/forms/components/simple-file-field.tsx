/** biome-ignore-all lint/a11y/noLabelWithoutControl: Fields are dynamically set. */

import {
  CursorTextIcon,
  FileCodeIcon,
  FileDashedIcon,
  PackageIcon,
  TrashIcon,
} from "@phosphor-icons/react"
import { useRef } from "react"
import { btn } from "#/lib/skins"
import { useFieldContext } from ".."
import { fieldContainer } from "../skins"
import { FieldInfo } from "./field-info"

interface SimpleFileFieldProps {
  label: string
}

export function SimpleFileField({ label }: SimpleFileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const field = useFieldContext<File | null>()

  return (
    <div className="flex flex-col gap:2x">
      <label className={fieldContainer()}>
        <p>{label}</p>

        <input
          id={field.name}
          ref={inputRef}
          name={field.name}
          type="file"
          dir="auto"
          className="hidden"
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.files?.[0] || null)}
        />
      </label>

      <div className="flex gap:1x">
        <button
          type="button"
          className={btn({ className: "flex:1" })}
          disabled={field.state.value != null}
          onClick={() => inputRef.current?.click()}
        >
          <FileDashedIcon />
          <span>انتخاب فایل</span>
        </button>

        <button
          type="button"
          className={btn()}
          disabled={field.state.value == null}
          onClick={() => {
            field.handleChange(null)
            if (!inputRef.current) return
            inputRef.current.value = ""
          }}
        >
          <TrashIcon />
        </button>
      </div>

      <FieldInfo field={field} />

      {field.state.value ? (
        <div className="flex flex-col gap:1x font:mono" dir="ltr">
          <div className="flex flex-wrap:wrap gap:1x">
            <CursorTextIcon size={20} />
            <strong>Name: </strong>
            <span>{field.state.value.name}</span>
          </div>

          <div className="flex flex-wrap:wrap gap:1x">
            <PackageIcon size={20} />
            <strong>Size: </strong>
            <span>
              {(field.state.value.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>

          <div className="flex flex-wrap:wrap gap:1x">
            <FileCodeIcon size={20} />
            <strong>Type: </strong>
            <span>{field.state.value.type}</span>
          </div>
        </div>
      ) : (
        <p>فایلی انتخاب نشده</p>
      )}
    </div>
  )
}
