import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { Btn } from "./components/btn"
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
  },
})

export { useAppForm, useFieldContext, useFormContext }
