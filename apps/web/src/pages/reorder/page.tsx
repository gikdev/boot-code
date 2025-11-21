import { CheckIcon } from "@phosphor-icons/react"
import { createSelector } from "@reduxjs/toolkit"
import { ErrorComponent } from "@tanstack/react-router"
import { useEffect, useMemo } from "react"
import { toast } from "react-toastify"
import { patchApiV1Modules } from "#/api/generated/client"
import { AppBar } from "#/components/app-bar"
import { type FabItem, FabMenu } from "#/components/fab-menu"
import { GoBackBtn } from "#/components/go-back-btn"
import { ThreeTimesOf } from "#/components/three-times"
import { main, phonePage } from "#/lib/skins"
import { onError, sortByPosition } from "#/lib/utils"
import { type AppState, useAppDispatch, useAppSelector } from "#/store"
import {
  PositionedCard,
  PositionedCardEmpty,
  PositionedCardSkeleton,
  type PositionItem,
} from "./positioned-card"
import { reorderItemsSlice } from "./slice"

const selectPositions = createSelector(
  [(s: AppState) => s.reorderItems.items],
  items =>
    items.map(i => ({
      id: i.id,
      position: i.position,
    })),
)

const { changeState, moveDown, moveUp, setItems } = reorderItemsSlice.actions

interface PageProps {
  fetchItems: () => Promise<PositionItem[]>
  navBack: () => void
}

export function ReorderItemsPage({ fetchItems, navBack }: PageProps) {
  const dispatch = useAppDispatch()
  const items = useAppSelector(s => s.reorderItems.items)
  const state = useAppSelector(s => s.reorderItems.state)
  const positions = useAppSelector(selectPositions)

  useFetchItems(fetchItems)

  const fabItems = useMemo(
    () =>
      [
        {
          key: "apply-changes",
          label: "اعمال",
          icon: CheckIcon,
          closeAfterClick: true,
          theme: "secondary-success",
          onClick: () => {
            const shouldContinue = window.confirm("Sure?")
            if (!shouldContinue) return

            patchApiV1Modules({ body: { positions } })
              .then(() => {
                toast.success("انجام شد.")
                navBack()
              })
              .catch(onError)
          },
        },
      ] satisfies FabItem[],
    [navBack, positions],
  )

  return (
    <div className={phonePage()}>
      <AppBar title="مرتب‌کردن" slotStart={<GoBackBtn onClick={navBack} />} />

      <div className={main()}>
        <div className="flex flex-col gap:2x">
          {state === "empty" && <PositionedCardEmpty />}
          {state === "error" && <ErrorComponent error={null} />}
          {state === "pending" && (
            <ThreeTimesOf Thing={PositionedCardSkeleton} />
          )}
          {state === "full" &&
            items.map(i => (
              <PositionedCard
                key={i.id}
                id={i.id}
                title={i.title}
                position={i.position}
                onUpBtnClick={id => dispatch(moveUp(id))}
                onDownBtnClick={id => dispatch(moveDown(id))}
              />
            ))}
        </div>

        <FabMenu items={fabItems} />
      </div>
    </div>
  )
}

function useFetchItems(fetchItems: PageProps["fetchItems"]) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(changeState("pending"))

    fetchItems()
      .then(newItems => {
        dispatch(changeState(newItems.length === 0 ? "empty" : "full"))
        dispatch(setItems(sortByPosition(newItems)))
      })
      .catch(err => {
        dispatch(changeState("error"))
        onError(err)
      })
  }, [dispatch, fetchItems])
}
