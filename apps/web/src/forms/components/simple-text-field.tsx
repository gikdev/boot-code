/** biome-ignore-all lint/a11y/noLabelWithoutControl: Fields are dynamically set. */
import { useFieldContext } from ".."
import { fieldContainer, input } from "../skins"

interface SimpleTextFieldProps {
  label: string
  isMultiline?: boolean
}

export function SimpleTextField({
  label,
  isMultiline = false,
}: SimpleTextFieldProps) {
  const field = useFieldContext<string>()

  const Tag = isMultiline ? "textarea" : "input"

  return (
    <label>
      <label className={fieldContainer()}>
        <p>{label}</p>

        <Tag
          id={field.name}
          name={field.name}
          dir="auto"
          className={input({ isMultiline })}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.value)}
        />
      </label>
    </label>
  )
}
