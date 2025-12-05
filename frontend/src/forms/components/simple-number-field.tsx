import { useFieldContext } from ".."
import { fieldContainer, input } from "../skins"
import { FieldInfo } from "./field-info"

interface SimpleNumberFieldProps {
  label: string
}

export function SimpleNumberField({ label }: SimpleNumberFieldProps) {
  const field = useFieldContext<number>()

  return (
    <div>
      <label className={fieldContainer()}>
        <p>{label}</p>

        <input
          id={field.name}
          name={field.name}
          dir="auto"
          type="number"
          className={input()}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.valueAsNumber)}
        />

        <FieldInfo field={field} />
      </label>
    </div>
  )
}
