import { PieceSeparator } from "./piece-separator"
import { PieceText } from "./piece-text"

// type PieceType = PieceWithStatusResDto["type"]

// interface PieceRendererProps {
//   type: PieceType
//   payload: string | null
// }

// biome-ignore lint/suspicious/noExplicitAny: TODO
export function PieceRenderer({ type, payload }: any) {
  if (type === "Text") return <PieceText payload={payload} />

  if (type === "Separator") return <PieceSeparator />

  return <p>{type}</p>
}
