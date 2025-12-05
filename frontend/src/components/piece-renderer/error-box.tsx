interface ErrorBoxProps {
  message: string
  details?: string
}

export const ErrorBox = ({ message, details }: ErrorBoxProps) => (
  <div className="b:1|solid|red-40 bg:red-50 fg:red-80 p:2x r:1.5x font:sm font:mono">
    <p>{message}</p>
    {details && <pre className="text-xs opacity-70">{details}</pre>}
  </div>
)
