import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { Btn } from "./components/btn"
import { SimpleFileField } from "./components/simple-file-field"
import { SimpleNumberField } from "./components/simple-number-field"
import { SimpleTextField } from "./components/simple-text-field"

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

const { useAppForm } = createFormHook({
  formContext,
  formComponents: {
    Btn,
  },
  fieldContext,
  fieldComponents: {
    SimpleTextField,
    SimpleNumberField,
    SimpleFileField,
  },
})

export { useAppForm, useFieldContext, useFormContext }
