import { CheckIcon, TextAaIcon } from "@phosphor-icons/react"
import { useEffectEvent, useMemo } from "react"
import { Can } from "#/auth"
import { type FabItem, FabMenu } from "#/components/fab-menu"
import { useAppDispatch, useAppSelector, useAppStore } from "#/store"
import { NewTextDialog } from "./new-text-dialog"
import { writingAreaSlice } from "./store"

const { toggleFabMenu, openNewTextDialog, closeNewTextDialog } =
  writingAreaSlice.actions

export function FabMenuWrapper() {
  const dispatch = useAppDispatch()
  const store = useAppStore()
  const isFabMenuOpen = useAppSelector(s => s.writingArea.isOpen.fabMenu)
  const isNewTextDialogOpen = useAppSelector(
    s => s.writingArea.isOpen.newTextDialog,
  )

  const handleCloseNewTextDialog = () => dispatch(closeNewTextDialog())
  const toggleMenu = () => dispatch(toggleFabMenu())

  const submit = useEffectEvent(() => {
    console.log(store.getState().writingArea.pieces)
  })

  const items: FabItem[] = useMemo(
    () => [
      {
        key: "new-text",
        label: "متن جدید",
        theme: "secondary-success",
        icon: TextAaIcon,
        closeAfterClick: true,
        onClick: () => dispatch(openNewTextDialog()),
      },
      {
        key: "submit",
        label: "ثبت",
        theme: "secondary-success",
        icon: CheckIcon,
        closeAfterClick: true,
        onClick: submit,
      },
    ],
    [dispatch],
  )

  return (
    <Can I="MANAGE" a="COURSE">
      {isNewTextDialogOpen && (
        <NewTextDialog onClose={handleCloseNewTextDialog} />
      )}

      <FabMenu isOpen={isFabMenuOpen} onClick={toggleMenu} items={items} />
    </Can>
  )
}
